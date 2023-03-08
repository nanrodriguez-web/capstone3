import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
   MDBBtn,
   MDBRow,
   MDBCol,
   MDBCard,
   MDBCardBody,
   MDBInput,
   MDBTextArea,
   MDBInputGroup,
} from "mdb-react-ui-kit";

import NavBar from "./NavBar";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default function Register() {
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
   const navigate = useNavigate();
   const [formValue, setFormValue] = useState({
      productName: "",
      price: "",
      description: "",
      image: "",
   });

   const [isActive, setIsActive] = useState(false);

   const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   };

   function addProduct(e) {
      e.preventDefault();
      if (
         formValue.productName === "" ||
         formValue.price === "" ||
         formValue.description === "" ||
         formValue.image === ""
      ) {
         Swal.fire({
            title: "Please complete input fields!",
            icon: "warning",
         });
      } else {
         const retrieveToken = localStorage.getItem("token");

         fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
               Authorization: `Bearer ${retrieveToken}`,
            },
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);

               if (data.isAdmin) {
                  fetch(
                     `${process.env.REACT_APP_API_URL}/products/addProduct`,
                     {
                        method: "POST",
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
                        console.log(data);
                        if (data) {
                           Swal.fire({
                              title: "Successfully added product!",
                              icon: "success",
                           });
                           setFormValue({
                              productName: "",
                              price: "",
                              description: "",
                              image: "",
                           });
                        } else {
                           Swal.fire({
                              title: "Failed to add product!",
                              text: "Product already exists",
                              icon: "error",
                           });
                        }
                     });
               } else {
                  Swal.fire({
                     title: "You are not allowed to access this!",
                     icon: "error",
                  });
               }
            });
      }
   }

   return (
      <>
         <NavBar />
         <MDBCard
            className="text-black m-5 pt-5 needs-validation"
            style={{ borderRadius: "25px" }}
         >
            <MDBCardBody>
               <MDBRow
                  tag="form"
                  className="g-3 justify-content-center align-items-center"
                  onSubmit={(e) => addProduct(e)}
               >
                  <h3 className="fw-bold mb-3 mx-1 mx-md-4 ">
                     Add new product
                  </h3>
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
                        textBefore="Php"
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
                        textBefore="Php"
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
                  <MDBCol size="12" className="text-center">
                     <MDBBtn type="submit" color="success">
                        Save
                     </MDBBtn>
                  </MDBCol>
               </MDBRow>
            </MDBCardBody>
         </MDBCard>
      </>
   );
}
