

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import AddProduct from './pages/admin/AddProduct'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProduct from './pages/admin/AdminProduct'
import AdminSales from './pages/admin/AdminSales'
import AdminUsers from './pages/admin/AdminUsers'
import ShowUserOrders from './pages/admin/ShowUserOrders'
import UserInfo from './pages/admin/UserInfo'
import Cart from './pages/Cart'
import DashBoard from './pages/DashBoard'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import SingleProduct from './pages/SingleProduct'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import AddressForm from './pages/AddressForm'
import OrderSuccess from './pages/OrderSuccess'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOtp from './pages/auth/VerifyOtp'
import ChangePassword from './pages/auth/ChangePassword'

const router=createBrowserRouter([
  {
    path:'/',
    element:<>
    <Navbar/><Home/><Footer/>
    </>
  },
  {
    path:'/signup',
    element:<>
    <Signup/>
    </>
  },
  {
    path:'/login',
    element:<>
    <Login/>
    </>
  },
  {
    path:'/verify',
    element:<>
    <Verify/>
    </>
  },
  {
    path:'/verify/:token',
    element:<>
    <VerifyEmail/>
    </>
  },
  {
    path:'/profile/:userId',
    element:<>
    <ProtectedRoute/>
    <Navbar/>
    <Profile/>
    </>
  },
  {
    path:'/products',
    element:<>
    <Navbar/>
    <Products/>
    </>
  },
  {
    path:'/product/:id',
    element:<>
    <Navbar/>
    <SingleProduct/>
    </>
  },
  {
    path:'/cart',
    element:<>
    <ProtectedRoute/>
    <Navbar/>
    <Cart/>
    </>
  },
  {
    path:'/address',
    element:<>
    <ProtectedRoute>
      <AddressForm/>
    </ProtectedRoute>
    </>
  },{
    path:'/order-success',
    element:<>
    <ProtectedRoute>
      <OrderSuccess/>
    </ProtectedRoute>
    </>
  },
  {
    path:'/forgot-password',
    element:<>
    <ForgotPassword/>
    </>
  },
  {
    path:"/verify-otp/:email",
    element:<>
    <VerifyOtp/>
    </>
  },
  {
    path:"/change-password/:email",
    element:<>
    <ChangePassword/>
    </>
  },

  {
    path:'/dashboard',
    element:<ProtectedRoute adminOnly={true}><Navbar/><DashBoard/></ProtectedRoute>,
    children:[
      {path:"sales",
      element:<AdminSales/>
      },
      {path:"add-product",
      element:<AddProduct/>
      },
      {path:"products",
      element:<AdminProduct/>
      },
      {path:"Order",
      element:<AdminOrders/>
      },
      {path:"users/orders/:userId",
      element:<ShowUserOrders/>
      },{path:"users",
      element:<AdminUsers/>
      },
      {path:"users/:id",
      element:<UserInfo/>
      },
    ],
  }
])

const App = () => {
  return (
<>
<RouterProvider router={router}/>
</>
  )
}

export default App
