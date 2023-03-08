import {
   MDBCard,
   MDBCardBody,
   MDBCardTitle,
   MDBCol,
   MDBRow,
   MDBCarousel,
   MDBCarouselItem,
   MDBBtn,
} from "mdb-react-ui-kit";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import Products from "./Orders";
import CarouselItem from "react-bootstrap/esm/CarouselItem";
import { useNavigate } from "react-router-dom";

export default function Banner() {
   const [productImage, setProductImages] = useState([]);

   useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/products/`)
         .then((res) => res.json())
         .then((data) => {
            setProductImages(
               data.map((product, index) => {
                  return product.image;
               })
            );
         });
   }, []);

   const imageMap = productImage.map((image, index) => {
      return {
         id: `${index + 1}`,
         image: `${image}`,
      };
   });
   const navigate = useNavigate();
   function navigateAbout(e) {
      navigate("/about");
   }

   return (
      <MDBCard className="mt-3 banner">
         <MDBCardBody className="p-2">
            <MDBRow>
               <MDBCol md={6}>
                  <Carousel
                     className="carousel"
                     controls={false}
                     indicators={false}
                  >
                     {imageMap.map((images) => (
                        <Carousel.Item>
                           <img
                              className="w-100 carouselItem d-block"
                              src={`${images.image}`}
                              alt=".."
                           />
                        </Carousel.Item>
                     ))}
                  </Carousel>
               </MDBCol>
               <MDBCol
                  md={6}
                  className="d-flex flex-column justify-content-center align-items-center p-5"
               >
                  <h1 className="banner-headline text-center">
                     Digital Products
                  </h1>
                  <h5 className="text-center mt-4 banner-subhealine">
                     Upgrade Your Technology Game with Our Digital Collection
                  </h5>
                  <p className="text-center mt-4">
                     Discover a world of digital possibilities with our
                     carefully curated collection of the latest and greatest
                     technology products.
                  </p>
                  <MDBBtn color="info" onClick={navigateAbout} className="mt-2">
                     About this Website
                  </MDBBtn>
               </MDBCol>
            </MDBRow>
         </MDBCardBody>
      </MDBCard>
   );
}
