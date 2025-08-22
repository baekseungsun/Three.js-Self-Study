import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// set height 0.2 to 4
function normalize(values, minH = 0.2, maxH = 6) {
    const abs = values.map(v => Math.max(0, Number.isFinite(v) ? v : 0));
    const max = Math.max(1e-6, ...abs); // 0으로 나눔 방지
    return abs.map(v => minH + (maxH - minH) * (v / max));
}

//export to main.js
export function createBarChart(container) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor('#0b1020', 1);
    container.appendChild(renderer.domElement);

    // scene and cam
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight, //set to window size
        0.1, 1000
    );
    camera.position.set(0, 3.8, 8);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 4;
    controls.maxDistance = 18;

    // lights
    scene.add(new THREE.HemisphereLight(0x88ccff, 0x112244, 1.2));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(4, 6, 3);
    scene.add(dl);

    // grid
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: '#775544', metalness: 0, roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    const grid = new THREE.GridHelper(20, 20, '#223', '#775544');
    scene.add(grid);

    // bars
    //gropu of good-looking colors used later on
    const colors = ['#33AAFF', '#33AA88', 'FF7171', '#CCCC33', '#AA88CC'];
    const group = new THREE.Group();
    scene.add(group);

    const barWidth = 0.8, depth = 0.8, gap = 0.6;
    const baseGeom = new THREE.BoxGeometry(barWidth, 1, depth);
    const bars = Array.from({ length: 5 }, (_, i) => {
        const mat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length] });
        const mesh = new THREE.Mesh(baseGeom, mat);
        mesh.castShadow = false; mesh.receiveShadow = false;
        // x coordinate
        mesh.position.x = (i - 2) * (barWidth + gap);
        // y coordinate
        group.add(mesh);
        return mesh;
    });

    // 2D Overlay Part
    const labelEls = bars.map((_, i) => {
        const numberOverlay = document.createElement('div');
        //number displayed on the bar
        numberOverlay.style.cssText =
            'position:absolute;' +
            'color:#FFFFFF;' +
            'font:12px ui-monospace,monospace;' +
            'transform:translate(-50%,-100%);' +
            'pointer-events:none;';
        container.appendChild(numberOverlay);
        return numberOverlay;
    });

    let targets = [1, 1, 1, 1, 1];
    const tmp = new THREE.Vector3();

    function setHeights(values) {
        targets = normalize(values); // normalize numebr heigths too
    }

    // Initial height
    setHeights([0, 0, 0, 0, 0]);

    let rafId;
    const animate = () => {
        rafId = requestAnimationFrame(animate);

        bars.forEach((bar, i) => {
            const targetH = targets[i];               // actual height
            const currentH = bar.scale.y;
            const nextH = THREE.MathUtils.lerp(currentH, targetH, 0.1); // interpolate each frame
            bar.scale.y = nextH;                      // Scale box default height
            bar.position.y = (nextH) / 2; //important: without this the bars extend under the grid
        });

        controls.update();
        renderer.render(scene, camera);

        // update location of labels according to 3d bars
        bars.forEach((bar, i) => {
            tmp.set(bar.position.x, bar.position.y + (0.55), bar.position.z);
            tmp.project(camera);
            const x = (tmp.x * 0.5 + 0.5) * container.clientWidth;
            const y = (-tmp.y * 0.5 + 0.5) * container.clientHeight;
            labelEls[i].style.left = `${x}px`;
            labelEls[i].style.top  = `${y}px`;
        });
    };
    animate();

    //Run API
    return {
        update(values) {
            // Take only 5 numbers
            const arr = Array.from({ length: 5 }, (_, i) => Number(values[i]));
            setHeights(arr);
            // update label numbers
            arr.forEach((v, i) => (labelEls[i].textContent = String(v)));
        },
    };
}