import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
  basketTotal: 0,
  basketIsLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProductToBasket(state, action) {
      const index = state.basket.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index > -1) {
        state.basket[index].count += 1;
      } else {
        state.basket.push({ ...action.payload, count: 1 });
      }

      state.basketTotal += parseInt(action.payload.price, 10);
    },
    removeProductFromBasket(state, action) {
      const index = state.basket.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index > -1) {
        if (state.basket[index].count > 1) {
          state.basket[index].count -= 1;
        } else {
          state.basket.splice(index, 1);
        }
        state.basketTotal -= parseInt(action.payload.price, 10);
      }
    },
    clearBasket(state) {
      state.basket = [];
      state.basketTotal = 0;
      state.basketIsLoading = false;
    },
    setIsLoading(state, action) {
      state.basketIsLoading = action.payload;
    },
  },
});

export const {
  addProductToBasket,
  removeProductFromBasket,
  clearBasket,
  setIsLoading,
} = basketSlice.actions;
export default basketSlice.reducer;
