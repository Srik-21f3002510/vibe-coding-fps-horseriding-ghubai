import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.129.0/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Horse and Rider
const horseGeometry = new THREE.BoxGeometry(2, 1, 1);
const horseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const horse = new THREE.Mesh(horseGeometry, horseMaterial);
horse.position.y = 0.5;
scene.add(horse);

const riderGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const riderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF });
const rider = new THREE.Mesh(riderGeometry, riderMaterial);
rider.position.y = 1.25;
horse.add(rider);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Player Controls
const keys = {};
document.addEventListener('keydown', (e) => (keys[e.code] = true));
document.addEventListener('keyup', (e) => (keys[e.code] = false));

const clock = new THREE.Clock();
const walkSpeed = 2;
const gallopSpeed = 6;
const rotationSpeed = 1.5;
const jumpForce = 8;
const gravity = -20;
let velocityY = 0;

// Environment Management
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

function setEnvironment(environment) {
    // Clear existing trees
    scene.children.forEach(child => {
        if (child.name === 'tree') {
            scene.remove(child);
        }
    });

    if (environment === 'pastures') {
        ground.material.map = null;
        ground.material.color.setHex(0x00ff00); // Green
        scene.background = new THREE.Color(0x87CEEB); // Sky Blue

        for (let i = 0; i < 20; i++) {
            const tree = new THREE.Mesh(
                new THREE.CylinderGeometry(0.5, 0.5, 5, 8),
                new THREE.MeshStandardMaterial({ color: 0x006400 })
            );
            tree.position.set(
                (Math.random() - 0.5) * 100,
                2.5,
                (Math.random() - 0.5) * 100
            );
            tree.name = 'tree';
            scene.add(tree);
        }
    } else if (environment === 'desert') {
        ground.material.map = null;
        ground.material.color.setHex(0xC2B280);
        scene.background = new THREE.Color(0xF0E68C);
    } else if (environment === 'snow') {
        ground.material.map = null;
        ground.material.color.setHex(0xFFFAFA);
        scene.background = new THREE.Color(0xA9A9A9);

        for (let i = 0; i < 20; i++) {
            const tree = new THREE.Mesh(
                new THREE.CylinderGeometry(0.5, 0.5, 5, 8),
                new THREE.MeshStandardMaterial({ color: 0x228B22 })
            );
            tree.position.set(
                (Math.random() - 0.5) * 100,
                2.5,
                (Math.random() - 0.5) * 100
            );
            tree.name = 'tree';
            scene.add(tree);
        }
    }
}

setEnvironment('pastures');

const environmentSelector = document.getElementById('environment');
environmentSelector.addEventListener('change', (e) => {
    setEnvironment(e.target.value);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();
    const currentSpeed = (keys['ShiftLeft'] || keys['ShiftRight']) ? gallopSpeed : walkSpeed;

    if (keys['KeyW']) {
        horse.translateZ(-currentSpeed * deltaTime);
    }
    if (keys['KeyS']) {
        horse.translateZ(currentSpeed * deltaTime);
    }
    if (keys['KeyA']) {
        horse.rotation.y += rotationSpeed * deltaTime;
    }
    if (keys['KeyD']) {
        horse.rotation.y -= rotationSpeed * deltaTime;
    }

    if (keys['Space'] && horse.position.y <= 0.5) {
        velocityY = jumpForce;
    }

    horse.position.y += velocityY * deltaTime;
    if (horse.position.y > 0.5) {
        velocityY += gravity * deltaTime;
    } else {
        horse.position.y = 0.5;
        velocityY = 0;
    }

    // Camera
    const offset = new THREE.Vector3(0, 4, 8);
    const cameraPosition = horse.position.clone().add(offset.applyQuaternion(horse.quaternion));
    camera.position.lerp(cameraPosition, 0.1);
    camera.lookAt(horse.position);

    renderer.render(scene, camera);
}

animate();
