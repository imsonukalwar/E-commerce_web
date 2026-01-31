import { useEffect, useState } from "react"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'




const Productimage = ({ images }) => {

  const [mainImg, setMainImg] = useState(images?.[0]?.url);

  return (

    <div
      className="
        flex flex-col md:flex-row
        gap-6
      "
    >

      {/* THUMBNAILS */}
      <div
        className="
          flex md:flex-col
          gap-3
          overflow-x-auto md:overflow-visible
        "
      >

        {images?.map((img) => (

          <img
            key={img.url}
            src={img.url}
            onClick={() => setMainImg(img.url)}
            className={`
              w-20 h-20
              object-cover
              rounded-xl
              cursor-pointer
              border
              transition-all duration-300
              hover:scale-105
              ${
                mainImg === img.url
                  ? "border-pink-500 ring-2 ring-pink-400"
                  : "border-gray-200"
              }
            `}
          />

        ))}

      </div>

      {/* MAIN IMAGE */}
      <div className="flex-1">

        <img
          src={mainImg}
          className="
            w-full
            h-[260px] sm:h-[320px] md:h-[380px]
            lg:h-[450px]
            object-cover
            rounded-2xl
            shadow-xl
            hover:scale-[1.02]
            transition-all duration-300
          "
        />

      </div>

    </div>

  );
};







export default Productimage
