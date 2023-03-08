import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
   MDBBtn,
   MDBContainer,
   MDBRow,
   MDBCol,
   MDBCard,
   MDBCardBody,
   MDBCardImage,
   MDBInput,
   MDBIcon,
   MDBCheckbox,
   MDBValidationItem,
   MDBValidation,
   MDBCardLink,
} from "mdb-react-ui-kit";

import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function Register() {
   const { user, setUser } = useContext(UserContext);
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

   const navigate = useNavigate();
   const [formValue, setFormValue] = useState({
      username: "",
      email: "",
      password1: "",
      password2: "",
   });

   const [isActive, setIsActive] = useState(false);

   const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      if (
         formValue.username !== "" &&
         formValue.email !== "" &&
         formValue.password1 !== "" &&
         formValue.password2 !== "" &&
         formValue.password1 === formValue.password2
      ) {
         setIsActive(true);
      } else {
         setIsActive(false);
      }
   }, [
      formValue.username,
      formValue.email,
      formValue.password1,
      formValue.password2,
   ]);

   function validateEmail(email) {
      const re =
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
   }

   function registerUser(e) {
      const isEmail = e.target.email.value;
      if (!validateEmail(isEmail)) {
         Swal.fire({
            title: "Email is not valid!",
            icon: "error",
         });
      } else {
         fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: formValue.username,
               email: formValue.email,
               password: formValue.password1,
            }),
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               if (data) {
                  Swal.fire({
                     title: "Successfully registered",
                     icon: "success",
                  });
                  setFormValue({
                     username: "",
                     email: "",
                     password1: "",
                     password2: "",
                  });
                  navigate("/login");
               } else {
                  Swal.fire({
                     title: "Failed to registered",
                     text: "username already registered",
                     icon: "error",
                  });
               }
            });
      }
   }

   return retrieveToken !== null ? (
      <Navigate to="/" />
   ) : (
      <MDBCard
         className="text-black m-5 needs-validation"
         style={{ borderRadius: "25px" }}
      >
         <MDBCardBody>
            <MDBRow className="justify-content-center align-items-center">
               <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center"
               >
                  <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 ">
                     Register
                  </h1>
                  <MDBValidation
                     className="order-2 order-lg-1 d-flex flex-column align-items-center"
                     onSubmit={(e) => registerUser(e)}
                  >
                     <div className="d-flex flex-row align-items-center mb-4 ">
                        <MDBIcon fas icon="user me-3" size="lg" />
                        <MDBValidationItem>
                           <MDBInput
                              value={formValue.username}
                              name="username"
                              onChange={onChange}
                              label="Username"
                              id="usernameId"
                              type="text"
                              className="w-100"
                              required
                           />
                        </MDBValidationItem>
                     </div>
                     <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="envelope me-3" size="lg" />
                        <MDBValidationItem>
                           <MDBInput
                              className="form-control"
                              value={formValue.email}
                              name="email"
                              onChange={onChange}
                              label="Your Email"
                              id="emailId"
                              type="email"
                              invalid={MDBInput.invalid}
                              validation="Please provide your email"
                              required
                           />
                        </MDBValidationItem>
                     </div>
                     <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="lock me-3" size="lg" />
                        <MDBValidationItem>
                           <MDBInput
                              value={formValue.password1}
                              name="password1"
                              onChange={onChange}
                              label="Password"
                              id="form3"
                              type="password"
                              required
                           />
                        </MDBValidationItem>
                     </div>
                     <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="key me-3" size="lg" />
                        <MDBValidationItem>
                           <MDBInput
                              value={formValue.password2}
                              name="password2"
                              onChange={onChange}
                              label="Repeat your password"
                              id="form4"
                              type="password"
                              required
                           />
                        </MDBValidationItem>
                     </div>
                     <div className="mb-4 text-center">
                        <p>
                           Already registered? <br />{" "}
                           <a href="./login">Login</a>
                        </p>
                     </div>

                     {isActive ? (
                        <MDBBtn
                           variant="primary"
                           type="submit"
                           controlId="submitBtn"
                        >
                           Register
                        </MDBBtn>
                     ) : (
                        <MDBBtn type="submit" controlId="submitBtn" disabled>
                           Register
                        </MDBBtn>
                     )}
                  </MDBValidation>
               </MDBCol>

               <MDBCol
                  md="10"
                  lg="6"
                  className="order-1 order-lg-2 d-flex align-items-center"
               >
                  <MDBCardImage
                     src="https://cdn.pixabay.com/photo/2020/05/21/11/13/shopping-5200288_960_720.jpg"
                     className=""
                     fluid
                  />
               </MDBCol>
            </MDBRow>
            <MDBCardLink href="/">
               <MDBIcon className="mx-2 mt-3" fas icon="long-arrow-alt-left" />
               Back to our site
            </MDBCardLink>
         </MDBCardBody>
      </MDBCard>
   );
}
