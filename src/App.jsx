import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { User } from "./components/User";

export default function App() {

  return (
    <>
      <ToastContainer />
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Login value="signin" />} />
          <Route path="/register" element={<Login value="register" />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </CartProvider>
    </>
  );
}
