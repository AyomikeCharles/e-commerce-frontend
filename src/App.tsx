import { Routes, Route } from 'react-router-dom';

//public
import Home from './components/Home';
import Product from './components/Products';
import CheckOut from './components/checkout';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EmailVerification from './components/EmailVerification';
import ForgetPassword from './components/ForgetPassword';

//admin
import AdminDahboard from './components/admin/AdminDashboard';
import Products from './components/admin/Products';
import AddProducts from './components/admin/AddProducts';
import Categories from './components/admin/Categories';
import AddCategories from './components/admin/AddCategories';
import Orders from './components/admin/Orders';
import Invoice from './components/admin/Invoice';
import Users from './components/admin/Users';
import Admins from './components/admin/Admins';
import OrderDetails from './components/admin/OrderDetails';
import InvoiceDetails from './components/admin/InvoiceDetails';
import UserDetails from './components/admin/UserDetails';
import AdminDetails from './components/admin/AdminDetails';
import Profile from './components/admin/Profile';
// import Transactions from './components/admin/Transactions';
import EditProfile from './components/admin/EditProfile';
import ChangePassword from './components/admin/ChangePassword';
import EditProducts from './components/admin/EditProduct';
import ProductDetails from './components/admin/ProductDetails';
import EditCategories from './components/admin/EditCategories';
import CategoryDetails from './components/admin/CategoryDetails';


//layout
import Layout from './layout/Layout';
import AdminLayout from './layout/AdminLayout';
import Protect from './res/RoleProtect';
import roles from './res/roles';
import LoginProtect from './res/LoginProtect';



//more
import Search from './components/Search';
import Category from './components/Category';
import Region from './components/admin/Region';
import AddRegion from './components/admin/AddRegion';
import RegionDetails from './components/admin/RegionDetails';
import EditRegion from './components/admin/EditRegion';
import AllProducts from './components/AllProducts';


//users
import UserDashboard from './components/users/UserDashboard';
import UserLayout from './layout/UserLayout';
import UserProfile from './components/users/UserProfile';
import UserEditProfile from './components/users/UserEditProfile';
import UserChangePassword from './components/users/UserChangePassword';
import UserOrders from './components/users/Orders';
import UserOrderDetails from './components/users/OrderDetails';
import UserInvoice from './components/users/Invoice';
import UserInvoiceDetails from './components/users/InvoiceDetails';
import Wishlist from './components/users/Wishlist';
import NewPassword from './components/ChangePassword';
import Payment from './components/Payment';









function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>

          {/* public route start */}

          <Route index element={<Home/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/checkout' element={<CheckOut/>} />
          <Route path='/search/:search' element={<Search/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/category/:catid' element={<Category/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/verify/:verificationId' element={<EmailVerification/>} />
          <Route path='/forgetpassword' element={<ForgetPassword/>} />
          <Route path='/changepassword/:fpcode' element={<NewPassword/>} />
          <Route path='/payment/:transId' element={<Payment/>} />





          {/* public route ends */}


          {/*login persist start */}
          <Route element={<LoginProtect/>}>

          {/* user start */}

          <Route element={<Protect acceptedRole={[roles.users]}/>}>
            <Route path='/user'  element={<UserLayout/>}>
        
              <Route index  element={<UserDashboard/>} />
              <Route path='profile'>
                <Route index element={<UserProfile/>} />
                <Route path='editprofille' element={<UserEditProfile/>} />
                <Route path='changepassword' element={<UserChangePassword/>} />
              </Route> 


              <Route path='orders'>
              <Route index element={<UserOrders/>} />
              <Route path='orderdetails/:id' element={<UserOrderDetails/>} />
            </Route>
            


            <Route path='invoice'>
              <Route index element={<UserInvoice/>} />
              <Route path='invoicedetails/:id' element={<UserInvoiceDetails/>} />
            </Route>


            <Route path='wishlist'>
              <Route index element={<Wishlist/>} />
            </Route>

            </Route>
          </Route>
         
           
        
        
        {/* user end */}

        

        {/* admin start */}

        <Route element={<Protect acceptedRole={[roles.admin, roles.superAdmin]}/>}>
          <Route path='admin'  element={<AdminLayout/>}>
            <Route index element={<AdminDahboard/>} />

            <Route path='profile'>
              <Route index element={<Profile/>} />
              <Route path='editprofille' element={<EditProfile/>} />
              <Route path='changepassword' element={<ChangePassword/>} />
            </Route> 

            <Route path='products'>
              <Route index element={<Products/>} />
              <Route path='productdetails/:id' element={<ProductDetails/>} />
              <Route path='addproducts' element={<AddProducts/>} />
              <Route path='editproduct/:id' element={<EditProducts/>} />
            </Route>
            


            <Route path='orders'>
              <Route index element={<Orders/>} />
              <Route path='orderdetails/:id' element={<OrderDetails/>} />
            </Route>
            


            <Route path='invoice'>
              <Route index element={<Invoice/>} />
              <Route path='invoicedetails/:id' element={<InvoiceDetails/>} />
            </Route>
            

            <Route path='users'>
              <Route index element={<Users/>} />
              <Route path='userdetails/:id' element={<UserDetails/>} />
            </Route>



              <Route path='region'>
                <Route index element={<Region/>} />
                <Route path='addregion' element={<AddRegion/>} />
                <Route path='regiondetails/:id' element={<RegionDetails/>} />
                <Route path='editregion/:id' element={<EditRegion/>} />
              </Route>




            <Route element={<Protect acceptedRole={[roles.superAdmin]}/>}>
              <Route path='admins'>
                <Route index element={<Admins/>} />
                <Route path='admindetails/:id' element={<AdminDetails/>} />
              </Route>
            {/* <Route path='/admin/transaction' element={<Transactions/>} /> */}


              <Route path='categories'>
                <Route index element={<Categories/>} />
                <Route path='addcategories' element={<AddCategories/>} />
                <Route path='categorydetails/:id' element={<CategoryDetails/>} />
                <Route path='editcategory/:id' element={<EditCategories/>} />
              </Route>

            </Route>

            </Route>
          </Route>
      
        
        {/* admin end */}

        </Route>
        {/*login persist start */}
       
        </Route>
      </Routes>
    </>
  );
}

export default App;
