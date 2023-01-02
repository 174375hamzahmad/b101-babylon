import React, { useEffect, useRef } from "react";
import { customLoading } from "../babylonTS/customLoading.ts";

const Babylonexamples = () => {
  const canvasRef = useRef(null);
  const loadingBarRef = useRef(null);
  const percentLoadedRef = useRef(null);
  const loaderRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const loadingBar = loadingBarRef.current;
    const percentLoaded = percentLoadedRef.current;
    const loader = loaderRef.current;
    new customLoading(canvas, loadingBar, percentLoaded, loader);
  }, []);
  return (
    <main>
      <div ref={loaderRef} id="loader">
        <p>Loading</p>

        <div id="loadingContainer">
          <div ref={loadingBarRef} id="loadingBar"></div>
        </div>

        <p ref={percentLoadedRef} id="percentLoaded">
          25%
        </p>
      </div>
      <p>Custom Loading Screen</p>
      <canvas ref={canvasRef}></canvas>
    </main>
  );
};

export default Babylonexamples;
