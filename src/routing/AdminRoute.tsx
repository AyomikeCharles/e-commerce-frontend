import { Routes, Route } from "react-router-dom";
import AdminDahboard from "../components/admin/AdminDashboard";
import Products from "../components/admin/Products";
import AddProducts from "../components/admin/AddProducts";
import Categories from "../components/admin/Categories";
import AddCategories from "../components/admin/AddCategories";
import Orders from "../components/admin/Orders";
import Invoice from "../components/admin/Invoice";
import Users from "../components/admin/Users";
import Admins from "../components/admin/Admins";
import OrderDetails from "../components/admin/OrderDetails";
import InvoiceDetails from "../components/admin/InvoiceDetails";
import UserDetails from "../components/admin/UserDetails";
import AdminDetails from "../components/admin/AdminDetails";
import Profile from "../components/admin/Profile";
import EditProfile from "../components/admin/EditProfile";
import ChangePassword from "../components/admin/ChangePassword";
import EditProducts from "../components/admin/EditProduct";
import ProductDetails from "../components/admin/ProductDetails";
import EditCategories from "../components/admin/EditCategories";
import CategoryDetails from "../components/admin/CategoryDetails";
import Region from "../components/admin/Region";
import AddRegion from "../components/admin/AddRegion";
import RegionDetails from "../components/admin/RegionDetails";
import EditRegion from "../components/admin/EditRegion";
import Protect from "../res/RoleProtect";
import LoginProtect from "../res/LoginProtect";
import AdminLayout from "../layout/AdminLayout";
import roles from "../res/roles";

const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<LoginProtect />}>
        <Route
          element={<Protect acceptedRole={[roles.admin, roles.superAdmin]} />}
        >
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDahboard />} />

            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="editprofille" element={<EditProfile />} />
              <Route path="changepassword" element={<ChangePassword />} />
            </Route>

            <Route path="products">
              <Route index element={<Products />} />
              <Route path="productdetails/:id" element={<ProductDetails />} />
              <Route path="addproducts" element={<AddProducts />} />
              <Route path="editproduct/:id" element={<EditProducts />} />
            </Route>

            <Route path="orders">
              <Route index element={<Orders />} />
              <Route path="orderdetails/:id" element={<OrderDetails />} />
            </Route>

            <Route path="invoice">
              <Route index element={<Invoice />} />
              <Route path="invoicedetails/:id" element={<InvoiceDetails />} />
            </Route>

            <Route path="users">
              <Route index element={<Users />} />
              <Route path="userdetails/:id" element={<UserDetails />} />
            </Route>

            <Route path="region">
              <Route index element={<Region />} />
              <Route path="addregion" element={<AddRegion />} />
              <Route path="regiondetails/:id" element={<RegionDetails />} />
              <Route path="editregion/:id" element={<EditRegion />} />
            </Route>

            <Route element={<Protect acceptedRole={[roles.superAdmin]} />}>
              <Route path="admins">
                <Route index element={<Admins />} />
                <Route path="admindetails/:id" element={<AdminDetails />} />
              </Route>
              {/* <Route path='/admin/transaction' element={<Transactions/>} /> */}

              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path="addcategories" element={<AddCategories />} />
                <Route
                  path="categorydetails/:id"
                  element={<CategoryDetails />}
                />
                <Route path="editcategory/:id" element={<EditCategories />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoute;
