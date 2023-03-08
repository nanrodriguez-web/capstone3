import AddProduct from "../components/addProduct.js";
import Home from "./Home";
import { useState, useEffect } from "react";

export default function AddingProduct() {
   const retrieveToken = localStorage.getItem("token");
   const [isAdmin, setIsAdmin] = useState("");
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
   }, []);
   if (isAdmin) {
      return (
         <>
            <AddProduct />
         </>
      );
   } else {
      return <Home />;
   }
}
