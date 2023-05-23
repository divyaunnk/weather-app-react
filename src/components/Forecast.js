/* eslint-disable no-lone-blocks */
import React from "react";
import { iconUrlFromCode } from "../services/weatherServices";

function Forecast({title,items}) {
  console.log("items in forecast:", items);
  {items.map((item) => (
    console.log("index:" , item.id , "items:",item)
  )
)}
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>  
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
      {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temp}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
