import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x = 100
camera.position.y = 100
camera.position.z = 100

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);



// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

const sunTexture = new THREE.TextureLoader().load('2k_sun.jpg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(32, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
      emissive: 0xffffff,
      emissiveMap: sunTexture,
  })
);
scene.add(sun)
const light = new THREE.PointLight(0xffffff);
scene.add(light)

const mercuryTexture = new THREE.TextureLoader().load('2k_mercury.jpg')
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map:mercuryTexture,
  }),
)

scene.add(mercury);
const mercuryObj = {obj: mercury, angle: 0}

const venusTexture = new THREE.TextureLoader().load('2k_venus_atmosphere.jpg')
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture
  })
)

scene.add(venus);
const venusObj = {obj: venus, angle: 0}


const earthTexture = new THREE.TextureLoader().load('2k_earth_daymap.jpg')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  }),
)

scene.add(earth);
const earthObj = {obj: earth, angle: 0}

const moonTexture = new THREE.TextureLoader().load('2k_moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
)

scene.add(moon);
const moonObj = {obj: moon, angle: 0};

const marsTexture = new THREE.TextureLoader().load('2k_mars.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

scene.add(mars);
const marsObj = {obj: mars, angle: 0}

function rotateAroundItself(obj) {
  obj.rotation.y += 0.01;
}

function rotateAroundPoint(obj, r, a, point) {
  obj.angle += a
  obj.obj.position.x = r * Math.cos(obj.angle) + point.position.x;
  obj.obj.position.z = r * Math.sin(obj.angle) + point.position.z;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  rotateAroundItself(sun);
  rotateAroundItself(mercury)
  rotateAroundPoint(mercuryObj, 50, 0.05, sun)
  rotateAroundItself(venus)
  rotateAroundPoint(venusObj, 100, 0.02, sun)
  rotateAroundItself(earth)
  rotateAroundPoint(earthObj, 150, 0.01, sun)
  rotateAroundItself(moon);
  rotateAroundPoint(moonObj, 20, 0.01, earth)
  rotateAroundItself(mars)
  rotateAroundPoint(marsObj, 200, 0.015, sun)
  renderer.render(scene, camera);
}



animate()