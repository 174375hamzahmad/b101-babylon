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

    //this.createEnvironment();

    this.createPortalRoomSmall();
    this.createPortalTextured(-1.5, 0, 0);
    this.createPortalTextured(1.2, 0, -1);
    this.createPortalTextured(-1.2, 0, -1);
    this.createPortalTextured(0.7, 0, -1.5);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;
    camera.keysUpward = [32]; // spacebar for upward

    camera.keysDownward = [17]; // left ctrl for downward

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

  async createPortalRoomSmall(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "PortalRoomSmall.glb",
      this.scene
    ).then((result) => {
      result.meshes[0].scaling.x = 3;
      result.meshes[0].scaling.y = 3;
      result.meshes[0].scaling.z = 3;
    });
  }
  async createPortalTextured(x, y, z): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "PortalTexured1.glb",
      this.scene
    ).then((result) => {
      result.meshes[0].scaling.x = 0.16;
      result.meshes[0].scaling.y = 0.16;
      result.meshes[0].scaling.z = 0.16;
      result.meshes[0].position = new Vector3(x, y, z);
      //result.meshes[0].rotation = new Vector3(2 * Math.PI * Math.random(), 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random());
    });
  }
}
export { customModel };
