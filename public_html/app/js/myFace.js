import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

var nav = document.getElementById('top-nav').getBoundingClientRect();

var navHeight = nav.height;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/(window.innerHeight - (navHeight)), 0.1, 1000)
camera.position.z = 25;

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight - (navHeight));

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    nav = document.getElementById('top-nav').getBoundingClientRect()
    navHeight = nav.height;

    renderer.setSize(window.innerWidth, window.innerHeight - (navHeight));
    camera.aspect = window.innerWidth / (window.innerHeight - (navHeight));

    camera.updateProjectionMatrix();
})

var faceLight = new THREE.PointLight(0xFFFFFF, 1, 1000);
faceLight.position.set(0,0,21);
scene.add(faceLight);

var ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,21);
scene.add(light);

var myFace;

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'images/myFace.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

        myFace = gltf.scene;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object


        myFace.position.x = 0;
        myFace.position.y = 0;
        myFace.position.z = 19;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

var render = function() {
    requestAnimationFrame(render);

    myFace.rotation.y -= .01;

    renderer.render(scene, camera);
}

render();

