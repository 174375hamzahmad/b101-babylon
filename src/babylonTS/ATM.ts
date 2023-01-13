import {
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  CubeTexture,
  AbstractMesh,
} from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines";

import {
  AdvancedDynamicTexture,
  Ellipse,
  Line,
  Rectangle,
  TextBlock,
} from "@babylonjs/gui";

class ATM {
  scene: Scene;
  engine: Engine;
  ground: AbstractMesh;
  numbPadTotal: Rectangle;
  label2 = new TextBlock();

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.createNumpad();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  public dispose() {
    this.scene?.getEngine().dispose();
  }

  createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    // camera.keysUpward = [32]; // spacebar for upward

    // camera.keysDownward = [17]; // left ctrl for downward

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex, true);
    scene.environmentIntensity = 0.5;

    return scene;
  }
  createNumpad() {
    this.ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    });

    this.ground.position.y = 0.25;
    this.ground.isVisible = false;
    // GUI

    this.numbPadTotal = this.createNumPadTotalBar(
      "rectInputScreen",
      0.1,
      -130,
      120
    );

    this.createRectangle("rect1", 0.05, -200, -220, 1);
    this.createRectangle("rect2", 0.05, -200, -130, 2);
    this.createRectangle("rect3", 0.05, -200, -40, 3);
    this.createRectangle("rect4", 0.05, -130, -220, 4);
    this.createRectangle("rect5", 0.05, -130, -130, 5);
    this.createRectangle("rect6", 0.05, -130, -40, 6);
    this.createRectangle("rect7", 0.05, -60, -220, 7);
    this.createRectangle("rect8", 0.05, -60, -130, 8);
    this.createRectangle("rect9", 0.05, -60, -40, 9);
    this.createRectangle("rect0", 0.05, 10, -130, 0);
    this.createRectangle("rectX", 0.05, 10, -40, "X");
    this.createRectangle("rectEnter", 0.1, -60, 120, "Enter");
  }

  createRectangle(name, width, offsetY, offsetX, value): Rectangle {
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      this.scene
    );

    name = new Rectangle();
    name.width = width;
    name.height = "50px";
    name.cornerRadius = 20;
    name.color = "Orange";
    name.thickness = 4;
    name.background = "white";

    advancedTexture.addControl(name);
    name.linkWithMesh(this.ground);
    name.linkOffsetY = offsetY;
    name.linkOffsetX = offsetX;

    var label = new TextBlock();
    label.text = value;
    name.addControl(label);
    name.name = label.text;

    name.onPointerUpObservable.add(() => {
      if (value === "X") {
        this.label2.text = this.label2.text.slice(0, -1);
      } else if (value === "Enter") {
        if (this.label2.text.length === 4) {
          alert("Verified Pin!!! :)");
        } else {
          alert("Incorrect Pin!!! :(");
        }
      } else if (this.label2.text != "" && this.label2.text.length <= 3) {
        this.label2.text += value;
      } else if (this.label2.text.length > 3) {
        alert(`Pin can't be greater than 4 digits`);
      } else {
        this.label2.text = value;
        this.numbPadTotal.addControl(this.label2);
      }
    });

    return name;
  }

  createNumPadTotalBar(name, width, offsetY, offsetX) {
    var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      this.scene
    );

    name = new Rectangle();
    name.width = width;
    name.height = "50px";
    //name.cornerRadius = 20;
    name.color = "Orange";
    name.thickness = 4;
    name.background = "white";

    advancedTexture.addControl(name);
    name.linkWithMesh(this.ground);
    name.linkOffsetY = offsetY;
    name.linkOffsetX = offsetX;

    return name;
  }
}
export { ATM };
