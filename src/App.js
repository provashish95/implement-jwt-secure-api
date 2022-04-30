import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products/Products';
import UploadProduct from './components/UploadProducts/UploadProduct';
import OrderList from './components/OrderList/OrderList';
import Login from './components/Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/products' element={<Products></Products>}></Route>
        <Route path='/productUpload' element={
          <PrivateRoute>
            <UploadProduct></UploadProduct>
          </PrivateRoute>
        }></Route>
        <Route path='/orderList' element={
          <PrivateRoute>
            <OrderList></OrderList>
          </PrivateRoute>
        }></Route>

      </Routes>
    </div>
  );
}

export default App;
