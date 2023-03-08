import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.js";
import CommentsCard from "../components/CommentsCard.js";

export default function Users() {
   const [userComment, setUserComment] = useState([]);

   const retrieveToken = localStorage.getItem("token");

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/comments`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            setUserComment(
               data.map((comments) => {
                  return (
                     <CommentsCard
                        key={comments._id}
                        commentsProps={comments}
                     />
                  );
               })
            );
         });
   }, []);

   return userComment.length === 0 ? (
      <>
         <NavBar />
         <h2 className="text-center mt-4">No Comments Available</h2>
      </>
   ) : (
      <>
         <NavBar />
         <h2 className="text-center mt-4">User's Feedback</h2>

         <div className="d-block d-md-flex flex-wrap">{userComment}</div>
      </>
   );
}
