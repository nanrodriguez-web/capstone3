import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import {
   MDBBadge,
   MDBBtn,
   MDBTable,
   MDBTableHead,
   MDBTableBody,
   MDBModal,
   MDBModalDialog,
   MDBModalContent,
   MDBModalHeader,
   MDBModalTitle,
   MDBModalBody,
   MDBModalFooter,
   MDBBtnGroup,
   MDBIcon,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function OrdersCardCancelled({ orderCancelledProps }) {
   const {
      username,
      email,
      products,
      isActive,
      totalAmount,
      purchasedOn,
      _id,
   } = orderCancelledProps;

   const [productNames, setProductNames] = useState([]);
   const [orderQuantity, setOrderQuantity] = useState([]);

   const [cancelOrderModal, setCancelOrderModal] = useState(false);
   const toggleShow2 = () => setCancelOrderModal(!cancelOrderModal);
   useEffect(() => {
      const listProducts = products.map((productLists) => {
         return productLists.productName;
      });
      setProductNames(listProducts);

      const quantityProducts = products.map((productLists) => {
         return productLists.quantity;
      });
      setOrderQuantity(quantityProducts);
   }, []);

   const retrieveToken = localStorage.getItem("token");

   function cancelOrder(e) {
      fetch(`${process.env.REACT_APP_API_URL}/orders/cancelOrder/${_id}`, {
         method: "PUT",
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               Swal.fire({
                  title: "Your order has been canceled",
                  icon: "info",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            }
            console.log(data);
         });
   }

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

   return (
      <>
         <MDBTable hover align="middle" responsive>
            <MDBTableBody>
               <tr key={_id}>
                  <td style={{ width: `15%` }} className="overflow-hidden">
                     <div className="">
                        <div className="">
                           <p className="fw-bold mb-1">{username}</p>
                           <p className="text-muted mb-0 m-0 text-wrap overflow-hidden">
                              {email}
                           </p>
                        </div>
                     </div>
                  </td>
                  <td style={{ width: `15%` }}>
                     <p className="fw-normal mb-1 pe-3">{purchasedOn}</p>
                  </td>
                  <td style={{ width: `20%` }}>
                     {productNames.map((products) => (
                        <ul className="p-0">
                           <li>
                              <p className="fw-normal mb-1">{products}</p>
                           </li>
                        </ul>
                     ))}
                  </td>
                  <td style={{ width: `10%` }}>
                     {orderQuantity.map((quantity) => (
                        <ul className="p-0">
                           <li>
                              {quantity > 1 ? (
                                 <p className="fw-normal mb-1">
                                    {quantity} pcs
                                 </p>
                              ) : (
                                 <p className="fw-normal mb-1">{quantity} pc</p>
                              )}
                           </li>
                        </ul>
                     ))}
                  </td>
                  {isAdmin ? (
                     <td style={{ width: `10%` }}>
                        <p className="fw-normal mb-1">
                           PHP {totalAmount.toLocaleString()}
                        </p>
                     </td>
                  ) : (
                     <>
                        <td
                           style={{ width: `10%` }}
                           className="position-relative"
                        >
                           <p className="fw-normal mb-1">
                              PHP {totalAmount.toLocaleString()}
                           </p>
                        </td>
                     </>
                  )}
               </tr>
            </MDBTableBody>
         </MDBTable>
         {/* cancel order modal */}
         <MDBModal
            tabIndex="-1"
            show={cancelOrderModal}
            setShow={setCancelOrderModal}
         >
            <MDBModalDialog centered>
               <MDBModalContent>
                  <MDBModalHeader>
                     <MDBModalTitle>Are you Sure?</MDBModalTitle>
                     <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow2}
                     ></MDBBtn>
                  </MDBModalHeader>

                  <MDBModalFooter>
                     <MDBBtn color="secondary" onClick={toggleShow2}>
                        Cancel
                     </MDBBtn>
                     <MDBBtn onClick={cancelOrder}>Yes</MDBBtn>
                  </MDBModalFooter>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>
      </>
   );
}
