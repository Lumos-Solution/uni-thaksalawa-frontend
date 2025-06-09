import "../stylesheet/Card.css";
import { useState } from "react";                                                                   // remember whether to show or not more

export const Card=(props)=>{
    const [showDetails, setShowDetails] = useState(false);                                         //Creates a piece of memory (state) and sets its first value to false showDetails=false
    const handleCardClick = () => {
    setShowDetails((prev) => !prev);                                                              // toggle true/false ans set showDetails               prev=previous alue of showDetails
    };

      return (
    <div
      className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[300px] cursor-pointer hover:shadow-lg transition duration-300"
      onClick={handleCardClick}
    >
      <img
        src={props.image}
        alt="Class"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <p className="text-xs font-semibold text-purple-600 uppercase mb-1">
        {props.classType} Class
      </p>
      <h1 className="text-xl font-bold text-gray-800 mb-2">{props.title}</h1>
      <p className="text-gray-600 mb-2">{props.subject}</p>

      {showDetails && (
        <div className="text-sm text-gray-700 space-y-1 mb-3">
          <p>
            <span className="font-semibold">Location:</span> {props.location}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {props.date}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {props.time}
          </p>
          <p>
            <span className="font-semibold">Fee:</span> Rs. {props.fee}
          </p>
        </div>
      )}

      <a
        href={props.link}
        onClick={(e) => e.stopPropagation()}
        className="inline-block bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        View Class
      </a>
    </div>
    );

};
