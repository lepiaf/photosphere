var global = {};

// setups normal camera
var setupNormalCamera = function(camera) {
    // This creates and positions the arc camera
    global.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", camera.alpha, camera.beta, 15, new BABYLON.Vector3(0, 0, 0), global.scene);

    // limiting the upper and lower bounds removes the scrollwheel behaviour
    global.camera.lowerRadiusLimit = global.camera.radius;
    global.camera.upperRadiusLimit = global.camera.radius;

    // This attaches the camera to the canvas
    global.camera.attachControl(global.canvas, false);
};

// setup photosphere
var setupPhotoSphere = function(current, database){

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 100, global.scene);

    if (typeof global.moveblock != "undefined" && global.moveblock.length > 0) {
        $.each(global.moveblock, function (i, e) {

            e.dispose();
        });
    }

    if(global.scene.materials.length > 0) {
      $.each(global.scene.materials, function (i,e){
        global.scene.materials.splice(i,1);
      });
    }

    global.moveblock = [];
    var photo = findPhoto(current);
    console.log(current);
    $.each(photo.neighbors, function (i, e){
        var moveBlock = BABYLON.Mesh.CreateCylinder("move_"+ e.name, 5, 1, 0, 12, 1, global.scene, true);
        moveBlock.position = new BABYLON.Vector3(e.cursor.x,e.cursor.y,e.cursor.z);
        moveBlock.rotation.x = e.cursor.rotate.x;
        moveBlock.rotation.y = e.cursor.rotate.y;
        moveBlock.rotation.z = e.cursor.rotate.z;

        var materialMoveBlock = new BABYLON.StandardMaterial("materialMoveBlock", global.scene);

        // set emissive color
        materialMoveBlock.emissiveColor = new BABYLON.Color3(.7, .7, .7);
        moveBlock.material = materialMoveBlock;

        global.moveblock.push(moveBlock);
    });

    global.scene.activeCamera.alpha = photo.camera.alpha;


    // load material
    var texture = new BABYLON.Texture("photos/" + current + ".jpg", global.scene);

    // rotate texture
    texture.wAng = Math.PI/-2;

    // create new material
    var materialPhotoSphere = new BABYLON.StandardMaterial("texturePhotoSphere", global.scene);
    materialPhotoSphere.diffuseTexture = texture;

    // enable backface culling
    materialPhotoSphere.backFaceCulling = false;
    //sphere.scaling.x = -1;

    // set emissive color
    materialPhotoSphere.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

    // asign material to sphere
    sphere.material = materialPhotoSphere;

}

// Init babylon
var setupBabylon = function() {

    // Get the canvas element from our HTML below
    global.canvas = document.getElementById("renderCanvas");

    // Load BABYLON 3D engine
    global.engine = new BABYLON.Engine(global.canvas, true);

    // This creates a basic Babylon Scene object (non-mesh)
    global.scene = new BABYLON.Scene(global.engine);

    //global.scene.debugLayer.show();

    // setup camera
    setupNormalCamera(findPhoto("0001").camera);

    // setup photosphere
    setupPhotoSphere("0001", database);

    // Once the scene is loaded, just register a render loop to render it
    global.engine.runRenderLoop(function () {

        global.scene.render();
    });

};
