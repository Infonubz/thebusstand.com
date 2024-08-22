// MovingSentence.js
import React from "react";
import "./TextMoving.css"; // Import the stylesheet
import { MdStarRate } from "react-icons/md";

const MovingSentence = ({ text }) => {
  return (
    <div className="moving-sentence-container">
      <div className="moving-sentence">
        <div className="flex w-full justify-center items-center">
          <MdStarRate size={40} />
          <span className="flex text-xl mx-2">
            We show the best travel rates for the same bus buy comparing market
            apps
          </span>
          <MdStarRate size={40} />
        <span className="text-xl">
          We do not impose any commission on either operators or passengers
        </span>
        </div>
      </div>
    </div>
  );
};

export default MovingSentence;
