import React, { useState, useEffect, useContext } from "react";
import {
   MDBContainer,
   MDBRow,
   MDBCol,
   MDBCard,
   MDBCardBody,
   MDBCardImage,
   MDBCardTitle,
   MDBIcon,
   MDBCardText,
   MDBRipple,
   MDBBtn,
   MDBModal,
   MDBModalDialog,
   MDBModalContent,
   MDBModalHeader,
   MDBModalTitle,
   MDBModalBody,
   MDBModalFooter,
   MDBInput,
   MDBTextArea,
   MDBCardHeader,
   MDBCardFooter,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import UserContext from "../UserContext";

export default function ProductCard({ productProps }) {
   const navigate = useNavigate();
   const { user } = useContext(UserContext);

   const [count, setCount] = useState(1);

   function addProduct(e) {
      setCount(count + 1);
   }
   function subtractProduct(e) {
      if (count <= 1) {
         setCount(1);
      } else {
         setCount(count - 1);
      }
   }
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
   }, [isAdmin]);

   const { name, description, price, image, _id } = productProps;

   // for modal
   const [centredModal1, setCentredModal1] = useState(false);
   const [centredModal2, setCentredModal2] = useState(false);
   const [productDetails, setProductDetails] = useState(false);
   const toggleShow1 = () => setCentredModal1(!centredModal1);
   const toggleShow2 = () => setCentredModal2(!centredModal2);
   const toggleShow3 = () => {
      setProductDetails(!productDetails);
      setCount(1);
   };

   const [formValue, setFormValue] = useState({
      productName: name,
      price: price,
      description: description,
      image: image,
   });
   const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   };

   function navigateLogin(e) {
      navigate("/login");
   }

   function updateProduct(e) {
      e.preventDefault();

      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.isAdmin) {
               console.log(data);
               fetch(
                  `${process.env.REACT_APP_API_URL}/products/updateProduct/${_id}`,
                  {
                     method: `PUT`,
                     headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${retrieveToken}`,
                     },
                     body: JSON.stringify({
                        name: formValue.productName,
                        description: formValue.description,
                        price: formValue.price,
                        image: formValue.image,
                     }),
                  }
               )
                  .then((res) => res.json())
                  .then((data) => {
                     if (data) {
                        toggleShow1();
                        Swal.fire({
                           title: "Successfully updated",
                           icon: "success",
                           preConfirm: () => {
                              window.location.reload(false);
                           },
                        });
                     }
                  });
            }
         });
   }

   function deleteProduct(e) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.isAdmin) {
               fetch(
                  `${process.env.REACT_APP_API_URL}/products/archive/${_id}`,
                  {
                     method: "PUT",
                     headers: {
                        Authorization: `Bearer ${retrieveToken}`,
                        "Content-Type": "application/json",
                     },
                  }
               )
                  .then((res) => res.json())
                  .then((data) => {
                     if (data) {
                        toggleShow2();
                        Swal.fire({
                           title: "Successfully deleted",
                           icon: "success",
                           preConfirm: () => {
                              window.location.reload(false);
                           },
                        });
                     }
                  });
            }
         });
   }

   function checkOut(e) {
      console.log(name);
      fetch(`${process.env.REACT_APP_API_URL}/orders/placeOrder`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            products: name,
            quantity: count,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data) {
               toggleShow3();
               Swal.fire({
                  title: "Successfully Checkout",
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            } else {
               Swal.fire({
                  title: "Failed to Checkout",
                  icon: "error",
               });
            }
         });
   }

   function addToCart(e) {
      fetch(`${process.env.REACT_APP_API_URL}/orders/cart/addToCart`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            products: name,
            quantity: count,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data) {
               console.log(data);
               toggleShow3();
               Swal.fire({
                  title: "Successfully add to Cart",
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            }
         });
   }

   return (
      <>
         <MDBCol xl={3} lg={4} md={6}>
            <MDBCard className="m-2 min-width ">
               <MDBCardHeader>
                  <MDBRipple
                     rippleColor="light"
                     rippleTag="div"
                     className="bg-image hover-overlay"
                  >
                     {isAdmin ? (
                        <MDBCardImage
                           className="p-1 card-image"
                           src={`${image}`}
                           fluid
                           onClick={toggleShow1}
                        />
                     ) : (
                        <MDBCardImage
                           className="p-1 card-image"
                           src={`${image}`}
                           fluid
                           onClick={toggleShow3}
                        />
                     )}

                     <div
                        className="mask"
                        style={{
                           backgroundColor: "rgba(251, 251, 251, 0.5)",
                        }}
                     ></div>
                  </MDBRipple>
               </MDBCardHeader>
               <MDBCardBody>
                  <div className="p-3">
                     <MDBCardTitle className="medium text-dark">
                        <p>{name}</p>
                     </MDBCardTitle>
                     <MDBCardText>{description}</MDBCardText>
                     <MDBCardText>
                        <div className="d-flex flex-row justify-content-between">
                           <p>Price:</p>
                           <p>Php {price.toLocaleString()}</p>
                        </div>
                     </MDBCardText>
                  </div>
                  {isAdmin ? (
                     <MDBCardFooter className="d-flex flex-row justify-content-between">
                        <MDBBtn onClick={toggleShow1} color="info">
                           Update
                        </MDBBtn>
                        <MDBBtn onClick={toggleShow2} color="danger">
                           Delete
                        </MDBBtn>
                     </MDBCardFooter>
                  ) : (
                     <MDBCardFooter className="d-flex flex-row justify-content-center">
                        <MDBBtn onClick={toggleShow3} color="info">
                           View Details
                        </MDBBtn>
                     </MDBCardFooter>
                  )}
               </MDBCardBody>
            </MDBCard>
         </MDBCol>
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
                           onSubmit={(e) => updateProduct(e)}
                        >
                           <MDBCol md="12">
                              <MDBInput
                                 value={formValue.productName}
                                 name="productName"
                                 onChange={onChange}
                                 label="Product Name"
                                 id="productNameId"
                                 type="text"
                                 className="w-100"
                                 required
                              />
                           </MDBCol>
                           <MDBCol md="4">
                              <MDBInput
                                 value={formValue.price}
                                 name="price"
                                 onChange={onChange}
                                 label="Price"
                                 id="priceId"
                                 type="number"
                                 className="w-100"
                                 required
                              />
                           </MDBCol>
                           <MDBCol md="8">
                              <MDBInput
                                 value={formValue.image}
                                 name="image"
                                 onChange={onChange}
                                 label="Sample Image Link"
                                 id="imageId"
                                 type="text"
                                 className="w-100"
                                 required
                              />
                           </MDBCol>
                           <MDBCol md="12">
                              <MDBTextArea
                                 value={formValue.description}
                                 name="description"
                                 onChange={onChange}
                                 label="Description"
                                 id="descriptionId"
                                 type="text"
                                 rows={8}
                                 className="w-100"
                                 required
                              />
                           </MDBCol>
                           <MDBModalFooter>
                              <MDBBtn color="secondary" onClick={toggleShow1}>
                                 Cancel
                              </MDBBtn>
                              <MDBBtn type="submit">Save changes</MDBBtn>
                           </MDBModalFooter>
                        </MDBRow>
                     </MDBCardBody>
                  </MDBModalBody>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>

         {/* modal delete*/}
         <MDBModal
            tabIndex="-1"
            show={centredModal2}
            setShow={setCentredModal2}
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
                     <MDBBtn onClick={deleteProduct}>Yes</MDBBtn>
                  </MDBModalFooter>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>

         {/* modal view product details*/}
         <MDBModal
            tabIndex="-1"
            show={productDetails}
            setShow={setProductDetails}
         >
            <MDBModalDialog centered>
               <MDBModalContent>
                  <MDBModalHeader>
                     <MDBModalTitle>Product Details</MDBModalTitle>
                     <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow3}
                     ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                     <MDBCol>
                        <MDBCard className="m-2 ">
                           <MDBCardHeader>
                              <MDBRipple
                                 rippleColor="light"
                                 rippleTag="div"
                                 className="bg-image hover-overlay"
                              >
                                 <MDBCardImage
                                    className="p-1"
                                    src={`${image}`}
                                    fluid
                                 />
                                 <div
                                    className="mask"
                                    style={{
                                       backgroundColor: "rgba(0, 0, 0, 0.55)",
                                    }}
                                 ></div>
                              </MDBRipple>
                           </MDBCardHeader>
                           <MDBCardBody>
                              <div className="p-3">
                                 <MDBCardTitle className="medium text-dark">
                                    <p>{name}</p>
                                 </MDBCardTitle>
                                 <MDBCardText>{description}</MDBCardText>
                                 <MDBCardText>
                                    <div className="d-flex flex-row justify-content-between">
                                       <p>Price:</p>
                                       <p>Php {price.toLocaleString()}</p>
                                    </div>
                                 </MDBCardText>
                              </div>
                              {!isAdmin && retrieveToken !== null ? (
                                 <>
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
                                    <MDBCardText className="mt-5">
                                       <div className="d-flex flex-row justify-content-between">
                                          <p>Total:</p>
                                          <p>
                                             Php {""}
                                             {(count * price).toLocaleString()}
                                          </p>
                                       </div>
                                    </MDBCardText>
                                    <MDBCardFooter className="d-flex flex-row justify-content-between">
                                       <MDBBtn onClick={addToCart} color="info">
                                          Add to Cart
                                       </MDBBtn>
                                       <MDBBtn
                                          onClick={checkOut}
                                          id="subtractButton"
                                          color="danger"
                                       >
                                          Check out Order
                                       </MDBBtn>
                                    </MDBCardFooter>
                                 </>
                              ) : (
                                 <>
                                    <MDBCardFooter className="d-flex flex-row justify-content-center">
                                       <MDBBtn
                                          onClick={navigateLogin}
                                          id="logIn"
                                          color="success"
                                       >
                                          Log In
                                       </MDBBtn>
                                    </MDBCardFooter>
                                 </>
                              )}
                           </MDBCardBody>
                        </MDBCard>
                     </MDBCol>
                  </MDBModalBody>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>
      </>
   );
}
