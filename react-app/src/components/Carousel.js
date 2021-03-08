import React, { useEffect, useState } from "react";
import "../styles/carousel.css";

// const images = [
//   "home",
//   "Acting",
//   "photographer",
//   "home"
// ];

let imageArray = [<div className="home carousel" />, <div className="Acting carousel" />, <div className="photographer carousel" />, <div className="home carousel" />]
const Carousel = () => {
  const [img, setImg] = useState(imageArray[0]);

  let count = 0;

  const counter = () => {
    const max = imageArray.length - 1;
    if (count === max) count = 0;
    count++;
    return imageArray[count];
  };

  useEffect(() => {
    setInterval(async () => {
      const newPic = counter();
      await setImg(newPic);
    }, 7000);
  }, []);

  return (
    <div className="caourselContainer">
      {img}
    </div>
  );
};

export default Carousel;
