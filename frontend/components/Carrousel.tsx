import React, { useState } from "react";
// import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrousel(): JSX.Element {
  const [imageIndex, setImageIndex] = useState(0);

  //console.log(Image1)

  const images = [
    {
      url: "https://www.mexx.com.ar/uploads/22-08-2023-10-08-29-Banner%201.jpg",
      id: 1,
    },
    {
      url: "https://www.mexx.com.ar/uploads/26-09-2023-04-09-04-Sin%20t%C3%ADtulo-1nvidiabanner%20web.jpg",
      id: 2,
    },
    {
      url: "https://www.mexx.com.ar/uploads/19-09-2023-10-09-49-23KDI031_NewBeastDDR4-RGB_2000x520-4kinggstonnuevo.jpg",
      id: 3,
    },
    {
      url: "https://i.imgur.com/41kpzUt.png",
      id: 4,
    },
    {
      url: "https://i.imgur.com/66wwW3H.png",
      id: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (
      current: React.SetStateAction<number>,
      next: React.SetStateAction<number>
    ) => setImageIndex(next),
  };

  return (
    <Slider {...settings}>
      {images.map((img, idx) => {
        return (
          <>
            <div
              key={idx}
              className={idx === imageIndex ? "slide activeSlide" : "slide"}
            >
              {/* <Image src="/banner.png" layout="fill"></Image> */}
              {/*<Image src={img.url} layout="fill"></Image> */}
              <img
                key={img.id}
                src={
                  img.url
                }
                alt="name"
                width={2000}
                height={300}
              />
            </div>
          </>
        );
      })}
    </Slider>
  );
}
