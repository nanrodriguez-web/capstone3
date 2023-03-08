import Products from "./Products";
import Orders from "../components/Orders.js";

import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";

import NavBar from "../components/NavBar";

import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import Banner from "../components/Banner.js";
import Footer from "../components/Footer.js";

export default function Home() {
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
   }, []);

   return (
      <div className="position-relative">
         <MDBContainer>
            <NavBar />
            <Banner />
            {isAdmin ? (
               <>
                  <Products />
                  <Orders />
               </>
            ) : (
               <>
                  <Products />
               </>
            )}
         </MDBContainer>
         <Footer />
      </div>
   );
}
