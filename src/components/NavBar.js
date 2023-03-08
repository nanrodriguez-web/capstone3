import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
   MDBNavbar,
   MDBContainer,
   MDBNavbarBrand,
   MDBNavbarToggler,
   MDBNavbarItem,
   MDBNavbarLink,
   MDBCollapse,
   MDBBtn,
   MDBIcon,
   MDBNavbarNav,
   MDBInputGroup,
   MDBModal,
   MDBModalDialog,
   MDBModalContent,
   MDBModalHeader,
   MDBModalTitle,
   MDBModalBody,
   MDBModalFooter,
} from "mdb-react-ui-kit";
import UserContext from "../UserContext";

export default function NavBar() {
   const { user, unsetUser, setUser } = useContext(UserContext);

   const retrieveToken = localStorage.getItem("token");

   const [client, setClient] = useState("");
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
               setClient(data.username);
            }
         });
   }, []);

   const navigate = useNavigate();

   const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

   function navigateRegister(e) {
      navigate("/register");
   }
   function navigateLogin(e) {
      navigate("/login");
   }
   // Modal
   const [centredModal1, setCentredModal1] = useState(false);
   const toggleShow1 = () => setCentredModal1(!centredModal1);

   function logout(e) {
      e.preventDefault();
      unsetUser();
      setUser({ id: null });
      navigate("/");
      toggleShow1();
      window.location.reload(false);
   }

   return (
      <>
         <MDBNavbar fixed="top" className="" expand="lg" light bgColor="light">
            <MDBContainer>
               <MDBNavbarBrand href="/">
                  <MDBIcon icon="shopping-bag" size="2x" />
               </MDBNavbarBrand>
               <MDBNavbarToggler
                  type="button"
                  data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() =>
                     setShowNavNoTogglerSecond(!showNavNoTogglerSecond)
                  }
               >
                  <MDBIcon icon="bars" fas />
               </MDBNavbarToggler>
               <MDBCollapse navbar show={showNavNoTogglerSecond}>
                  <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 d-block d-md-flex justify-content-between">
                     <div className="d-md-flex ">
                        {!isAdmin ? (
                           <>
                              <MDBNavbarItem className="mx-1">
                                 <MDBNavbarLink aria-current="page" href="/">
                                    Home
                                 </MDBNavbarLink>
                              </MDBNavbarItem>
                              <MDBNavbarItem className="mx-1">
                                 {retrieveToken !== null ? (
                                    <MDBNavbarLink
                                       aria-current="page"
                                       href="/userOrder"
                                    >
                                       Your Orders
                                    </MDBNavbarLink>
                                 ) : (
                                    <MDBNavbarLink
                                       aria-current="page"
                                       href="/userOrders"
                                    ></MDBNavbarLink>
                                 )}
                              </MDBNavbarItem>
                           </>
                        ) : (
                           <>
                              <MDBNavbarItem className="mx-1">
                                 <MDBNavbarLink aria-current="page" href="/">
                                    Dashboard
                                 </MDBNavbarLink>
                              </MDBNavbarItem>
                              <MDBNavbarItem>
                                 <MDBNavbarLink
                                    aria-current="page"
                                    href="/orderLists"
                                 >
                                    View orders
                                 </MDBNavbarLink>
                              </MDBNavbarItem>
                              <MDBNavbarItem className="mx-1">
                                 <MDBNavbarLink
                                    aria-current="page"
                                    href="/users"
                                 >
                                    Active Users
                                 </MDBNavbarLink>
                              </MDBNavbarItem>
                              <MDBNavbarItem className="mx-1">
                                 <MDBNavbarLink
                                    aria-current="page"
                                    href="/commentSection"
                                 >
                                    View Comments
                                 </MDBNavbarLink>
                              </MDBNavbarItem>
                           </>
                        )}
                     </div>

                     <div className="d-flex justify-content-end">
                        {retrieveToken !== null ? (
                           <MDBNavbarItem
                              onClick={toggleShow1}
                              className="mx-1 d-flex align-items-center"
                           >
                              {isAdmin ? (
                                 <p className="m-0 mx-2">Admin: {client}</p>
                              ) : (
                                 <p className="m-0 mx-2">{client}</p>
                              )}
                              <MDBBtn color="danger">Logout</MDBBtn>
                           </MDBNavbarItem>
                        ) : (
                           <>
                              <MDBNavbarItem className="mx-1">
                                 <MDBBtn
                                    onClick={navigateRegister}
                                    color="info"
                                 >
                                    Register
                                 </MDBBtn>
                              </MDBNavbarItem>
                              <MDBNavbarItem className="mx-1">
                                 <MDBBtn
                                    onClick={navigateLogin}
                                    color="success"
                                 >
                                    Login
                                 </MDBBtn>
                              </MDBNavbarItem>
                           </>
                        )}
                     </div>
                  </MDBNavbarNav>
               </MDBCollapse>
            </MDBContainer>
         </MDBNavbar>

         <MDBModal
            tabIndex="-1"
            show={centredModal1}
            setShow={setCentredModal1}
         >
            <MDBModalDialog centered>
               <MDBModalContent>
                  <MDBModalHeader>
                     <MDBModalTitle>Are you Sure?</MDBModalTitle>
                     <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow1}
                     ></MDBBtn>
                  </MDBModalHeader>

                  <MDBModalFooter>
                     <MDBBtn color="secondary" onClick={toggleShow1}>
                        Cancel
                     </MDBBtn>
                     <MDBBtn onClick={logout}>Yes</MDBBtn>
                  </MDBModalFooter>
               </MDBModalContent>
            </MDBModalDialog>
         </MDBModal>
      </>
   );
}
