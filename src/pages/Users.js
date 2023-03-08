import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar.js";
import UserCard from "../components/UserCard.js";

export default function Users() {
   const [usersLists, setUsersLists] = useState([]);

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

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/users`, {
         headers: {
            Authorization: `Bearer ${retrieveToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setUsersLists(
               data.map((users) => {
                  return <UserCard key={users._id} usersProps={users} />;
               })
            );
         });
   }, []);

   return usersLists.length === 0 ? (
      <>
         <h2 className="text-center">No other users</h2>
      </>
   ) : (
      <>
         {isAdmin ? (
            <>
               <NavBar />
               <h2 className="text-center mt-4">List of Active Users</h2>
               <span className="mb-1">
                  Active Users: <strong>{usersLists.length}</strong>
               </span>
               <div className="d-block d-md-flex flex-wrap">{usersLists}</div>
            </>
         ) : (
            <Navigate to="/" />
         )}
      </>
   );
}
