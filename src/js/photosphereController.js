var photosphereApp = angular.module('photosphereApp', []);

photosphereApp.controller('photosphereController', function ($scope) {
  $scope.global = {};

  $scope.init = function() {
    $scope.setupBabylon();
  };

  $scope.setupBabylon = function() {

      // Get the canvas element from our HTML below
      $scope.global.canvas = angular.element("#renderCanvas");

      // Load BABYLON 3D engine
      $scope.global.engine = new BABYLON.Engine($scope.global.canvas[0], true);

      // This creates a basic Babylon Scene object (non-mesh)
      $scope.global.scene = new BABYLON.Scene($scope.global.engine);

      //$scope.global.scene.debugLayer.show();

      // setup camera
      $scope.setupNormalCamera($scope.findPhoto("0001").camera);

      // setup photosphere
      $scope.setupPhotoSphere("0001", database);

      // Once the scene is loaded, just register a render loop to render it
      $scope.global.engine.runRenderLoop(function () {
          $scope.global.scene.render();
      });
  };


  $scope.findPhoto = function(name){
      var photo = {};
      $.each(database.photos, function(i, e){
          if (e.name === name) {
              photo = e;
              return false;
          }
      });

      return photo;
  };

  $scope.setupPhotoSphere = function(current, database){

      // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
      var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 100, $scope.global.scene);

      if (typeof $scope.global.moveblock != "undefined" && $scope.global.moveblock.length > 0) {
          $.each($scope.global.moveblock, function (i, e) {

              e.dispose();
          });
      }

      if($scope.global.scene.materials.length > 0) {
        $.each($scope.global.scene.materials, function (i,e){
          $scope.global.scene.materials.splice(i,1);
        });
      }

      $scope.global.moveblock = [];
      var photo = findPhoto(current);
      $.each(photo.neighbors, function (i, e){
          var moveBlock = BABYLON.Mesh.CreateCylinder("move_"+ e.name, 5, 1, 0, 12, 1, $scope.global.scene, true);
          moveBlock.position = new BABYLON.Vector3(e.cursor.x,e.cursor.y,e.cursor.z);
          moveBlock.rotation.x = e.cursor.rotate.x;
          moveBlock.rotation.y = e.cursor.rotate.y;
          moveBlock.rotation.z = e.cursor.rotate.z;

          var materialMoveBlock = new BABYLON.StandardMaterial("materialMoveBlock", $scope.global.scene);

          // set emissive color
          materialMoveBlock.emissiveColor = new BABYLON.Color3(.7, .7, .7);
          moveBlock.material = materialMoveBlock;

          $scope.global.moveblock.push(moveBlock);
      });

      $scope.global.scene.activeCamera.alpha = photo.camera.alpha;


      // load material
      var texture = new BABYLON.Texture("photos/" + current + ".jpg", $scope.global.scene);

      // rotate texture
      texture.wAng = Math.PI/-2;

      // create new material
      var materialPhotoSphere = new BABYLON.StandardMaterial("texturePhotoSphere", $scope.global.scene);
      materialPhotoSphere.diffuseTexture = texture;

      // enable backface culling
      materialPhotoSphere.backFaceCulling = false;
      //sphere.scaling.x = -1;

      // set emissive color
      materialPhotoSphere.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);

      // asign material to sphere
      sphere.material = materialPhotoSphere;

  };

  // setups normal camera
  $scope.setupNormalCamera = function(camera) {
      // This creates and positions the arc camera
      $scope.global.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", camera.alpha, camera.beta, 15, new BABYLON.Vector3(0, 0, 0), $scope.global.scene);

      // limiting the upper and lower bounds removes the scrollwheel behaviour
      $scope.global.camera.lowerRadiusLimit = $scope.global.camera.radius;
      $scope.global.camera.upperRadiusLimit = $scope.global.camera.radius;

      // This attaches the camera to the canvas
      $scope.global.camera.attachControl($scope.global.canvas[0], false);
  };

  $scope.move = function($event) {
    var e = $scope.global.scene.pick($event.clientX, $event.clientY);
    if (e.pickedMesh.name.match(/move/)) {
        $scope.setupPhotoSphere((e.pickedMesh.name.split("_"))[1], database);
    }
  };

});
