import "./Header.scss";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import currenyFormat from "../../helpers/currencyFormat";
import { useState } from "react";
import { TbSquareRoundedX } from "react-icons/tb";

export const Header = ({ hideSearch }) => {
  const basketTotal = useSelector((state) => state.basket.basketTotal);
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(() => {
    return searchParams.get("search") || "";
  });

  return (
    <header className="header">
      <div className="container h-100 header-bar">
        <div className="row m-0 h-100 align-items-center">
          <Link to={"/"} className="col col-md-3 col-xl-2 ps-0 logo">
            Eteration
          </Link>

          <div className="d-none d-md-block col-md-6 col-xl-8">
            {!hideSearch && (
              <div className="search">
                <FaSearch className="search-icon" />
                <input
                  placeholder="search"
                  value={searchText}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchParams({
                        ["search"]: searchText,
                      });
                    }
                  }}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                {searchText !== "" && (
                  <TbSquareRoundedX
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSearchText("");
                      setSearchParams({
                        ["search"]: "",
                      });
                    }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="col col-md-3 col-xl-2 d-flex flex-row gap-2 justify-content-end pe-0">
            <div className="basket">
              <FaBasketShopping /> {currenyFormat(basketTotal)}
            </div>
            <div className="user">
              <FaUser /> Okan
            </div>
          </div>
        </div>
        <div className="d-flex d-md-none justify-content-center">
          <div className="search">
            <FaSearch className="search-icon" />
            <input
              placeholder="search"
              value={searchText}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchParams({
                    ["search"]: searchText,
                  });
                }
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            {searchText !== "" && (
              <TbSquareRoundedX
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchText("");
                  setSearchParams({
                    ["search"]: "",
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  hideSearch: PropTypes.any,
};
