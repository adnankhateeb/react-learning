import { useEffect, useRef, useState } from "react";
import Buttons from "./Buttons";
import "./timer.css";

export const Timer = () => {
   const [min, setMin] = useState(4);
   const [sec, setSec] = useState(59);
   const [ms, setMs] = useState(99);

   const timerRef = useRef(null);

   const startTimer = () => {
      timerRef.current = setInterval(() => {
         setSec((prev) => {
            if (min === 0 && prev === 0) {
               clearInterval(timerRef.current);
               return 0;
            }
            if (prev === 0) {
               setSec(59);
               setMin((previousValue) => {
                  return previousValue - 1;
               });
            }

            return prev - 1;
         });
      }, 1000);
   };

   useEffect(() => {
      startTimer();

      return () => {
         clearInterval(timerRef.current);
      };
   }, []);

   return (
      <div>
         <span>
            {min < 10 ? "0" : null}
            {min}m
         </span>
         :
         <span style={{ marginLeft: "6px" }}>
            {sec < 10 ? "0" : null}
            {sec}s
         </span>
         <Buttons timerRef={timerRef}startTimer={startTimer} setSec={setSec} setMin={setMin} />
      </div>
   );
};
