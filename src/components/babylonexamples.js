import React, { useEffect, useRef } from "react";
import { customLoading } from "../babylonTS/customLoading.ts";
import { MeshActions } from "../babylonTS/meshActions";
import { FirstPersonController } from "../babylonTS/firstPersonController";

const Babylonexamples = () => {
  const canvasRef = useRef(null);
  // const loadingBarRef = useRef(null);
  // const percentLoadedRef = useRef(null);
  // const loaderRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    // const loadingBar = loadingBarRef.current;
    // const percentLoaded = percentLoadedRef.current;
    // const loader = loaderRef.current;
    // new customLoading(canvas, loadingBar, percentLoaded, loader);
    new FirstPersonController(canvas);
  }, []);
  return (
    <>
      {/* <div ref={loaderRef} id="loader">
        <p>Loading</p>

        <div id="loadingContainer">
          <div ref={loadingBarRef} id="loadingBar"></div>
        </div>

        <p ref={percentLoadedRef} id="percentLoaded">
          25%
        </p>
      </div> */}
      <h3>First Person Controller</h3>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Babylonexamples;
