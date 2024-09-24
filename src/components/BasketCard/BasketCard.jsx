import React, { useState } from "react";
import "./BasketCard.scss";
import { useDispatch, useSelector } from "react-redux";
import currenyFormat from "../../helpers/currencyFormat";
import {
  addProductToBasket,
  clearBasket,
  removeProductFromBasket,
  setIsLoading,
} from "../../store/features/basket";
import toast from "react-hot-toast";

export const BasketCard = () => {
  const { basket, basketTotal, basketIsLoading } = useSelector(
    (state) => state.basket
  );
  const dispatch = useDispatch();

  const checkout = () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(clearBasket());
      toast.success("Checkout success.", {
        position: "top-right",
      });
    }, 1500);
  };

  return (
    <div className="basket-card">
      <div className="basket-items">
        {basket.length === 0 && (
          <span className="empty-text">Basket is empty</span>
        )}
        {basket.map((product) => {
          return (
            <div className="basket-item" key={product.id}>
              <div className="item-info">
                <span className="item-name">{product.name}</span>
                <span className="item-price">
                  {currenyFormat(product.count * product.price)}
                </span>
              </div>
              <div className="item-count">
                <button
                  className="count-action"
                  onClick={() => {
                    dispatch(removeProductFromBasket(product));
                  }}
                >
                  -
                </button>
                <span className="count-text">{product.count}</span>
                <button
                  className="count-action"
                  onClick={() => {
                    dispatch(addProductToBasket(product));
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="basket-checkout">
        <div className="basket-checkout-total">
          Total Price:{" "}
          <span className="total" data-testid="checkout-total">
            {currenyFormat(basketTotal)}
          </span>
        </div>
        <button
          className="checkout-button"
          disabled={basketIsLoading || basketTotal === 0}
          onClick={() => checkout()}
        >
          Checkout{" "}
          {basketIsLoading && (
            <div
              className="spinner-border text-light spinner-border-sm"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
