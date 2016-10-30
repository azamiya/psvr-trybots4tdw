navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

window.onload = function(){
    displayMyCamera();
}

var video = document.createElement( 'video' );


function displayMyCamera(){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        //document.getElementById("360video").src = URL.createObjectURL(stream);
        if (video !== null ) video.src = URL.createObjectURL(stream);
        console.log(video);
    }, function() { alert("Error!"); });
}

//
var dummy, camera, scene, renderer;
var video, texture, effect, controls;
var angle = [];
init();
animate();
function init() {
    //Scene
    scene = new THREE.Scene();

    //dummy Camera
    dummy = new THREE.Camera();
    dummy.position.set( 0, 3, 0 );
    dummy.lookAt( scene.position );     //(0, 0, 0)
    scene.add( dummy );

    //Camera
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
    dummy.add( camera );

    //video texture
    //var video = document.getElementById( 'video' );
    var texture = new THREE.VideoTexture( video );
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;   

    //Plane
    var geometry = new THREE.BoxGeometry( 1.6, 0.1, 0.9 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.y = 0 ;
    //plane.rotation.y = Math.PI;
    //plane.rotation.z = Math.PI;
    scene.add( plane );

    //light
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( - 1, 1.5, 0.5 );
    scene.add( light );

    //rendering
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setClearColor( 0x101010 );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    //effect
    effect = new THREE.StereoEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    effect.render(scene, camera);
    //renderer.render(scene, camera);
}
