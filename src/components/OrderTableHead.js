import React from "react";
import { MDBTableHead, MDBInput, MDBTable } from "mdb-react-ui-kit";

const OrderTableHeader = () => {
   return (
      <MDBTable hover align="middle" responsive className="mt-3">
         <MDBTableHead>
            <tr>
               <th scope="col" style={{ width: `15%` }}>
                  Username
               </th>
               <th scope="col" style={{ width: `15%` }}>
                  Order Date
               </th>
               <th scope="col" style={{ width: `20%` }}>
                  Products
               </th>
               <th scope="col" style={{ width: `10%` }}>
                  Quantity
               </th>
               <th scope="col" style={{ width: `10%` }}>
                  Total Amount
               </th>
            </tr>
         </MDBTableHead>
      </MDBTable>
   );
};

export default OrderTableHeader;
