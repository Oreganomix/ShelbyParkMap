// =========================================
// Shelby Park Map
// ArcGIS JS 4.30
// - Custom 2-step zoom
// - No scroll/dblclick/keyboard zoom
// - Sprayground GIF anchored to fixed coords
// =========================================

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Point"
], function (Map, MapView, FeatureLayer, Point) {

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Colors
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var colors = {
    lightGreen: "#c0d470",
    middleGreen: "#94c263",
    darkGreen: "#78a158",
    darkestGreen: "#67835c",
    lightBrown: "#dcb98a",
    middleBrown: "#c49a6c",
    darkBrown: "#aa7959",
    lightGrey: "#c1c8b9",
    middleGrey: "#9da89a",
    darkGrey: "#818b83",
    darkestGrey: "#549059",
    accentOrange: "#e58b52",
    accentBrown: "#7e3b1d"
  };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Map stuff and disable popups
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var map = new Map({
    basemap: null
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-85.74556, 38.23278],
    scale: 1200,
    rotation: -7.5,
    ui: {
      components: ["attribution"]
    },

    popup: {
      defaultPopupTemplateEnabled: false,
      dockEnabled: false,
      collapseEnabled: false,
      autoOpenEnabled: false
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Grass - 3 layers
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var grassOuter = new FeatureLayer({
    portalItem: {
      id: "6a96ebe071234616977b1d7a98687708"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: colors.darkGreen,
        outline: {
          color: [0, 0, 0, 0],
          width: 0
        }
      }
    }
  });

  var grassMiddle = new FeatureLayer({
    portalItem: {
      id: "e37686cab34c489c9bedfeb690fc9c56"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: colors.middleGreen,
        outline: {
          color: [0, 0, 0, 0],
          width: 0
        }
      }
    }
  });

  var grassInner = new FeatureLayer({
    portalItem: {
      id: "d56cf0848d4e4de0b2f7d8ba8142c1a9"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: colors.lightGreen,
        outline: {
          color: [0, 0, 0, 0],
          width: 0
        }
      }
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Paths - 2 layers
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var pathOuter = new FeatureLayer({
    portalItem: {
      id: "590e58f6767240c2be0ad4cedc601689"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: colors.middleBrown,
        outline: {
          color: [0, 0, 0, 0],
          width: 0
        }
      }
    }
  });

  var pathInner = new FeatureLayer({
    portalItem: {
      id: "9d398218ec3b44269aae92f146e7da91"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: colors.lightBrown,
        outline: {
          color: [0, 0, 0, 0],
          width: 0
        }
      }
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Buildings
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var buildingLayer = new FeatureLayer({
    portalItem: {
      id: "0e1089d0f9fc445c9001e61ede137fc1"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: colors.accentOrange,
        outline: {
          color: colors.accentBrown,
          width: 3
        }
      }
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Courts
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var courtLayer = new FeatureLayer({
    portalItem: {
      id: "6cd056f6086346a392beba5fdfa2e8bb"
    }
  });
	
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Detail Lines -like the tennis court lines and roof details and stuff-
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var DetailLines = new FeatureLayer({   //using AGOL symbology
    portalItem: {
      id: "65009d8ed80b40d49a7702e17071230d"
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Assets Layer
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var assetsLayer = new FeatureLayer({
    portalItem: {
      id: "5698df6506c74fd9b8c5ef6f5f43e090"
    },
    renderer: {
      type: "unique-value",
      field: "asset",

      defaultSymbol: {
        type: "simple-marker",
        size: 9,
        color: "#f0463a",
        outline: {
          color: "#20110f",
          width: 1.5
        }
      },
      defaultLabel: "Other asset",

      uniqueValueInfos: [
        {
          value: "Picnic",
          label: "Picnic Table",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/picnic.png",
            width: "24px",
            height: "24px"
          }
        },
						 
        {
          value: "Bench",
          label: "Bench",
          symbol: {
            type: "simple-marker",
            style: "circle",
            size: 9,
            color: colors.middleGreen,
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Trashcan",
          label: "Trashcan",
          symbol: {
            type: "simple-marker",
            style: "circle",
            size: 9,
            color: "#1f1f1f", // dark inner fill
            outline: {
              color: "#6b6b6b", // lighter thick border
              width: 3
            }
          }
        },
        {
          value: "Grill",
          label: "Grill",
          symbol: {
            type: "simple-marker",
            style: "diamond",
            size: 9,
            color: colors.darkBrown,
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Gazebo",
          label: "Gazebo",
          symbol: {
            type: "simple-marker",
            style: "circle",
            size: 10,
            color: colors.lightGrey,
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Swing",
          label: "Swing",
          symbol: {
            type: "simple-marker",
            style: "cross",
            size: 10,
            color: "#f4b183",
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Bike Parking",
          label: "Bike Parking",
          symbol: {
            type: "simple-marker",
            style: "x",
            size: 10,
            color: colors.darkestGreen,
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Basketball Hoop",
          label: "Basketball Hoop",
          symbol: {
            type: "simple-marker",
            style: "triangle",
            size: 10,
            color: colors.accentOrange,
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Soccer Goal",
          label: "Soccer Goal",
          symbol: {
            type: "simple-marker",
            style: "diamond",
            size: 10,
            color: "#f9d66d",
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        },
        {
          value: "Play Equipment",
          label: "Play Equipment",
          symbol: {
            type: "simple-marker",
            style: "circle",
            size: 11,
            color: "#f0463a",
            outline: {
              color: "#20110f",
              width: 1.5
            }
          }
        }
      ]
    }
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Z Value Order
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  map.addMany([
    pathOuter,
    pathInner,
    courtLayer,
    grassOuter,
    grassMiddle,
    grassInner,
    buildingLayer,
    DetailLines,
    assetsLayer
  ]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Not sure what all this is 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var btn1 = document.getElementById("zoom1");
  var btn2 = document.getElementById("zoom2");
  var lostBtn = document.getElementById("lostBtn");

  if (btn1) {
    btn1.classList.add("active");
  }

  view.when(function () {

    // Save the "home" center so we can always snap back to it
    var homeCenter = view.center.clone();

    // BLOCK all other zoom methods
    view.on("mouse-wheel", function (event) {
      event.stopPropagation();
    });

    view.on("double-click", function (event) {
      event.stopPropagation();
    });

    view.on("double-click", ["Control"], function (event) {
      event.stopPropagation();
    });

    view.on("key-down", function (event) {
      var key = event.key;
      if (key === "+" || key === "-" || key === "=" || key === "_") {
        event.stopPropagation();
      }
    });
    view.on("click", function (event) {
      // keep default map behavior from doing anything weird
      event.stopPropagation();

      // check what was clicked
      view.hitTest(event).then(function (response) {
        if (!response || !response.results || response.results.length === 0) {
          return; // clicked empty map, no sound
        }

        // OPTIONAL: only play sound if it's from assetsLayer
        var featureHit = response.results.find(function (result) {
          return result.graphic && result.graphic.layer === assetsLayer;
        });

        if (featureHit) {
          var squick = document.getElementById("squickSound");
          if (squick) {
            squick.playbackRate = 0.9 + Math.random() * 0.3; // 0.9–1.2x speed
            squick.currentTime = 0; // rewind so rapid clicks still work
            squick.play();
          }
        }
      });
    });

    var scaleOut = 1200; // button 1
    var scaleMid = 425; // button 2

    function goToScale(scale) {
      view.goTo({
        scale: scale
      }, {
        animate: true
      });
    }

    function setTrashcanSize(size) {
      var renderer = assetsLayer.renderer.clone
        ? assetsLayer.renderer.clone()
        : assetsLayer.renderer;

      renderer.uniqueValueInfos.forEach(function (info) {
        if (info.value === "Trashcan" && info.symbol) {
          info.symbol.size = size;
        }
      });

      assetsLayer.renderer = renderer;
    }
	  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Button rules
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Zoom button 1
    if (btn1) {
      btn1.addEventListener("click", function () {
        goToScale(scaleOut);
        setTrashcanSize(9);

        btn1.classList.add("active");
        if (btn2) btn2.classList.remove("active");
      });
    }
    // center map if lost button is clicked
    if (lostBtn) {
      lostBtn.addEventListener("click", function () {
        view.goTo({
          center: homeCenter,
          scale: view.scale // but dont reset the zoom lvl
        }, {
          animate: true
        });
      });
    }

    // Zoom button 2
    if (btn2) {
      btn2.addEventListener("click", function () {
        goToScale(scaleMid);
        setTrashcanSize(12);

        if (btn1) btn1.classList.remove("active");
        btn2.classList.add("active");
      });
    }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Sprayground Gif
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var sprayDiv = document.getElementById("gifOverlay");

    var sprayPoint = new Point({
      longitude: -85.744812,
      latitude: 38.233069,
      spatialReference: view.spatialReference
    });

    function updateSprayPos() {
      if (!sprayDiv || !sprayPoint) return;

      var screenPoint = view.toScreen(sprayPoint);
      if (!screenPoint) return;

      // use actual element size if available
      var w = sprayDiv.offsetWidth || 90;
      var h = sprayDiv.offsetHeight || 90;

      // bottom-center anchor
      sprayDiv.style.left = (screenPoint.x - w / 2) + "px";
      sprayDiv.style.top = (screenPoint.y - h + 20) + "px";
    }

    // keep GIF aligned as view changes
    view.watch("extent", updateSprayPos);
    view.watch("rotation", updateSprayPos);
    view.watch("zoom", updateSprayPos);

    // initial placement
    updateSprayPos();
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Googly Eyes 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(function () {
  var eyesContainer = document.getElementById("eyesContainer");
  if (!eyesContainer) return;

  var eyes = Array.prototype.slice.call(
    eyesContainer.getElementsByClassName("eye")
  );
  var pupils = Array.prototype.slice.call(
    eyesContainer.getElementsByClassName("pupil")
  );

  var maxOffset = 10; // how much the pupils move

  function updateEyes(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    eyes.forEach(function (eye, idx) {
      var rect = eye.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;

      var dx = mouseX - cx;
      var dy = mouseY - cy;

      var angle = Math.atan2(dy, dx);
      var distance = Math.hypot(dx, dy);
      var offset = Math.min(maxOffset, distance / 10);

      var px = Math.cos(angle) * offset;
      var py = Math.sin(angle) * offset;

      var pupil = pupils[idx];
      if (pupil) {
        pupil.style.transform = "translate(" + px + "px, " + py + "px)";
      }
    });
  }

  window.addEventListener("mousemove", updateEyes);
})();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   works on dif browsers
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function fitAppToScreen() {
  const app = document.getElementById('appFrame');
  if (!app) return;

  const designWidth = 2560; // match style.css and index.html appFrame width and height
  const designHeight = 1279; // also match this one

  const scaleX = window.innerWidth / designWidth;
  const scaleY = window.innerHeight / designHeight;

  const scale = Math.min(scaleX, scaleY); //so it fits on vertical browsers also

  app.style.transform = `scale(${scale})`;
}

window.addEventListener('load', fitAppToScreen);
window.addEventListener('resize', fitAppToScreen);
