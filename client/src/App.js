import { Routes, Route } from 'react-router-dom'
import About from './pages/About';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/search" element={<Search />} />


        {/* User Private Route */}
        <Route path="/dashboard/user" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />

        </Route>

        {/* Admin Private Route */}
        <Route path="/dashboard/admin" element={<AdminRoute />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />

          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />

        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

    </>
  );
}

export default App;
