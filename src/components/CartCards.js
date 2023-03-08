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
   MDBCol,
   MDBInput,
   MDBRow,
   MDBCardBody,
   MDBCardText,
   MDBCardTitle,
   MDBIcon,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function CartCards({ cartProps }) {
   const [count, setCount] = useState(1);

   function addProduct(e) {
      e.preventDefault();
      setCount(count + 1);
   }
   function subtractProduct(e) {
      e.preventDefault();
      if (count <= 1) {
         setCount(1);
      } else {
         setCount(count - 1);
      }
   }
   const { productName, quantity, subTotal, _id } = cartProps;

   const retrieveToken = localStorage.getItem("token");

   // for modal
   const [centredModal1, setCentredModal1] = useState(false);

   const toggleShow1 = (e) => {
      setCentredModal1(!centredModal1);
      setCount(quantity);
   };

   const [formValue, setFormValue] = useState({
      quantity: quantity,
   });
   const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   };

   function updateCart(e) {
      e.preventDefault();
      fetch(
         `${process.env.REACT_APP_API_URL}/orders/cart/updateYourCart/${_id}`,
         {
            method: "PATCH",
            headers: {
               Authorization: `Bearer ${retrieveToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               quantity: count,
            }),
         }
      )
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            if (data) {
               toggleShow1();
               Swal.fire({
                  title: "Your cart has been updated!",
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload();
                  },
               });
            }
         });
   }

   function deleteCartItem(e) {
      fetch(
         `${process.env.REACT_APP_API_URL}/orders/cart/deleteCartItem/${_id}`,
         {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${retrieveToken}`,
            },
         }
      )
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               Swal.fire({
                  title: "Successfully removed item!",
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            } else {
               Swal.fire({
                  title: "Failed to removed!",
                  icon: "info",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            }
         });
   }

   return (
      <>
         <MDBTable hover align="middle" responsive>
            <MDBTableBody>
               <tr>
                  <td style={{ width: `40%` }}>
                     <div className="d-flex align-items-center">
                        <div className="ms-3">
                           <p className="fw-bold mb-1">{productName}</p>
                        </div>
                     </div>
                  </td>
                  <td style={{ width: `10%` }}>
                     <p className="fw-normal mb-1">{quantity}</p>
                  </td>
                  <td style={{ width: `20%` }}>
                     <p className="fw-normal mb-1">{subTotal}</p>
                  </td>

                  <td
                     className="text-center d-md-block "
                     style={{ width: `auto` }}
                  >
                     <MDBBtn
                        onClick={deleteCartItem}
                        className="mx-1 my-1 p-1 px-3 text-center table-Buttons"
                        color="warning"
                     >
                        Remove
                     </MDBBtn>
                     <MDBBtn
                        onClick={toggleShow1}
                        className="mx-1 my-1 p-1 px-3 table-Buttons "
                        color="info"
                     >
                        Edit
                     </MDBBtn>
                  </td>
               </tr>
            </MDBTableBody>
         </MDBTable>

         {/* modal update*/}
         <MDBModal
            tabIndex="-1"
            show={centredModal1}
            setShow={setCentredModal1}
         >
            <MDBModalDialog centered>
               <MDBModalContent>
                  <MDBModalHeader>
                     <MDBModalTitle>Update Product</MDBModalTitle>
                     <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow1}
                     ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                     <MDBCardBody>
                        <MDBRow
                           tag="form"
                           className="g-3 justify-content-center align-items-center"
                           onSubmit={(e) => updateCart(e)}
                        >
                           <MDBCardTitle className="text-center">
                              Quantity
                           </MDBCardTitle>
                           <div className="mb-2">
                              <div className="d-flex flex-row justify-content-between">
                                 <div>
                                    <MDBBtn
                                       id="subtractButton"
                                       onClick={subtractProduct}
                                       color="warning"
                                       rounded
                                       className="m-1"
                                    >
                                       <MDBIcon fas icon="minus" />
                                    </MDBBtn>
                                    <MDBBtn
                                       id="addButton"
                                       onClick={addProduct}
                                       color="success"
                                       rounded
                                       className="m-1"
                                    >
                                       <MDBIcon fab icon="plus" />
                                    </MDBBtn>
                                 </div>
                                 <input
                                    className="text-center"
                                    value={count}
                                    disabled
                                 />
                              </div>
                           </div>
                           <MDBModalFooter>
                              <MDBBtn color="secondary" onClick={toggleShow1}>
                                 Cancel
                              </MDBBtn>
                              <MDBBtn type="submit" onClick={updateCart}>
                                 Save changes
                              </MDBBtn>
                           </MDBModalFooter>
                        </MDBRow>
                     </MDBCardBody>
                  </MDBModalBody>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>
      </>
   );
}
