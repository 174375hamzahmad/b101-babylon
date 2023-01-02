import React, { useEffect, useRef } from "react";
import { CameraMechanics } from "../babylonTS/cameraMechanics.ts";

const ProductPreview = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    new CameraMechanics(canvas);
  }, []);
  return (
    <main>
      <header>
        <h1>TIMELESS</h1>
      </header>
      <section>
        <canvas ref={canvasRef}></canvas>
        <div id="productDetails">
          <h3>Avventura Vintage Gold Pocket Watch</h3>
          <p id="price">$1,195</p>

          <div id="description">
            <h4>Description</h4>

            <p>
              Beautiful 9 Karat Gold pocket watch suitable for any occasion.
              This vintage piece was made in 1910 and includes an inscription of
              the watch maker on the back for added authenticity.
            </p>

            <p>
              Original glass face with intricate ornamental design and classic
              Roman numerals. The perfect gift to be handed down through the
              ages.
            </p>
            <br />

            <b>Dimensions</b>
            <p>
              1.25" width of the watch 1.75" height with bow 23.52 grams weight
            </p>
          </div>

          <button>ADD TO CART</button>
        </div>
      </section>
    </main>
  );
};

export default ProductPreview;
