import About from "../components/About.js";
import Footer from "../components/Footer.js";
import NavBar from "../components/NavBar.js";
import { useState } from "react";

import { RatingProvider } from "../RatingContext";

export default function AboutPage() {
   const [rating, setRating] = useState();
   const [gradeIndex, setGradeIndex] = useState();

   return (
      <RatingProvider value={{ rating, setRating }}>
         <>
            <NavBar />
            <About />
            <Footer />
         </>
      </RatingProvider>
   );
}
