import React, { useState } from "react";
// import "beercss";
// import "material-dynamic-colors";

export default function Templates() {
  const [names, setNames] = useState(["Music", "Animals", "Art", "Science"]);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen bg-slate-200">
      <h1 className="m-10 text-3xl font-bold">Select your Category</h1>

      <div className="grid grid-cols-2 gap-6">
        {names.map((name, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 text-center flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 w-56 cursor-pointer"
          >
            <div className="flex justify-center items-center bg-gray-100 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 shadow-xl text-white rounded-full overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt={name}
                className="object-cover h-full w-full"
              />
            </div>
            <p className="mt-4 text-lg md:text-xl font-bold text-center">
              {name}
            </p>
          </div>
        ))}
      </div>

      <ul className="grid grid-cols-3 gap-6 mt-10 w-96 px-10">
        {[...Array(14)].map((_, i) => (
          <li key={i} className="bg-white w-fit text-nowrap rounded-lg shadow-xl h-24">how are you</li>
        ))}
      </ul>
    </div>
  );
}
