import "./Card.css"; 

import { useState } from "react";                                                                                                                // remember whether to show or not more


export const Card=(props)=>{
    const [showDetails, setShowDetails] = useState(false);                                         //Creates a piece of memory (state) and sets its first value to false showDetails=false
    const handleCardClick = () => {
    setShowDetails((prev) => !prev);                                                              // toggle true/false
  };
    return( 
    <div className="card-container" onClick={handleCardClick}> 
        <img src={props.image} alt="Placeholder" className="card-image"/>
        <h1 className="card-title">{props.title}</h1>
        <p className="card-text">{props.text}</p>

        {showDetails && (                                                                        // if showDetails is true, srun below code
        <div className="card-details">
          <p>{props.date}</p>
          <p>{props.time}</p>
          <p>{props.teacher}</p>
        </div>
      )}

        <a href={props.link} className="card-link" onClick={(e) => e.stopPropagation()}>View Class</a> 
    </div>
    );

};

//onClick={(e) => e.stopPropagation() means When  button clicked, stop this click from affecting any parent elements