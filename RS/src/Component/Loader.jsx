import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-6 h-6">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-6 h-3 bg-black opacity-0 animate-honeycomb`}
            style={{
              left: positions[index].left,
              top: positions[index].top,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="absolute left-0 right-0 border-x-[12px] border-x-transparent border-b-[6px] border-b-gray-300 -top-[6px]"></div>
            <div className="absolute left-0 right-0 border-x-[12px] border-x-transparent border-t-[6px] border-t-gray-300 -bottom-[6px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const positions = [
  { left: "-28px", top: "0" },
  { left: "-14px", top: "22px" },
  { left: "14px", top: "22px" },
  { left: "28px", top: "0" },
  { left: "14px", top: "-22px" },
  { left: "-14px", top: "-22px" },
  { left: "0", top: "0" },
];

export default Loader;
