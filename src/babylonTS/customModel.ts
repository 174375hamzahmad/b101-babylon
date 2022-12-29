import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  CubeTexture,
  PBRMaterial,
  Texture,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders";

class customModel {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();

    this.createEnvironment();

    this.createBarrel();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );

    hemiLight.intensity = 0;

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );

    scene.environmentTexture = envTex;
    scene.createDefaultSkybox(envTex, true);
    scene.environmentIntensity = 0.5;
    return scene;
  }
  createEnvironment() {
    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 10,
        height: 10,
      },
      this.scene
    );

    ground.material = this.createAsphalt();
  }
  createAsphalt(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);
    pbr.roughness = 1;

    pbr.albedoTexture = new Texture(
      "./textures/asphalt/asphalt_02_diff_1k.jpg",
      this.scene
    );
    pbr.bumpTexture = new Texture(
      "./textures/asphalt/asphalt_02_nor_gl_1k.jpg",
      this.scene
    );
    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;

    pbr.ambientTexture = new Texture(
      "./textures/asphalt/asphalt_02_arm_1k.jpg",
      this.scene
    );

    return pbr;
  }
  createBarrel(): void {
    SceneLoader.ImportMesh(
      "",
      "./models/",
      "barrel.glb",
      this.scene,
      (meshes) => {
        console.log("meshes", meshes);
      }
    );
  }
}
export { customModel };
