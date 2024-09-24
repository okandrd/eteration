import PropTypes from "prop-types";
import "./FilterCard.scss";
import { useSearchParams } from "react-router-dom";

export const FilterCard = ({
  sortBy,
  setSortBy,
  brands,
  models,
  checkedBrands,
  setCheckedBrands,
  checkedModel,
  setCheckedModel,
}) => {
  let [searchParams, setSearchParams] = useSearchParams();

  let listingModels =
    checkedBrands.length > 0
      ? checkedBrands.flatMap((key) => models[key])
      : Object.values(models).flat(1);

  return (
    <div className="filter-card">
      <div className="card-item">
        <span className="title">Sort By</span>
        <div className="content">
          <div className="input-group">
            <input
              type="radio"
              id="sortby-2"
              value="new-to-old"
              name="sortBy"
              checked={sortBy === "new-to-old"}
              onChange={() => {
                setSortBy("new-to-old");
              }}
            />
            <label htmlFor="sortby-2" className="radio-label">
              New to old
            </label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="sortby-1"
              value="old-to-new"
              name="sortBy"
              checked={sortBy === "old-to-new"}
              onChange={() => {
                setSortBy("old-to-new");
              }}
            />
            <label htmlFor="sortby-1" className="radio-label">
              Old to new
            </label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="sortby-3"
              value="price-high-to-low"
              name="sortBy"
              checked={sortBy === "price-high-to-low"}
              onChange={() => {
                setSortBy("price-high-to-low");
              }}
            />
            <label htmlFor="sortby-3" className="radio-label">
              Price high to low
            </label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="sortby-4"
              value="price-low-to-high"
              name="sortBy"
              checked={sortBy === "price-low-to-high"}
              onChange={() => {
                setSortBy("price-low-to-high");
              }}
            />
            <label htmlFor="sortby-4" className="radio-label">
              Price low to high
            </label>
          </div>
        </div>
      </div>

      <div className="card-item">
        <span className="title">Brands</span>
        <div className="content">
          <div className="w-100 h-100 overflow-x-hidden overflow-y-scroll">
            {brands.map((brand, index) => (
              <div key={index} className="input-group">
                <input
                  type="checkbox"
                  id={`brand-${index}`}
                  value={brand}
                  name="brand"
                  checked={checkedBrands.includes(brand)}
                  onChange={() => {
                    let tempCheckedBrands = [];

                    if (checkedBrands.includes(brand)) {
                      tempCheckedBrands = checkedBrands.filter(
                        (b) => b !== brand
                      );
                    } else {
                      tempCheckedBrands = [...checkedBrands, brand];
                    }

                    let formattedBrands = tempCheckedBrands.join(",");
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      ["brands"]: formattedBrands,
                      ["models"]: [],
                    });
                    setCheckedBrands(tempCheckedBrands);
                    setCheckedModel([]);
                  }}
                />
                <label htmlFor={`brand-${index}`} className="radio-label">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-item">
        <span className="title">Model</span>
        <div className="content">
          <div className="w-100 h-100 overflow-x-hidden overflow-y-scroll">
            {[...new Set(listingModels)].map((model, index) => (
              <div key={index} className="input-group">
                <input
                  type="checkbox"
                  id={`model-${index}`}
                  value={model}
                  name="model"
                  checked={checkedModel.includes(model)}
                  onChange={() => {
                    let tempCheckedModel = [];
                    if (checkedModel.includes(model)) {
                      tempCheckedModel = checkedModel.filter(
                        (b) => b !== model
                      );
                    } else {
                      tempCheckedModel = [...checkedModel, model];
                    }
                    let formattedModels = tempCheckedModel.join(",");
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      ["models"]: formattedModels,
                    });
                    setCheckedModel(tempCheckedModel);
                  }}
                />
                <label htmlFor={`model-${index}`} className="radio-label">
                  {model}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

FilterCard.propTypes = {
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
  brands: PropTypes.arrayOf(PropTypes.string),
  models: PropTypes.any,
  checkedBrands: PropTypes.arrayOf(PropTypes.string),
  setCheckedBrands: PropTypes.func,
  checkedModel: PropTypes.arrayOf(PropTypes.string),
  setCheckedModel: PropTypes.func,
};
