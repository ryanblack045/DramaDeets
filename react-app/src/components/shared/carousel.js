import React, { useEffect, useState } from "react";
import "../../styles/carousel.css";

const images = [
  "home",
  "Acting",
  "photographer",
  "home"
];

const Carousel = () => {
  const [img, setImg] = useState("default carousel");

  let count = 0;

  const counter = () => {
    const max = images.length - 1;
    if (count === max) count = 0;
    count++;
    return images[count];
  };

  useEffect(() => {
    setInterval(async () => {
      const newPic = `${counter()} carousel`;
      await setImg(newPic);
    }, 7000);
  }, []);

  return (
    <div className="caourselContainer">
      <div className={img}></div>
    </div>
  );
};

export default Carousel;
