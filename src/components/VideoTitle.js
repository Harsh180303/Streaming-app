import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold w-2/4">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex gap-x-6">
        <button className="bg-white text-black hover:bg-opacity-80 px-4 py-3 rounded-md flex gap-x-2 items-center font-bold text-xl cursor-pointer"
        >
          <i className="fa-solid fa-play"></i>
          Play
        </button>
        <button className="bg-gray-600 bg-opacity-40 px-4 py-3 rounded-md flex gap-x-2 items-center font-semibold text-xl cursor-pointer">
          <i className="fa-solid fa-circle-info"></i>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
