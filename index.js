require([
  "esri/config",
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/SceneLayer",
  "esri/core/watchUtils",
  "esri/Viewpoint"
], function(esriConfig, Map, SceneView, SceneLayer, watchUtils, Viewpoint) {
  // Set the hostname to the on-premise portal
  esriConfig.portalUrl = "https://gis-aus.arup.com/portal";

  // // -------------------------------------------------------------

  // // City Model

  // const sketchEdges_city = {
  //   type: "sketch",
  //   color: [0, 0, 0, 0.5],
  //   size: 0.3,
  //   extensionLength: 10
  // };

  // const renderer_city = {
  //   type: "simple", // autocasts as new SimpleRenderer()
  //   symbol: {
  //     type: "mesh-3d",
  //     symbolLayers: [
  //       {
  //         type: "fill",
  //         material: {
  //           color: [255, 255, 255, 0.05],
  //           colorMixMode: "replace"
  //         },
  //         edges: sketchEdges_city
  //       }
  //     ]
  //   }
  // };

  // const sceneLayer_city = new SceneLayer({
  //   portalItem: {
  //     id: "3a03fd556daa42d7adb00b2a9f9f15c2"
  //   },
  //   renderer: renderer_city,
  //   popupEnabled: false
  // });

  // // -------------------------------------------------------------

  const sketchEdges = {
    type: "sketch",
    color: [0, 0, 0, 0.8],
    size: 0.6,
    extensionLength: 10
  };

  const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "mesh-3d",
      symbolLayers: [
        {
          type: "fill",
          material: {
            color: [255, 255, 255, 0.1],
            colorMixMode: "replace"
          },
          edges: sketchEdges
        }
      ]
    }
  };

  const sceneLayer = new SceneLayer({
    portalItem: {
      id: "6542883766064621af5d933450d4fc5a"
    },
    renderer: renderer,
    popupEnabled: false,
    definitionExpression: "project_name = 'Sydney Opera House'"
  });

  const map = new Map({
    // basemap: "gray",
    ground: { opacity: 0 },
    layers: [sceneLayer]
  });

  const view = new SceneView({
    container: "viewDiv",
    map: map,
    center: [151.2146, -33.8568],
    zoom: 18,
    alphaCompositingEnabled: true,
    environment: {
      background: {
        type: "color",
        color: [0, 0, 0, 0]
      },
      starsEnabled: false,
      atmosphereEnabled: false
    },
    ui: {
      components: []
    }
  });

  const view0 = new Viewpoint({
    camera: {
      fov: 55,
      heading: 240,
      position: {
        x: 151.21718763804677,
        y: -33.85537968895936,
        z: 88.46818069554865
      },
      tilt: 75
    },
    rotation: 120.00036769296833,
    scale: 763.5443868408584,
    targetGeometry: {
      x: 151.21514253130718,
      y: -33.85636021904838,
      z: 23.471956801600754
    }
  });

  view.goTo({
    target: view0
  });

  const view1 = new Viewpoint({
    camera: {
      fov: 55,
      heading: 314,
      position: {
        x: 151.2169216422583,
        y: -33.85784059056068,
        z: 257.09635963849723
      },
      tilt: 40
    },
    rotation: 46,
    scale: 926,
    targetGeometry: {
      x: 151.21514253130718,
      y: -33.85636021904838,
      z: 45.471956801600754
    }
  });

  view.whenLayerView(sceneLayer).then(function(layerView) {
    watchUtils.whenFalseOnce(layerView, "updating", function(value) {
      view.goTo(
        {
          target: view1
        },
        {
          speedFactor: 0.005,
          easing: "linear"
        }
      );
    });
  });

  window.view = view;
});
