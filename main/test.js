// TODO: I think I can get rid of this whole file
import * as THREE from "/node_modules/three";
import FOG from "/node_modules/vanta/dist/vanta.fog.min.js";

const section = document.getElementsByClassName("video-bg")[0]

FOG({
  el: section, 
  THREE, 
})