import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { MainPage } from "../pages/MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../store/store";

import ProductCard from "../components/ProductCard/ProductCard";
import currenyFormat from "../helpers/currencyFormat";
import { BasketCard } from "../components/BasketCard/BasketCard";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Test sırasında tekrar tekrar sorgu yapılmasını engeller
      },
    },
  });

export function renderWithClient(ui) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

describe("MainPage Component", () => {
  it("should render skeletons", async () => {
    const queryClient = createTestQueryClient();
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <MainPage />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const skeletons = await screen.findAllByTestId("skeleton");

    expect(skeletons.length).toBeGreaterThan(0);
  });
});

describe("Product Card Component", () => {
  it("successful product card component", async () => {
    const queryClient = createTestQueryClient();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ProductCard
              data={{
                createdAt: "2023-07-17T05:04:01.235Z",
                name: "Rolls Royce Taurus",
                image: "https://loremflickr.com/640/480/transport",
                price: "779.00",
                description:
                  "Similique iste repellat minima recusandae similique. Voluptates omnis perferendis eius possimus dolor aut dignissimos temporibus. Quo molestias praesentium quasi rerum. Vitae harum pariatur recusandae reprehenderit. Blanditiis deleniti delectus quia. Suscipit blanditiis quod sunt expedita animi quis.\nInventore provident molestiae dicta aut corrupti. Dicta odio dolore minima voluptatibus velit velit ea voluptatibus. Aliquam occaecati magnam consectetur illum natus. Ipsum est ut quia est ab. Eius ad tempore libero ipsa ea atque.\nPariatur aperiam voluptas similique occaecati repellendus. Voluptas necessitatibus ut exercitationem non tenetur enim. Iure aliquam maiores eveniet consequatur nihil.",
                model: "Jetta",
                brand: "Volkswagen",
                id: "4",
              }}
            />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const productName = await screen.findByTestId("name");
    const productPrice = await screen.findByTestId("price");

    expect(productName).toHaveTextContent("Rolls Royce Taurus");
    expect(productPrice).toHaveTextContent(currenyFormat("779.00"));
  });
});

describe("Add To Cart", () => {
  it("successful added to cart", async () => {
    const queryClient = createTestQueryClient();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ProductCard
              data={{
                createdAt: "2023-07-17T05:04:01.235Z",
                name: "Rolls Royce Taurus",
                image: "https://loremflickr.com/640/480/transport",
                price: "779.00",
                description:
                  "Similique iste repellat minima recusandae similique. Voluptates omnis perferendis eius possimus dolor aut dignissimos temporibus. Quo molestias praesentium quasi rerum. Vitae harum pariatur recusandae reprehenderit. Blanditiis deleniti delectus quia. Suscipit blanditiis quod sunt expedita animi quis.\nInventore provident molestiae dicta aut corrupti. Dicta odio dolore minima voluptatibus velit velit ea voluptatibus. Aliquam occaecati magnam consectetur illum natus. Ipsum est ut quia est ab. Eius ad tempore libero ipsa ea atque.\nPariatur aperiam voluptas similique occaecati repellendus. Voluptas necessitatibus ut exercitationem non tenetur enim. Iure aliquam maiores eveniet consequatur nihil.",
                model: "Jetta",
                brand: "Volkswagen",
                id: "4",
              }}
            />
            <BasketCard />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    await userEvent.click(screen.getByTestId("add-to-cart"));
    const checkoutTotal = await screen.findByTestId("checkout-total");

    expect(checkoutTotal).toHaveTextContent(currenyFormat("779.00"));
  });
});
