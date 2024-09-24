import { useEffect, useState } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import "./MainPage.scss";
import { FaBars } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Skeleton from "../../components/Skeleton/Skeleton";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import { BasketCard } from "../../components/BasketCard/BasketCard";
import { FilterCard } from "../../components/FilterCard/FilterCard";
import { MobileFilter } from "../../components/MobileFilter/MobileFilter";
import { MobileCheckout } from "../../components/MobileCheckout/MobileCheckout";

export const MainPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let searchText = searchParams.get("search");
  const [search, setSearch] = useState(searchText);

  const [products, setProducts] = useState([]);
  const [listedProducts, setListedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [mobileFilterIsOpen, setMobileFilterIsOpen] = useState(false);
  const [mobileCheckoutIsOpen, setMobileCheckoutIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    return searchParams.get("page") || 1;
  });

  const [sortBy, setSortBy] = useState(() => {
    return searchParams.get("sortBy") || "new-to-old";
  });

  const [checkedBrands, setCheckedBrands] = useState(() => {
    let brands = searchParams.get("brands")?.split(",");
    brands = brands?.length > 0 && brands[0] !== "" ? brands : [];
    return brands;
  });

  const [checkedModel, setCheckedModel] = useState(() => {
    let models = searchParams.get("models")?.split(",");
    models = models?.length > 0 && models[0] !== "" ? models : [];
    return models;
  });

  const changePage = (pageNumber) => {
    setCurrentPage(parseInt(pageNumber, 10));
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ["page"]: pageNumber,
    });
  };

  useEffect(() => {
    if (sortBy) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        ["sortBy"]: sortBy,
      });
      switch (sortBy) {
        case "old-to-new":
          setListedProducts((prev) => {
            prev.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            return prev;
          });
          break;
        case "new-to-old":
          setListedProducts((prev) => {
            prev.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            return prev;
          });
          break;
        case "price-high-to-low":
          setListedProducts((prev) => {
            prev.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            return prev;
          });
          break;
        case "price-low-to-high":
          setListedProducts((prev) => {
            prev.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            return prev;
          });
          break;

        default:
          break;
      }
    }
  }, [searchParams, setSearchParams, sortBy]);

  useEffect(() => {
    setListedProducts(() => {
      if (checkedBrands.length === 0) {
        return products;
      } else {
        let brandFiltered = products.filter((product) =>
          checkedBrands.includes(product.brand)
        );
        return brandFiltered;
      }
    });
  }, [checkedBrands, products]);

  useEffect(() => {
    let formattedModels = checkedModel.join(",");

    setListedProducts(() => {
      let firstBrandFilter =
        checkedBrands.length === 0
          ? products
          : products.filter((product) => checkedBrands.includes(product.brand));

      if (checkedModel.length === 0) {
        if (checkedBrands.length === 0) {
          return products;
        } else {
          let brandFiltered = products.filter((product) =>
            checkedBrands.includes(product.brand)
          );
          return brandFiltered;
        }
      } else {
        let modelFiltered = firstBrandFilter.filter((product) =>
          formattedModels.includes(product.model)
        );
        return modelFiltered;
      }
    });
  }, [checkedModel, products]);

  const { isLoading, isSuccess, refetch } = useQuery({
    queryKey: [`"product-list-${searchText}"`],
    queryFn: async () => {
      const response = await fetch(
        "https://5fc9346b2af77700165ae514.mockapi.io/products"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      let data = await response.json();
      if (searchText)
        data = data.filter(
          (product) =>
            product.name
              .toLocaleLowerCase()
              .indexOf(searchText.toLocaleLowerCase()) !== -1
        );

      setProducts(data);
      setListedProducts(data);

      setBrands(() => Object.keys(Object.groupBy(data, ({ brand }) => brand)));
      setModels(() => {
        let groupedBrands = Object.groupBy(data, ({ brand }) => brand);
        let groupedWithModels = {};
        Object.keys(groupedBrands).forEach((brandKey) => {
          if (!groupedWithModels[brandKey]) {
            groupedWithModels[brandKey] = [];
          }

          groupedBrands[brandKey].forEach((brand) => {
            groupedWithModels[brandKey].push(brand.model);
          });
        });
        return groupedWithModels;
      });
      return data;
    },
  });

  useEffect(() => {
    setSearch((prev) => {
      if (prev !== searchText) {
        changePage(1);
      }
      return searchText;
    });
  }, [searchText]);

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  return (
    <div className="mt-4 row">
      <div className="d-none d-lg-block col-3 col-xl-2">
        <FilterCard
          sortBy={sortBy}
          setSortBy={setSortBy}
          brands={brands}
          models={models}
          checkedBrands={checkedBrands}
          setCheckedBrands={setCheckedBrands}
          checkedModel={checkedModel}
          setCheckedModel={setCheckedModel}
        />
      </div>
      <div className="col-12 col-lg-6 col-xl-8">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="d-flex d-lg-none mobile-filter"
            onClick={() => {
              setMobileFilterIsOpen(true);
            }}
          >
            <FaBars className="me-2" /> Filter
          </div>
          <div
            className="d-flex d-lg-none mobile-filter"
            onClick={() => {
              setMobileCheckoutIsOpen(true);
            }}
          >
            <FaBasketShopping className="me-2" /> Checkout
          </div>
        </div>
        <div className="row products">
          {isLoading &&
            [...new Array(8)].map((_, i) => {
              return (
                <div className="col-6 col-md-4 col-xl-3" key={`skeleton_${i}`}>
                  <Skeleton height={260} />
                </div>
              );
            })}

          {isSuccess && (
            <>
              {listedProducts
                ?.slice(12 * (currentPage - 1), 12 * currentPage)
                .map((product) => {
                  return (
                    <div className="col-6 col-md-4 col-xl-3" key={product.id}>
                      <ProductCard data={product} />
                    </div>
                  );
                })}
              <Pagination
                currentPage={parseInt(currentPage, 10)}
                totalPage={Math.ceil(listedProducts.length / 12) || 1}
                changePage={changePage}
              />
            </>
          )}
        </div>
      </div>
      <div className="d-none d-lg-block col-3 col-xl-2">
        <BasketCard />
      </div>
      <MobileFilter
        isOpen={mobileFilterIsOpen}
        close={() => setMobileFilterIsOpen(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        brands={brands}
        models={models}
        checkedBrands={checkedBrands}
        setCheckedBrands={setCheckedBrands}
        checkedModel={checkedModel}
        setCheckedModel={setCheckedModel}
      />
      <MobileCheckout
        isOpen={mobileCheckoutIsOpen}
        close={() => setMobileCheckoutIsOpen(false)}
      />
    </div>
  );
};
