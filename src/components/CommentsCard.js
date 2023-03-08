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

export default function UserCard({ commentsProps }) {
   const { username, email, comment, rating, _id } = commentsProps;

   return (
      <MDBCol xl={3} lg={4} md={6}>
         <MDBCard className="m-1">
            <MDBCardHeader>{email}</MDBCardHeader>
            <MDBCardBody>
               <MDBCardTitle>{username}</MDBCardTitle>

               <MDBCardText>
                  Rating: <strong>{rating}</strong>
               </MDBCardText>
               <MDBCardText>
                  Comment: <br />
                  {comment}
               </MDBCardText>
            </MDBCardBody>
         </MDBCard>
      </MDBCol>
   );
}
