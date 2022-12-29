import React, { useEffect } from "react";
import { PBR } from "../babylonTS/PBR.ts";

const Babylonexamples = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    new PBR(canvas);
  });
  return (
    <div>
      <h3>Babylon examples</h3>
      <canvas></canvas>
    </div>
  );
};

export default Babylonexamples;
