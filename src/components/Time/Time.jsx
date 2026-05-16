import { useState, useEffect } from "react";

function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");
  const timeString = `${time.getHours()}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateString = time.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <p className="time">{dateString} · {timeString}</p>
  );
}

export default Time;