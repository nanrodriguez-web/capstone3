import React from "react";

// Creates a context object
const RatingContext = React.createContext();

// The "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object
export const RatingProvider = RatingContext.Provider;

export default RatingContext;
