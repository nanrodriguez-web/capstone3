import {
   MDBCard,
   MDBCardText,
   MDBRipple,
   MDBBtn,
   MDBCol,
   MDBRow,
   MDBIcon,
   MDBCardBody,
   MDBCardLink,
   MDBModal,
   MDBModalDialog,
   MDBModalContent,
   MDBModalHeader,
   MDBModalTitle,
   MDBModalBody,
   MDBInput,
   MDBTextArea,
   MDBCardHeader,
   MDBCardFooter,
} from "mdb-react-ui-kit";
import { useState, useContext, useEffect } from "react";
import RatingStars from "./RatingStars";
import RatingContext from "../RatingContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useNavigate } from "react-router-dom";

export default function About() {
   const navigate = useNavigate();
   const { rating, setRating } = useContext(RatingContext);
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

   const [comment, setComment] = useState(false);

   const toggleShow3 = () => {
      if (isAdmin) {
         navigate("/commentSection");
      } else {
         setComment(!comment);
      }
   };
   const [formValue, setFormValue] = useState({
      username: "",
      email: "",
      comments: "",
   });
   const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
   };

   function comments(e) {
      e.preventDefault(0);

      if (rating === undefined) {
         Swal.fire({
            title: "Please give a rating",
            icon: "info",
         });
      } else {
         fetch(`${process.env.REACT_APP_API_URL}/comments/addComment`, {
            method: "POSt",
            headers: {
               Authorization: `Bearer ${retrieveToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: formValue.username,
               email: formValue.email,
               comment: formValue.comments,
               rating: rating,
            }),
         })
            .then((res) => res.json())
            .then((data) => {
               if (data) {
                  Swal.fire({
                     title: "Thanks for your feedback!",
                     preConfirm: () => {
                        window.location.reload(false);
                     },
                  });
                  toggleShow3();
               }
            });
      }
      console.log(rating);
   }

   return (
      <>
         <MDBCard className="mt-5 d-flex justify-content-center align-items-center">
            <MDBRow className="p-3">
               <MDBCol
                  md={7}
                  className="vh-45 d-flex justify-content-center align-items-center flex-column"
               >
                  <h3 className="text-center mt-5">About</h3>
                  <p className="justifyText mt-3 fontsize3 text-muted">
                     This e-commerce website was built with{" "}
                     <a target={"_blank"} href="https://reactjs.org/">
                        React.js
                     </a>{" "}
                     and styled using Material Design UI React for a responsive
                     design. An API using{" "}
                     <a target={"_blank"} href="https://nodejs.org/en/">
                        Node.js
                     </a>{" "}
                     and{" "}
                     <a target={"_blank"} href="https://expressjs.com/">
                        Express.js
                     </a>{" "}
                     manages product information and transactions, connecting to
                     a{" "}
                     <a
                        target={"_blank"}
                        href="https://www.mongodb.com/atlas/database"
                     >
                        MongoDB
                     </a>{" "}
                     NoSQL database for data storage. The website demonstrate a
                     simple and user-friendly shopping experience with the
                     ability to handle of data through the scalable NoSQL
                     database. The result is a high-performing and aesthetically
                     pleasing e-commerce platform.
                  </p>
               </MDBCol>
               <MDBCol
                  md={5}
                  className="d-flex justify-content-center align-items-center p-3"
               >
                  <div className="d-flex flex-column align-items-center justify-content-center ">
                     <MDBCol md={6} className="d-flex justify-content-center">
                        <MDBIcon className="icons" fab icon="react" size="4x" />
                        <MDBIcon
                           className="icons"
                           fab
                           icon="node-js"
                           size="4x"
                        />
                        <MDBIcon
                           className="icons"
                           fas
                           icon="database"
                           size="4x"
                        />
                     </MDBCol>
                     <MDBCol md={6} className="d-flex justify-content-center">
                        <MDBIcon className="icons" fab icon="html5" size="4x" />
                        <MDBIcon className="icons" fab icon="css3" size="4x" />
                     </MDBCol>
                  </div>
               </MDBCol>
            </MDBRow>
            <MDBBtn color="info" className="mb-3" onClick={toggleShow3}>
               Comments
            </MDBBtn>
         </MDBCard>
         {/* Modal comment */}
         <MDBModal tabIndex="-1" show={comment} setShow={setComment}>
            <MDBModalDialog centered>
               <MDBModalContent>
                  <MDBModalHeader>
                     <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow3}
                     ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                     <MDBModalTitle className="text-center mb-3">
                        How's my work?
                     </MDBModalTitle>
                     <MDBCardText className="text-center">
                        Please let me know
                     </MDBCardText>

                     <MDBRow
                        tag="form"
                        className="g-3 justify-content-center align-items-center"
                        onSubmit={(e) => comments(e)}
                     >
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
                        <MDBInput
                           value={formValue.email}
                           name="email"
                           onChange={onChange}
                           label="Email"
                           id="emailId"
                           type="email"
                           className="w-100"
                           required
                        />
                        <MDBTextArea
                           value={formValue.comments}
                           name="comments"
                           onChange={onChange}
                           label="Comments"
                           id="commentsId"
                           type="text"
                           className="w-100"
                           required
                           rows={8}
                        />
                        <MDBBtn type="submit">Submit</MDBBtn>
                        <RatingStars />
                     </MDBRow>
                  </MDBModalBody>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>
      </>
   );
}
