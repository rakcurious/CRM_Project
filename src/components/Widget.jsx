import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Widget = ({
  colortop,
  colorbottom,
  svg,
  text,
  percentage,
  barcolor,
  value,
}) => {
  return (
    <div
      className={`h-40 w-68 shadow-lg ${colorbottom} rounded m-4 outline outline-1   outline-zinc-400  `}
    >
      <div
        className={`h-2/5 shadow-lg ${colortop} flex justify-center items-center rounded-t rounded-b-xl `}
      >
        <p className="text-2xl font-semibold mx-2">{text}</p>
      </div>
      <div className="static h-3/5 rounded flex justify-evenly items-center">
        <img src={svg} className="h-16 w-16"/>
        <div className="flex justify-center items-center h-18 w-18">
          <CircularProgressbar
            value={percentage}
            strokeWidth="12"
            text={value === "undefined" || value === 0 ? "0" : value}
            styles={buildStyles({
              textColor: "black",
              textSize: "2.5rem",
              pathColor: barcolor,
              pathTransitionDuration: 3,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Widget;
