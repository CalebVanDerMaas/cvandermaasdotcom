import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js";

let nav = document.getElementById("top-nav").getBoundingClientRect();
let navHeight = nav.height;
let windowHeight = window.innerHeight - navHeight - 70;

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / windowHeight,
  0.1,
  1000
);
camera.position.z = 25;

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, windowHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  nav = document.getElementById("top-nav").getBoundingClientRect();
  navHeight = nav.height;
  windowHeight = window.innerHeight - navHeight - 70;
  renderer.setSize(window.innerWidth, windowHeight);
  camera.aspect = window.innerWidth / windowHeight;
  camera.updateProjectionMatrix();
});

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(0, 0.4, 23);
scene.add(pointLight);

// GLTF Model Setup
let faceLight = new THREE.PointLight(0xffffff, 3);
let faceLight2 = new THREE.PointLight(0xffffff, 0.5);
let myFace;

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r129/examples/js/libs/draco/'); // Correct path to Draco decoder files
loader.setDRACOLoader(dracoLoader);

const loadingSpinner = document.getElementById('lds-hourglass');
loader.load(
  "images/myFace-draco.glb"
,
  (gltf) => {
    myFace = gltf.scene;
    myFace.add(faceLight, faceLight2);

    faceLight.position.set(-2.5, 0, 2.75);
    faceLight2.position.set(2.5, 0, 2.75);

    myFace.position.set(0, 0.5, 21);
    scene.add(myFace);
    loadingSpinner.style.display = 'none';
  },
  // (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
  (error) => {
    console.log("An error happened:", error);
    loadingSpinner.style.display = 'none';
  }
  
);

// Mouse Movement Handler
let lastMove = 0;
const handleMouseMove = (event) => {
  if (Date.now() - lastMove < 16) return; // 60 FPS throttle
  lastMove = Date.now();

  const { pageX, pageY } = event;
  const xRotation = (2 * pageX) / window.innerWidth - 1;
  const yRotation = (2 * pageY) / window.innerHeight - 1;

  if (myFace) {
    myFace.rotation.y = xRotation;
    myFace.rotation.x = yRotation;
  }
};

document.addEventListener("mousemove", handleMouseMove);

const render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();
