import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Product from "../components/Products";
import CheckOut from "../components/checkout";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import EmailVerification from "../components/EmailVerification";
import ForgetPassword from "../components/ForgetPassword";
import Search from "../components/Search";
import Category from "../components/Category";
import AllProducts from "../components/AllProducts";
import NewPassword from "../components/ChangePassword";
import Payment from "../components/Payment";
import Allcategory from "../components/AllCategories";
import Layout from "../layout/Layout";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/category/:catid" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:verificationId" element={<EmailVerification />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/changepassword/:fpcode" element={<NewPassword />} />
        <Route path="/payment/:transId" element={<Payment />} />
        <Route path="/categories" element={<Allcategory />} />
      </Route>
    </Routes>
  );
};

export default PublicRoute;
