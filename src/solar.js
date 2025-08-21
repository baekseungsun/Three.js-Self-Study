import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color('#222222');

const gridHelper = new THREE.GridHelper(100, 300);
scene.add(gridHelper);


const texture = new THREE.TextureLoader().load('./assets/img_3.png');

//earth
const earthGeo = new THREE.SphereGeometry(0.1);
const earthMat = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: texture
})


const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);
earth.position.set(-2, 1, 0);
earth.castShadow = true;


//sun


const sunText = new THREE.TextureLoader().load('./assets/img_4.png');

const sunGeo = new THREE.SphereGeometry(0.4)
const sunMat = new THREE.MeshPhongMaterial({
    color: '#FF0000',
    side: THREE.DoubleSide,
    emissive: '#FF0000',
    map: sunText
})

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);3
sun.position.set(1, 1, 1);
sun.castShadow = true;


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.PointLight('#FFDDDD', 10);
light.position.copy(sun.position);
light.castShadow = true;
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function animate() {
    requestAnimationFrame(animate);
    sun.rotation.x = 0;
    sun.rotation.y = 0;
    sun.rotation.z = 0;

    earth.rotation.y += 0.009
    renderer.render(scene, camera);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

animate();
