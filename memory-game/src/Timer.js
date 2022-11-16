import { useState, useRef } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  const handleStartTimer = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 500);
    }, 500);
  };

  const handleStopTimer = () => {
    clearInterval(countRef.current);
  };

  return { timer, handleStartTimer, handleStopTimer };
};

export default useTimer;
