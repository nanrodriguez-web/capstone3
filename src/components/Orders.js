import OrdersCard from "../components/OrdersCard";
import NavBar from "../components/NavBar";

import { useEffect, useState } from "react";
import { MDBTableHead, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import FloatingButton from "../components/FloatingButton";
import OrderTableHeader from "../components/OrderTableHead";
import { Navigate } from "react-router-dom";

export default function Products() {
   const [order, setOrder] = useState([]);

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

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/orders/`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setOrder(
               data.map((orders) => {
                  return <OrdersCard key={orders._id} orderProps={orders} />;
               })
            );
         });
   }, []);

   return (
      <>
         <NavBar />
         {order.length === 0 ? (
            <>
               <h4 className="text-center">No orders available</h4>
            </>
         ) : (
            <>
               <h2 className="text-center mt-5 pt-5">Pending Orders</h2>
               <OrderTableHeader />
               <div className="">{order}</div>
            </>
         )}
      </>
   );
}
