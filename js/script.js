const filename = "scene_mesh_textured";
const filepath = "./assets/Archive4/";
// const filename = "Project-2020-09-25_simplified_3d_mesh.fbx";
// const filename1 = "building_2.FBX";
// const filepath = "./assets/";


// const filepath = "./assets/mavic/";
// const filename = "Test mavic.fbx";

// const filepath = "./assets/Local/";
// const filename = "Local coordinate.fbx";

// const filepath = "./assets/PIX4D/";
// const filename = "simplified_3d_mesh.fbx";

// const filepath = "./assets/nad83/";
// const filename = "NAD 83.fbx";


const clock = new THREE.Clock();
var scene;
const BACKGROUND_COLOR = 0x111111;
var camera;
var renderer;
var cameraControls ;
var wheelScroll = 0;
var mainObj = null;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var latlng = lat215;// lat215;// latTest2 // latlngDataJson // lat225
var finalLatLngArray = [];
var xTotal = 0;
var zTotal = 0;
var altTotal = 0;
var altReducerFactor = 2;
var angleReducerFactor = 90;
var buondingBox;
var countI = 0;
var lastClickedDrone = null;
var lastClickedDroneMaterial = null;
var MAP_WIDTH = 22300;
var MAP_HEIGHT = 14800;
var northWest, northEast;
var sphere , stats;
var renderer, camera;
var cube;
var cameraCenter = new THREE.Vector3();
var cameraHorzLimit = 50;
var cameraVertLimit = 50;
var mouse = new THREE.Vector2();
var canvas;


function init()
{
  scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND_COLOR );
//   CameraControls.install( { THREE: THREE } );
  
  camera = new THREE.PerspectiveCamera( 54, window.innerWidth/window.innerHeight, 0.3, 1000 );
  camera.position.set( 30,-7,56 );
//   camera.lookAt (new THREE.Vector3(30,-7,56)); // 
//   cameraCenter.x = camera.position.x;
//   cameraCenter.y = camera.position.y;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  
  
  
//   cameraControls = new CameraControls( camera, renderer.domElement );
//   cameraControls.dollyToCursor = true;
//   cameraControls.maxPolarAngle = 1.24;
  
  var ambientLight = new THREE.AmbientLight( 0xffffff, 5 );
  scene.add( ambientLight );
  //document.addEventListener("click", onMouseOrTouch, false);
  //window.addEventListener("resize", ChangeCanvasSize , false);
	loadFbxObject();
	document.addEventListener('keydown',onDocumentKeyDown,false); // 
	// document.addEventListener('mousemove',onDocumentMouseMove,false);

	canvas = document.querySelector('canvas');

	mousePointerLock();

	canvas.onclick = function() {
		canvas.requestPointerLock();
	}

	document.addEventListener('pointerlockchange', changeCallback, false);
	document.addEventListener('mozpointerlockchange', changeCallback, false);
	document.addEventListener('webkitpointerlockchange', changeCallback, false);

	// Hook mouse move events
	// document.addEventListener("mousemove", moveCallback, false);

}

function changeCallback(){
	if (document.pointerLockElement === canvas ||
		document.mozPointerLockElement === canvas ||
		document.webkitPointerLockElement === canvas) {
		// Pointer was just locked
		// Enable the mousemove listener
		document.addEventListener("mousemove", moveCallback, false);
	  } else {
		// Pointer was just unlocked
		// Disable the mousemove listener
		document.removeEventListener("mousemove", moveCallback, false);
	  }
}

function moveCallback(e) {
	var sensitivity = 0.02;

	console.log("movementX : ",movementX);
	console.log("movementY : ",movementY);

	var movementX = e.movementX ||
		e.mozMovementX          ||
		e.webkitMovementX       ||
		0,
	movementY = e.movementY ||
		e.mozMovementY      ||
		e.webkitMovementY   ||
		0;


		console.log("movementX : ",movementX);
		console.log("movementY : ",movementY);

		camera.rotation.y -= movementX* sensitivity/10;
		camera.rotation.x -= movementY * sensitivity/10;
  }

function mousePointerLock(){
	var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

	console.log("havePointerLock : ",havePointerLock);

	canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
	// Ask the browser to lock the pointer
	// canvas.requestPointerLock();
}

var oldMouseDirection = 0.015;

var direction ; // = new THREE.Vector3();
// camera.getWorldDirection( direction );

function onDocumentMouseMove(event){
	console.log("herererere--------------------------------");
	var sensitivity = 0.02;
	// console.log("event : ",event);
	// console.log("event.clientX : ",event.clientX);
	// console.log("event.clientY : ",event.clientY);
	// console.log("event.layerX : ",event.layerX);
	// console.log("event.layerY : ",event.layerY);
	// console.log("event.movementX : ",event.movementX);
	// console.log("event.movementY : ",event.movementY);
	// console.log("event.offsetX : ",event.offsetX);
	// console.log("event.offsetY : ",event.offsetY);
	// console.log("event.pageX : ",event.pageX);
	// console.log("event.pageY : ",event.pageY);
	// console.log("event.screenX : ",event.screenX);
	// console.log("event.screenY : ",event.screenY);

	// console.log("Camera : ",camera);


	// if(event.movementX == 0){
	// 	camera.rotation.y -= oldMouseDirection;
	// }
	// else{
	// 	camera.rotation.y -= event.movementX * sensitivity/10;
	// }

	camera.rotation.y -= event.movementX * sensitivity/10;
    camera.rotation.x -= event.movementY * sensitivity/10;
	// camera.updateProjectionMatrix();

	// if(event.movementX != 0){
	// 	if(event.movementX < 0){
	// 		oldMouseDirection = oldMouseDirection > 0 ? oldMouseDirection * (-1) : oldMouseDirection;
	// 	}
	// 	else{
	// 		oldMouseDirection = Math.abs(oldMouseDirection);
	// 	}
	// 	// oldMouseDirection = event.movementX;
	// }

	// console.log("camera.getWorldDirection() : ",);

	// direction = new THREE.Vector3();
	

}

// function onDocumentMouseMove(event) {
//     event.preventDefault();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

function onDocumentKeyDown(event){
	// camera.lookAt( camera.getWorldDirection() );
	// var delta = 10;
	event = event || window.event;
	var keycode = event.keyCode;
	// switch(keycode){
	// 	case 37 : //left arrow 向左箭头
	// 	camera.position.x = camera.position.x - delta;
	// 	break;
	// 	case 38 : // up arrow 向上箭头
	// 	camera.position.z = camera.position.z - delta;
	// 	break;
	// 	case 39 : // right arrow 向右箭头
	// 	camera.position.x = camera.position.x + delta;
	// 	break;
	// 	case 40 : //down arrow向下箭头
	// 	camera.position.z = camera.position.z + delta;
	// 	break;
	// }
	// camera.updateProjectionMatrix();
	// document.addEventListener('keyup',onDocumentKeyUp,false);

	// var dir = new THREE.Vector3();
	var speed = 1.0;
	// camera.getWorldDirection( dir );
    // camera.position.addScaledVector( dir, speed );

	switch(keycode){
		case 65 : //37 : //left arrow 向左箭头
		camera.translateX( - speed );
		break;
		case 87: //38 : // up arrow 向上箭头
		camera.translateZ( - speed );
		break;
		case 68: //39 : // right arrow 向右箭头
		camera.translateX( speed );
		// camera.position.x = camera.position.x + delta;
		break;
		case 83: //40 : //down arrow向下箭头
		// camera.position.z = camera.position.z + delta;
		camera.translateZ( speed );
		break;
	}

	console.log(camera.position);


}

function onDocumentKeyUp(event){
	document.removeEventListener('keydown',onDocumentKeyDown,false);
}


function loadFbxObject(){
	var loader = new THREE.FBXLoader();
	
	var filePathTotal = './obj/building_2.FBX';
	loader.load( filePathTotal , function ( object ) {
	//   buondingBox = new THREE.Box3().setFromObject( object );
	//   object.localToWorld( buondingBox.getCenter());
	  object.name = "MainObj";
	  object.position.set(0,-10,0);
	//   mainObj = object;
	  scene.add( object );
	//   centerOfModelCartesian = buondingBox.getCenter();
	}, undefined, function ( e ) {
	  console.log("------------error-----------");
	  console.error( e );
	});
  }

function loadGltf(){
	const loader = new THREE.glTFLoader;
	loader.load(
		// resource URL
		'./obj/GNF_S2_Podium_export_02_NoDome.glb',
		// called when the resource is loaded
		function ( gltf ) {

			let sword = gltf.scene;  // sword 3D object is loaded
			sword.scale.set(2, 2, 2);
			sword.position.y = 4;
			scene.add(sword);
	
			// scene.add( gltf.scene );
	
			// gltf.animations; // Array<THREE.AnimationClip>
			// gltf.scene; // THREE.Group
			// gltf.scenes; // Array<THREE.Group>
			// gltf.cameras; // Array<THREE.Camera>
			// gltf.asset; // Object
	
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
	
}





// function ChangeCanvasSize(e)
// {
//   var myCanvas = document.getElementById("view3d");
//   var widthCanvas = ConvertPercentageToPx(window.innerWidth , myCanvas.style.width.replace("%", ""));
//   var heightCanvas = ConvertPercentageToPx(window.innerHeight , myCanvas.style.height.replace("%", ""));
//   myCanvas.width = widthCanvas;
// 	myCanvas.height = heightCanvas;
//   camera.aspect = widthCanvas / heightCanvas;
//   camera.updateProjectionMatrix();
//   console.log("widthCanvas : "+widthCanvas+" , heightCanvas : "+heightCanvas);

//   renderer.setSize( widthCanvas, heightCanvas );

//   //console.log(e);
// }

// function ConvertPercentageToPx(mainData , percentage)
// {
//   return ((mainData * percentage) / 100)
// }

// // Converts from degrees to radians.
// function toRadians(degrees) {
//   return degrees * Math.PI / 180;
// };
 
// // Converts from radians to degrees.
// function toDegrees(radians) {
//   return radians * 180 / Math.PI;
// }


// var mixer;
// function PlayAnimation(){
// 	mixer = new THREE.AnimationMixer( bulbObj );
// 	mixer.clipAction(bulbObj.animations[0]).play();
// 	mixer.timeScale = 1;
// }

// function StopAnimation(){
// 	if (mixer != null) {
// 		mixer.stopAllAction();
// 	}
// }

// function updateCamera() {
//     //offset the camera x/y based on the mouse's position in the window
//     camera.rotation.x = cameraCenter.x + (cameraHorzLimit * mouse.x);
//     camera.rotation.y = cameraCenter.y + (cameraVertLimit * mouse.y);
// }


var animate = function animate() {
	// const delta = clock.getDelta();
	// updateCamera();
	// const hasControlsUpdated = cameraControls.update( delta );
	// if (mixer != null) {
	// 	mixer.update(delta);
	// };
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
	
};

function start()
{
  init();
  //loadObject();
  animate();
}

