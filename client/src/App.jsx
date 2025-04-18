import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import ShoppingLayout from "./components/shopping/layout";
import PageNotFound from "./pages/notFound/index";
import ShoppingHome from "./pages/shopping/home";
import ShoppingCheckout from "./pages/shopping/checkout";
import ShoppingLists from "./pages/shopping/listing";
import ShoppingAccount from "./pages/shopping/account";
import CheckAuthentication from "./components/common/checkAuth";
import UnauthAccess from "./pages/notFound/unauthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthUser } from "./store/authSlice";
import LoadingBars from "./loading";
import PaymentSuccessPage from "./pages/shopping/paymentSuccess";
import PaypalReturnPage from "./pages/shopping/paymentReturn";
import SearchProducts from "./pages/shopping/search";
import PaymentCancelPage from "./pages/shopping/paymentCancel";

function App() {
  // const isAuthenticated = true; // Replace with your actual authentication logic
  // const user = { name:"sapna",
  //   role:'admin'
  //  }; // Replace with your actual user data

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuthUser(token));
  }, [dispatch]);

  if (isLoading) return <LoadingBars /> || <div>Loading....</div>;

  // console.log("testing", user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}
      {/* <h1>Header components</h1> */}
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuthentication
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuthentication>
          }
        />
        <Route
          path="auth"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuthentication>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Admin Releated */}

        <Route
          path="admin"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuthentication>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Releated */}

        <Route
          path="shop"
          element={
            <CheckAuthentication isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuthentication>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="lists" element={<ShoppingLists />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="payment-cancel" element={<PaymentCancelPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Something that is not defined */}

        <Route path="*" element={<PageNotFound />} />
        <Route path="/unauthPage" element={<UnauthAccess />} />
      </Routes>
    </div>
  );
}

export default App;
