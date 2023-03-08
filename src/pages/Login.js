import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2/dist/sweetalert2.js";

////////////////////////////
export default function Login() {
   const { user, setUser } = useContext(UserContext);
   const userIsAdmin = user.isAdmin;

   const navigate = useNavigate();

   const [formValue, setFormValue] = useState({
      username: "",
      password1: "",
   });

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

   const [isActive, setIsActive] = useState(false);

   const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      if (formValue.username !== "" && formValue.password1 !== "") {
         setIsActive(true);
      } else {
         setIsActive(false);
      }
   }, [formValue.username, formValue.password1]);

   const retrieveUserDetails = (token) => {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);

            setUser({
               id: data._id,
               isAdmin: data.isAdmin,
            });
         });
   };

   function loginUser(e) {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            username: formValue.username,
            password: formValue.password1,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (typeof data.access !== "undefined") {
               localStorage.setItem("token", data.access);
               retrieveUserDetails(data.access);
            } else {
               Swal.fire({
                  title: "Failed to Login",
                  text: "Check your username/password and try again",
                  icon: "error",
               });
            }
         });
      // setFormValue({
      //    username: "",
      //    password1: "",
      // });
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
                     Login
                  </h1>

                  <MDBValidation
                     className="order-2 order-lg-1 d-flex flex-column align-items-center"
                     onSubmit={(e) => loginUser(e)}
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

                     <div className="mb-4 text-center">
                        <p>
                           Not yet registered? <br />{" "}
                           <a href="./register">Register here</a>
                        </p>
                     </div>

                     {isActive ? (
                        <MDBBtn
                           variant="primary"
                           type="submit"
                           controlId="submitBtn"
                        >
                           Login
                        </MDBBtn>
                     ) : (
                        <MDBBtn type="submit" controlId="submitBtn" disabled>
                           Login
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
                     src="https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png"
                     className=""
                     fluid
                  />
               </MDBCol>
            </MDBRow>
            <MDBCardLink href="/">
               <MDBIcon className="mx-2  mt-3" fas icon="long-arrow-alt-left" />
               Back to our site
            </MDBCardLink>
         </MDBCardBody>
      </MDBCard>
   );
}
