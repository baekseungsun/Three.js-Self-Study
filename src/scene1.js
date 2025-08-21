import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";



const scene = new THREE.Scene();
scene.background = new THREE.Color('#EEEEEE');

const gridHelper = new THREE.GridHelper(100, 300);
scene.add(gridHelper);



const texture = new THREE.TextureLoader().load('./assets/img_3.png');

//earth


/*
const line = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial( { color: '#FFFFFF' }));
scene.add( line )
*/

const boxGeo = new THREE.BoxGeometry(1);
const boxMat = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    color: '#5555EE',
    emissive: '#5555EE'
})

const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);
box.position.set(0, 2, 0);
box.castShadow = true;

const bigBoxGeo = new THREE.BoxGeometry(2, 2, 2);
const bigBoxMat = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    color: '#BBBBBB',
    emissive: '#BBBBBB',
})

const bigBox = new THREE.Mesh(bigBoxGeo, bigBoxMat);
scene.add(bigBox);
bigBox.receiveShadow = true;
bigBox.position.set(-3, 1, 0);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const light = new THREE.DirectionalLight( '#FF0000', 10 );
light.position.set( 2, 2, 0 );
light.castShadow = true;
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
    box.rotation.x = 0;
    box.rotation.y = 0;
    box.rotation.z = 0;

    /*
    line.rotation.x = 0;
    line.rotation.y = 0;
    line.rotation.z = 0;
     */
    renderer.render(scene, camera);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

animate();
