import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color('#EEEEEE');

const gridHelper = new THREE.GridHelper(100, 300);
scene.add(gridHelper);


const boxGeo = new THREE.BoxGeometry(1);
const basic = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: '#5555EE',
    emissive: '#5555EE'
})

const lambert = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    color: '#5555EE',
    emissive: '#5555EE'
})

const phong = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    color: '#5555EE'
})

const mcap = new THREE.MeshMatcapMaterial({
    side: THREE.DoubleSide,
    color: '#5555EE',
    emissive: '#5555EE'
})

const basicBox = new THREE.Mesh(boxGeo, basic);
scene.add(basicBox);
basicBox.position.set(0, 2, 0);
basicBox.castShadow = true;

const lamBox = new THREE.Mesh(boxGeo, lambert);
scene.add(lamBox);
lamBox.position.set(3, 2, 0);
basicBox.castShadow = true;

const phongBox = new THREE.Mesh(boxGeo, phong);
scene.add(phongBox);
phongBox.position.set(6, 2, 0);
phongBox.castShadow = true;

const matBox = new THREE.Mesh(boxGeo, mcap);
scene.add(matBox);
matBox.position.set(9, 2, 0);
matBox.castShadow = true;

const groundGeo = new THREE.PlaneGeometry(20, 20);
const groundMat = new THREE.MeshStandardMaterial({ color: '#dddddd' });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.set (4.5, 0, 0);
ground.receiveShadow = true;
scene.add(ground);


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.DirectionalLight( '#FF0000', 10 );
light.position.set( 4.5, 2, 6 );
light.castShadow = true;
light.target.position.set(4.5, 0, 0)
scene.add(light);

const helper = new THREE.DirectionalLightHelper( light, 2, '#FF0000' );
scene.add( helper );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function animate() {
    requestAnimationFrame(animate);
    basicBox.rotation.x = 0;
    basicBox.rotation.y = 0;
    basicBox.rotation.z = 0;


    renderer.render(scene, camera);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

animate();
