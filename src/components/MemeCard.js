import React from "react";

const MemeCard = ({ data }) => {
  const { title, url, author } = data;
  return (
    <div className="p-5 m-5 border w-72 border-black rounded-lg">
      <p className="mt-4 mb-4">{title}</p>
      <img className="w-[100px] h-[100px] object-cover" src={url} alt="meme" />
      <p className="mt-4">{author}</p>
    </div>
  );
};

export default MemeCard;
