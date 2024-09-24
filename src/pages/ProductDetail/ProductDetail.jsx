import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./ProductDetail.scss";
import { BasketCard } from "../../components/BasketCard/BasketCard";
import Skeleton from "../../components/Skeleton/Skeleton";
import currenyFormat from "../../helpers/currencyFormat";
import { addProductToBasket } from "../../store/features/basket";
import { useDispatch, useSelector } from "react-redux";
import { MobileCheckout } from "../../components/MobileCheckout/MobileCheckout";
import { FaBasketShopping } from "react-icons/fa6";

export const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { basketIsLoading } = useSelector((state) => state.basket);

  const [product, setProduct] = useState(null);
  const [mobileCheckoutIsOpen, setMobileCheckoutIsOpen] = useState(false);

  const { isLoading, isSuccess } = useQuery({
    queryKey: ["product-list"],
    queryFn: async () => {
      const response = await fetch(
        "https://5fc9346b2af77700165ae514.mockapi.io/products"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProduct(() => {
        return data.find((item) => item.id == id);
      });
      return data;
    },
  });

  return (
    <div className="mt-4 row">
      <div className="d-flex justify-content-end align-items-center">
        <div
          className="d-flex d-md-none mobile-filter"
          onClick={() => {
            setMobileCheckoutIsOpen(true);
          }}
        >
          <FaBasketShopping className="me-2" /> Checkout
        </div>
      </div>
      <div className="col-12 col-md-9 col-xl-10">
        {isLoading && <Skeleton height={500} />}
        {isSuccess && product && (
          <div className="product-container row">
            <div className="col-12 col-lg-6">
              <img src={product.image} className="product-image" />
            </div>
            <div className="col-12 col-lg-6 mt-2 mt-lg-0 product-info">
              <h1 className="product-name">{product.name}</h1>
              <span className="product-price">
                {currenyFormat(product.price)}
              </span>
              <button
                className="add-to-cart mt-2 mt-lg-4"
                onClick={() => {
                  dispatch(addProductToBasket(product));
                }}
                disabled={basketIsLoading}
              >
                Add to Cart
              </button>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="d-none d-md-block col-md-3 col-xl-2">
        <BasketCard />
      </div>
      <MobileCheckout
        isOpen={mobileCheckoutIsOpen}
        close={() => setMobileCheckoutIsOpen(false)}
      />
    </div>
  );
};
