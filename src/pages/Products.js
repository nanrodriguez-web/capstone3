import ProductCard from "../components/ProductCard.js";
import { useEffect, useState } from "react";
import FloatingButton from "../components/FloatingButton.js";
import {
   MDBContainer,
   MDBBtn,
   MDBIcon,
   MDBRow,
   MDBCol,
   MDBTooltip,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function Products() {
   const [product, setProduct] = useState([]);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/products/`)
         .then((res) => res.json())
         .then((data) => {
            setProduct(
               data.map((product) => {
                  return (
                     <ProductCard key={product._id} productProps={product} />
                  );
               })
            );
         });
   }, []);

   if (product.length === 0) {
      return (
         <>
            <h2 className="text-center  mt-5 pt-3">Product Lists</h2>
            <h4 className="text-center">No product available</h4>
         </>
      );
   } else {
   }
   return (
      <>
         <h2 className="text-center mt-5 pt-3">Product Lists</h2>
         <div className="d-block d-md-flex flex-wrap ">{product}</div>
         <FloatingButton />
      </>
   );
}
