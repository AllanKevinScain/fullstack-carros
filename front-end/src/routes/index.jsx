import { Routes, Route } from "react-router";
import { LayoutDefault } from "./layouts";
import {
  NotFoundPage,
  ProductPage,
  ProductsPage,
  SearchPage,
  UserPage,
  UsersPage,
} from "./pages";

export const CustomRoutes = () => {
  return (
    <Routes>
      <Route element={<LayoutDefault />}>
        <Route index path="product" element={<ProductsPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="user" element={<UsersPage />} />
        <Route path="user/:userId" element={<UserPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
