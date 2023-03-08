import {
   MDBBtn,
   MDBCard,
   MDBCardBody,
   MDBCardLink,
   MDBCardTitle,
   MDBIcon,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";

export default function NotFound() {
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

   return (
      <MDBCard className="p-3 vh-30 d-flex flex-column align-items-center">
         <MDBCardTitle className="text-center mt-5">
            <h1 className="text-muted">Page not found</h1>
         </MDBCardTitle>
         <MDBCardBody>
            <p className="text-muted">
               Looks like you've followed a broken link or entered a URL that
               doesn't exist in this site
            </p>
         </MDBCardBody>
         <MDBCardLink href="/">
            <MDBIcon className="mx-2" fas icon="long-arrow-alt-left" />
            Back to our site
         </MDBCardLink>
      </MDBCard>
   );
}
