import "./Time.css";

import { useState, useEffect } from "react";

function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function currentTime() {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  //Har ändrat formatet för hur datum visas
  const currentDate = new Date().toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const now = new Date();
  const weekDays = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];
  const currentDay = weekDays[now.getDay()];

  return (
    <div className="time-container">
      <div className="date-time">
        <p>{currentDay}</p>
        <p>{currentDate}</p>
        <p>{currentTime()}</p>
      </div>
    </div>
  );
}

export default Time;
