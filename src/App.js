import "./App.css";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";

import { MDBContainer } from "mdb-react-ui-kit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Comments from "./pages/Comments";
import UserOrders from "./pages/UserOrders";
// import AddProduct from "./components/AddProduct.js";
import NotFound from "./pages/NotFound";
import OrderLists from "./pages/OrderLists";
import AddingProduct from "./pages/AddingProduct";
import Users from "./pages/Users";
import AboutPage from "./pages/AboutPage";

import loader from "./images/Pulse-1s-200px.svg";

function App() {
   const [loading, setLoading] = useState(false);

   const [user, setUser] = useState({
      id: null,
      isAdmin: null,
   });

   const unsetUser = (user) => {
      localStorage.clear();
   };

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/products/`)
         .then((res) => res.json())
         .then((data) => {
            if (data.length < 0) {
               setLoading(false);
            } else {
               setLoading(true);
            }
         });
   }, []);

   return loading ? (
      <UserProvider value={{ user, setUser, unsetUser }}>
         <>
            <Router>
               <MDBContainer className="mt-5 pt-3 position-relative">
                  <Routes>
                     <Route exact path="/" element={<Home />} />
                     <Route exact path="/register" element={<Register />} />
                     <Route exact path="/login" element={<Login />} />
                     {/* <Route exact path="/addProduct" element={<AddProduct />} /> */}
                     <Route exact path="/userOrder" element={<UserOrders />} />
                     <Route exact path="/cart" element={<Cart />} />
                     <Route exact path="/orderLists" element={<OrderLists />} />
                     <Route exact path="/users" element={<Users />} />
                     <Route exact path="/about" element={<AboutPage />} />
                     <Route
                        exact
                        path="/commentSection"
                        element={<Comments />}
                     />
                     <Route
                        exact
                        path="/addingProduct"
                        element={<AddingProduct />}
                     />

                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </MDBContainer>
            </Router>
         </>
      </UserProvider>
   ) : (
      <div className="loader">
         <img src={loader} alt="" />
      </div>
   );
}

export default App;
