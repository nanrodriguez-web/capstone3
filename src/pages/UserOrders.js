import OrdersCard from "../components/OrdersCard.js";
import OrdersCardCancelled from "../components/OrdersCardCancelled.js";
import OrderTableHeader from "../components/OrderTableHead.js";
import NavBar from "../components/NavBar.js";
import { useEffect, useState } from "react";
import { MDBTableHead, MDBTable, MDBTableBody } from "mdb-react-ui-kit";
import FloatingButton from "../components/FloatingButton.js";

export default function UserOrders() {
   const [order, setOrder] = useState([]);
   const [orderCancelled, setOrderCancelled] = useState([]);

   const retrieveToken = localStorage.getItem("token");

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/orders/userOrder`, {
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

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/orders/userOrderCancelled`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setOrderCancelled(
               data.map((orders) => {
                  return (
                     <OrdersCardCancelled
                        key={orders._id}
                        orderCancelledProps={orders}
                     />
                  );
               })
            );
         });
   }, []);

   if (order.length === 0) {
      return (
         <div className="mt-5">
            <NavBar />
            <h2 className="text-center">You don't have any orders yet</h2>
         </div>
      );
   } else {
   }
   return (
      <>
         <NavBar />
         <h2 className="text-center mt-5 pt-5">Pending Orders</h2>
         <MDBTable hover align="middle" responsive>
            <OrderTableHeader />
         </MDBTable>
         <div className="">{order}</div>
         <h2 className="text-center mt-5 pt-5">Cancelled Orders</h2>
         <MDBTable align="middle" responsive>
            <OrderTableHeader />
         </MDBTable>
         <div className="text-muted">{orderCancelled}</div>
         <FloatingButton />
      </>
   );
}
