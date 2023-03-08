import React, { useState, useContext } from "react";
import Star from "./Star";

import RatingContext from "../RatingContext";

const RatingStars = () => {
   const { rating, setRating } = useContext(RatingContext);
   const [gradeIndex, setGradeIndex] = useState();
   const GRADES = ["Poor", "Fair", "Good", "Very good", "Excellent"];
   const activeStar = {
      fill: "yellow",
   };

   const changeGradeIndex = (index) => {
      setGradeIndex(index);
      console.log(parseInt(index) + 1);
      setRating(parseInt(index) + 1);
   };

   return (
      <div className="container">
         <h2 className="result">
            {GRADES[gradeIndex] ? GRADES[gradeIndex] : "You didn't review yet"}
         </h2>
         <div className="stars">
            {GRADES.map((grade, index) => (
               <Star
                  index={index}
                  key={grade}
                  changeGradeIndex={changeGradeIndex}
                  style={gradeIndex >= index ? activeStar : {}}
               />
            ))}
         </div>
      </div>
   );
};

export default RatingStars;
