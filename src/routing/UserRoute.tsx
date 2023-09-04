import { Routes, Route } from "react-router-dom";
import LoginProtect from "../res/LoginProtect";
import UserLayout from "../layout/UserLayout";
import Protect from "../res/RoleProtect";
import UserProfile from "../components/users/UserProfile";
import UserEditProfile from "../components/users/UserEditProfile";
import UserChangePassword from "../components/users/UserChangePassword";
import UserOrders from "../components/users/Orders";
import UserOrderDetails from "../components/users/OrderDetails";
import UserInvoice from "../components/users/Invoice";
import UserInvoiceDetails from "../components/users/InvoiceDetails";
import Wishlist from "../components/users/Wishlist";
import roles from "../res/roles";

const UserRoute = () => {
  return (
    <Routes>
      <Route element={<LoginProtect />}>
        <Route element={<Protect acceptedRole={[roles.users]} />}>
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserProfile />} />
            <Route path="editprofille" element={<UserEditProfile />} />
            <Route path="changepassword" element={<UserChangePassword />} />

            <Route path="orders">
              <Route index element={<UserOrders />} />
              <Route path="orderdetails/:id" element={<UserOrderDetails />} />
            </Route>

            <Route path="invoice">
              <Route index element={<UserInvoice />} />
              <Route
                path="invoicedetails/:id"
                element={<UserInvoiceDetails />}
              />
            </Route>

            <Route path="wishlist">
              <Route index element={<Wishlist />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoute;
