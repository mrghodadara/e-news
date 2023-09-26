import React from "react";

const Loader = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={"/loading.gif"} alt="loading" />
    </div>
  );
};

export { Loader };
