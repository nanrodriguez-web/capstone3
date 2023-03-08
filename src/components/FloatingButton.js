import { MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingButton() {
   const retrieveToken = localStorage.getItem("token");
   const [isAdmin, setIsAdmin] = useState("");

   const [cartItems, setCartItems] = useState(0);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               `${process.env.REACT_APP_API_URL}/orders/cart/yourCart`,
               {
                  headers: {
                     Authorization: `Bearer ${retrieveToken}`,
                  },
               }
            );
            const data = await response.json();
            if (data === true && data !== undefined) {
               setCartItems(data.products.length);
            }
         } catch (error) {
            console.error("Error fetching cart items:", error);
         }
      };

      fetchData();
   }, []);

   function addProduct(e) {
      navigate("/addingProduct");
   }
   function navigateToCart(e) {
      navigate("/cart");
   }
   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data !== undefined) {
               setIsAdmin(data.isAdmin);
            }
         });
   }, [isAdmin]);

   return isAdmin ? (
      <MDBRow className="addButtonFloating m-0 p-0 d-flex align-items-center">
         <MDBCol md="6">
            {/* <MDBBtn
               color="info"
               className="m-0 p-3 d-flex justify-content-center align-items-center"
               rounded
            > */}
            <MDBIcon
               onClick={addProduct}
               className="icon"
               fas
               icon="plus"
               size="3x"
            />
            {/* </MDBBtn> */}
            <span className="toolTip">Add product</span>
         </MDBCol>
      </MDBRow>
   ) : (
      <MDBRow className="addButtonFloating m-0 p-0 d-flex align-items-center">
         {retrieveToken !== null ? (
            <>
               <span className="numberOfCartItem">{cartItems}</span>
               <MDBCol md="6">
                  {/* <MDBBtn
                     color="info"
                     className="m-0 p-3 d-flex justify-content-center align-items-center"
                     rounded
                     onClick={navigateToCart}
                  > */}
                  <MDBIcon
                     onClick={navigateToCart}
                     className="icon"
                     fas
                     icon="cart-plus"
                     size="3x"
                  />
                  {/* </MDBBtn> */}
                  <span className="toolTip">Your Cart</span>
               </MDBCol>
            </>
         ) : (
            <MDBCol md="6"></MDBCol>
         )}
      </MDBRow>
   );
}
