import React from "react";

const SimmerMeme = () => {
  return Array(20)
    .fill(0)
    .map((n, i) => (
      <div className="p-5 m-5 border border-black rounded-lg">
        <p className="mt-4 mb-4 p-4 bg-gray-300"></p>
        <p className="w-64 h-64 bg-gray-300"></p>
        <p className="mt-4 p-4 bg-gray-300"></p>
      </div>
    ));
};

export default SimmerMeme;
