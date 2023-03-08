import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Orders from "../components/Orders.js";
import UserOrders from "./UserOrders";

export default function OrderLists() {
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
      return <Orders />;
   } else {
      return <UserOrders />;
   }
}
