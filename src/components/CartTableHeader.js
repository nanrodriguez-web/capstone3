import React, { useState, useEffect } from "react";
import { MDBTableHead, MDBInput, MDBBtn, MDBTable } from "mdb-react-ui-kit";

const TableHeader = () => {
   const retrieveToken = localStorage.getItem("token");

   return (
      <MDBTable hover align="middle" responsive>
         <MDBTableHead>
            <tr>
               <th scope="col" style={{ width: `40%` }}>
                  Product Name
               </th>
               <th scope="col" style={{ width: `10%` }}>
                  Quantity
               </th>
               <th scope="col" style={{ width: `20%` }}>
                  Sub-Total
               </th>
               <th scope="col" style={{ width: `auto` }}></th>
            </tr>
         </MDBTableHead>
      </MDBTable>
   );
};

export default TableHeader;
