import {
   MDBBtn,
   MDBCard,
   MDBCardBody,
   MDBCardFooter,
   MDBCardHeader,
   MDBCardText,
   MDBCardTitle,
   MDBCol,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

export default function UserCard({ usersProps }) {
   const { username, email, isAdmin, createdOn, _id } = usersProps;

   const retrieveToken = localStorage.getItem("token");
   function setAdmin(e) {
      fetch(`${process.env.REACT_APP_API_URL}/users/setAdmin`, {
         method: "PUT",
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userId: _id,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data) {
               Swal.fire({
                  title: `${username} is now an Admin`,
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            } else {
               Swal.fire({
                  title: "Failed to set as an Admin",
                  icon: "info",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            }
         });
   }
   function setUser(e) {
      fetch(`${process.env.REACT_APP_API_URL}/users/setUser`, {
         method: "PUT",
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            userId: _id,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data) {
               Swal.fire({
                  title: `${username} is now a User`,
                  icon: "success",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            } else {
               Swal.fire({
                  title: "Failed to set as an Admin",
                  icon: "info",
                  preConfirm: () => {
                     window.location.reload(false);
                  },
               });
            }
         });
   }

   return (
      <MDBCol xl={3} lg={4} md={6}>
         <MDBCard className="m-1">
            <MDBCardHeader>{email}</MDBCardHeader>
            <MDBCardBody>
               <MDBCardTitle>{username}</MDBCardTitle>
               {isAdmin ? (
                  <MDBCardText>
                     Account Status: <strong>Admin</strong>
                  </MDBCardText>
               ) : (
                  <MDBCardText>
                     Account Status: <strong>User</strong>
                  </MDBCardText>
               )}
               <MDBCardText>
                  User since: <strong>{createdOn}</strong>
               </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
               {isAdmin ? (
                  <>
                     {" "}
                     {username === "nanrodriguez" ? (
                        <MDBBtn disabled color="danger">
                           Main Admin
                        </MDBBtn>
                     ) : (
                        <MDBBtn color="info" onClick={setUser}>
                           Set as User
                        </MDBBtn>
                     )}
                  </>
               ) : (
                  <MDBBtn color="success" onClick={setAdmin}>
                     Set as Admin
                  </MDBBtn>
               )}
            </MDBCardFooter>
         </MDBCard>
      </MDBCol>
   );
}
