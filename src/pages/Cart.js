import CartCards from "../components/CartCards.js";
import CartTableHeader from "../components/CartTableHeader.js";
import NavBar from "../components/NavBar.js";
import { useEffect, useState } from "react";
import { MDBTableHead, MDBTable, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

export default function Products() {
   const [cart, setCart] = useState([]);

   const retrieveToken = localStorage.getItem("token");
   const [total, setTotal] = useState(0);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/orders/cart/yourCart`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data.products);
            let totalCartAmount = [];

            data.products.forEach((product) => {
               totalCartAmount.push(product.subTotal);
            });
            setTotal(
               (
                  Math.round(
                     totalCartAmount.reduce(
                        (newValue, oldValue) => newValue + oldValue
                     ) * 100
                  ) / 100
               ).toLocaleString()
            );
         });
   }, []);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/orders/cart/yourCart`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data.products);

            setCart(
               data.products.map((carts) => {
                  return <CartCards key={carts._id} cartProps={carts} />;
               })
            );
         });
   }, []);

   function checkOut(e) {
      fetch(`${process.env.REACT_APP_API_URL}/orders/cart/checkOutCartItems`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
            "Content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data) {
               Swal.fire({
                  title: "Successfully checkout",
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            }
         });
   }

   if (cart.length === 0) {
      return (
         <>
            <NavBar />

            <h2 className="text-center mt-5">No cart available</h2>
         </>
      );
   } else {
   }
   return (
      <>
         <NavBar />
         <h2 className="text-center mt-5 pt-5">Your cart items</h2>
         <MDBTable hover align="middle" className="table w-100">
            <CartTableHeader />
         </MDBTable>

         <div className="">{cart}</div>
         <div className="mt-2">
            <div className="p-0 m-0 mx-3  d-md-flex justify-content-md-end justify-content-center align-items-center flex-md-row flex-column ">
               <h6 className="p-0 m-0 mx-2">Total: </h6>
               <input
                  className="text-center mx-2 p-0 "
                  type="number"
                  placeholder={`PHP ${total}`}
                  disabled
               />
               <MDBBtn color="danger" rounded onClick={checkOut}>
                  Checkout
               </MDBBtn>
            </div>
            <br />
         </div>
      </>
   );
}
