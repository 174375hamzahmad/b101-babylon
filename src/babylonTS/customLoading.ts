import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  MeshBuilder,
  CubeTexture,
  SceneLoader,
  HemisphericLight,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import customLoadingScreen from "./customLoadingScreen";

class customLoading {
  scene: Scene;
  engine: Engine;
  loadingScreen: customLoadingScreen;

  constructor(
    private canvas: HTMLCanvasElement,
    private loadingBar: HTMLElement,
    private percentLoaded: HTMLElement,
    private loader: HTMLElement
  ) {
    this.engine = new Engine(this.canvas, true);
    this.loadingScreen = new customLoadingScreen(
      this.loadingBar,
      this.percentLoaded,
      this.loader
    );

    this.engine.loadingScreen = this.loadingScreen;
    this.engine.displayLoadingUI();

    this.scene = this.CreateScene();

    this.CreateEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera(
      "camera",
      new Vector3(0, 0.75, -8),
      this.scene
    );
    camera.attachControl();
    camera.speed = 0.25;

    // const envTex = CubeTexture.CreateFromPrefilteredData(
    //   "./environment/sky.env",
    //   scene
    // );

    // scene.environmentTexture = envTex;

    // scene.createDefaultSkybox(envTex, true);
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 0.5;

    scene.environmentIntensity = 0.5;

    return scene;
  }

  async CreateEnvironment(): Promise<void> {
    await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "LightingScene.glb",
      this.scene,
      (evt) => {
        const loadStatus = ((evt.loaded * 100) / evt.total).toFixed();
        console.log(loadStatus);
        this.loadingScreen.updateLoadStatus(loadStatus);
      }
    );

    this.engine.hideLoadingUI();
  }
}

export { customLoading };
