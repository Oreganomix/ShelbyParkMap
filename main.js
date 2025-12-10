
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Squick Sound + map setup
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let isMuted = false;

function playSquick() {
  if (isMuted) return;

  var squick = document.getElementById("squickSound");
  if (!squick) return;

  squick.playbackRate = 0.9 + Math.random() * 0.3;
  squick.currentTime = 0;
  squick.play();
}

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/geometry/Point"
], function (Map, MapView, FeatureLayer, Point) {

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   colors but i started losing track of them
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
      id: "aacd5160a6444afe8cab9eb038db8ae4"
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
//   Detail Layer
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var detailsLayer = new FeatureLayer({
  url: "https://services1.arcgis.com/cRvLdSPAsRupRo7I/arcgis/rest/services/details/FeatureServer/0",

renderer: {
  type: "unique-value",
  field: "detailID",

  uniqueValueInfos: [
    {
      value: "basketball 1",
      label: "Basketball",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/basketball.png",
        width: "10px",
        height: "10px"
      }},
    {
      value: "car #1",
      label: "car1",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/car1.png",
        width: "20px",
        height: "30px",
        yoffset: 3
      }},
    {
      value: "car #2",
      label: "car2",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/car2.png",
        width: "20px",
        height: "30px",
        yoffset: 3
      }},
    {
      value: "car #3",
      label: "car3",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/car3.png",
        width: "15px",
        height: "30px",
        yoffset: 3
      }},
    {
      value: "dumpster #1",
      label: "dumpster",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/dumpster.gif",
        width: "30px",
        height: "30px",
        yoffset: 10
      }},
    {
      value: "playground #2",
      label: "playground2",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/playground2.png",
        width: "50px",
        height: "50px",
        yoffset: 4,
      }},
    {
      value: "playground #4",
      label: "playground4",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/playground4.png",
        width: "50px",
        height: "50px",
        yoffset: 3,
        angle: 30,
      }},
    {
      value: "picnic 1",
      label: "picnic1",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/picnic3.png",
        width: "50px",
        height: "50px",
        yoffset: 3,
        angle: 0,
      }},
    {
      value: "picnic 2",
      label: "picnic2",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/picnic4.png",
        width: "50px",
        height: "50px",
        yoffset: 3,
        angle: 0,
      }},
    {
      value: "cone 1",
      label: "cone1",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/cone1.png",
        width: "15px",
        height: "15px",
        yoffset: -3,
        angle: 0,
      }},
    {
      value: "bird 1",
      label: "bird1",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/birdright.gif",
        width: "25px",
        height: "25px",
        yoffset: -3,
        angle: 0,
      }},
    {
      value: "picnic 3",
      label: "picnic3",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/picnic2.png",
        width: "25px",
        height: "25px",
        yoffset: -3,
        angle: 30,
      }},
    {
      value: "soccer ball",
      label: "soccer",
      symbol: {
        type: "picture-marker",
        url: "assets/maybe/soccer.png",
        width: "25px",
        height: "25px",
        yoffset: -3,
        angle: 0,
      }},


  ]
}
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Assets Layer - value by AssetID
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var assetsLayer2 = new FeatureLayer({
    portalItem: {
      id: "5698df6506c74fd9b8c5ef6f5f43e090"
    },
    renderer: {
      type: "unique-value",
      field: "assetID",
      uniqueValueInfos: [
        {
          value: "Hoop #1",
          label: "hoop1",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/hoop2.png",
            width: "40px",
            height: "40px",
            yoffset: 2,
          }
        },
      {
          value: "Hoop #2",
          label: "hoop2",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/hoop1.png",
            width: "40px",
            height: "40px",
            yoffset: 16,
        }
      },
      {
          value: "Goal #1",
          label: "Soccer Goal!",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/goal1.png",
            width: "60px",
            height: "40px",
            yoffset: 0,
            angle: -90
        }
      },
      {
          value: "Goal #2",
          label: "Soccer Goal!",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/goal1.png",
            width: "60px",
            height: "40px",
            yoffset: 0,
            angle: 90
        }
      },
      {
          value: "Picnic #2",
          label: "Picnic Table!",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/picnic.png",
            width: "25px",
            height: "25px",
            yoffset: 0,
            xoffset: -10,
            angle: 85
        }
      },
      {
          value: "Picnic #3",
          label: "Picnic Table!",
          symbol: {
            type: "picture-marker",
            url: "assets/maybe/picnic2.png",
            width: "25px",
            height: "25px",
            yoffset: 18,
            xoffset: -26,
            angle: 75
        }
      },
      //{
      //I COULDNT GET THIS TO WORK AND I DID NOT WANT TO DO ALL THOSE BENCHES INDIVUALLY SO I GOT MAD AND MOVED ON
          //value: ["Bench #22", "Bench #25", "Bench #24", "Bench #23", "Bench #26", "Bench #27", "Bench #28", "Bench #29"],
         // value: ["Bench #22", "Bench #25"],
          //label: "Bench!",
         // symbol: {
          //  type: "picture-marker",
          //  url: "assets/maybe/benchhorizontal.png",
          //  width: "25px",
          //  height: "25px",
          //  yoffset: 0,
          //  xoffset: 0,
           // angle: 0
       // }
     // },

    ]
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Assets Layer - value by asset 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var assetsLayer = new FeatureLayer({
    portalItem: {
      id: "5698df6506c74fd9b8c5ef6f5f43e090"
    },
    renderer: {
      type: "unique-value",
      field: "asset",

      uniqueValueInfos: [
        {
          value: "Bench",
          label: "Bench!",
          symbol: {
            type: "simple-marker",
            style: "circle",
            size: 7,
            color: colors.darkBrown,
            outline: {
              color: "#20110f",
              width: 1,
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
            type: "picture-marker",
            url: "assets/maybe/swing.png",
            width: "40px",
            height: "24px",
            angle: 85,
            xoffset: 5
          }
        },
        {
          value: "Play Equipment",
          label: "Play Equipment",
          symbol: {
            type: "simple-marker",
            style: "circle",
            size: 0,
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
    detailsLayer,
    buildingLayer,
    DetailLines,
    assetsLayer,
    assetsLayer2,
  ]);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   set all the picture marker sizes @ zoom lvl 1&2
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var pictureMarkerLayers = [detailsLayer, assetsLayer2, assetsLayer];

var baseRenderers = pictureMarkerLayers.map(function (layer) {
  return layer.renderer && layer.renderer.clone
    ? layer.renderer.clone()
    : layer.renderer;
});
function scaleAllPictureMarkers(factor) {
  pictureMarkerLayers.forEach(function (layer, idx) {
    var baseRenderer = baseRenderers[idx];
    if (!layer || !baseRenderer) return;

    var r = baseRenderer.clone ? baseRenderer.clone() : baseRenderer;
    if (!r.uniqueValueInfos) {
      layer.renderer = r;
      return;
    }

    r.uniqueValueInfos.forEach(function (info) {
      var sym = info.symbol;
      if (!sym || sym.type !== "picture-marker") return;

      var w = sym.width;
      var h = sym.height;

      if (typeof w === "string") w = parseFloat(w);
      if (typeof h === "string") h = parseFloat(h);
      if (isNaN(w) || isNaN(h)) return;

      sym.width = w * factor;
      sym.height = h * factor;
    });

    layer.renderer = r;
  });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  View.when!!!! omg #@#!)@#)!@($!@(#)!@#__%$(%$#__>>>>))
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
view.when(function () {

   // ~~~~~~~~~~~~~~~~~~block esri default zooms and selection~~~~~~~~~~~~~~~~~~~~~~~
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
  event.stopPropagation();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Zoom button rules (+ lost button @ end)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var btn1 = document.getElementById("zoom1");
  var btn2 = document.getElementById("zoom2");
  var lostBtn = document.getElementById("lostBtn");

  if (btn1) {
    btn1.classList.add("active");
  }

    var homeCenter = view.center.clone(); //lost button = center

    var scaleOut = 1200; // button 1
    var scaleMid = 425; // button 2

function goToScale(scale) {
  view.goTo(
    { scale: scale },
    { animate: true }
  );
}

// Zoom button 1
if (btn1) {
  btn1.addEventListener("click", function () {
    goToScale(scaleOut);

    btn1.classList.add("active");
    if (btn2) btn2.classList.remove("active");

    // reset pics
    scaleAllPictureMarkers(1);
  });
}

// Zoom button 2
if (btn2) {
  btn2.addEventListener("click", function () {
    goToScale(scaleMid);

    if (btn1) btn1.classList.remove("active");
    btn2.classList.add("active");

    // make pics big
    var factor = 3.3;
    scaleAllPictureMarkers(factor);
  });
}

// lost button centers map
if (lostBtn) {
  lostBtn.addEventListener("click", function () {
    view.goTo(
      {
        center: homeCenter,
        scale: view.scale // keep current zoom level
      },
      {
        animate: true
      }
    );
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

      var w = sprayDiv.offsetWidth || 90;
      var h = sprayDiv.offsetHeight || 90;

      sprayDiv.style.left = (screenPoint.x - w / 2) + "px";
      sprayDiv.style.top = (screenPoint.y - h + 20) + "px";
    }

    view.watch("extent", updateSprayPos);
    view.watch("rotation", updateSprayPos);
    view.watch("zoom", updateSprayPos);

    updateSprayPos();
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   Googly Eyes !!!
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Comment panel popup + google form
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(function () {
  const btn = document.getElementById("commentpanelBtn");
  const overlay = document.getElementById("commentPanelOverlay");
  const closeBtn = document.getElementById("commentPanelClose");
  const form = document.getElementById("commentForm");
  const box = document.getElementById("commentMessage");
  const status = document.getElementById("commentStatus");

  const FORM_URL =
  "https://docs.google.com/forms/d/1MzcN6wR_s4q7xu4a0PLoYzULIDr7yqaWUIQrdROB6lY/formResponse";
  const ENTRY_ID = "entry.87422985";

  if (!btn || !overlay || !form || !box) return;

  // stat bubble
  function setStatus(message, type) {
    if (!status) return;

    status.textContent = message || "";

    status.classList.remove("status-ok", "status-error", "status-visible");

    if (message) {
      if (type === "ok") {
        status.classList.add("status-ok");
      } else if (type === "error") {
        status.classList.add("status-error");
      }
      status.classList.add("status-visible");

      setTimeout(() => {
        status.classList.remove("status-visible");
      }, 3500);
    }
  }

  // button opens window!
  btn.addEventListener("click", () => {
    overlay.classList.remove("comment-hidden");
    box.focus();
    setStatus("", null); // clear old msgs
  });

  // closes windoe
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.add("comment-hidden");
    });
  }

  // send
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = box.value.trim();
    if (!text) {
      setStatus("Hey! You didn't type anything!", "error");
      return;
    }

    const formData = new FormData();
    formData.append(ENTRY_ID, text);

    fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(() => {
        box.value = "";
        setStatus("Submitted! I'm really gonna read that!", "ok");
      })
      .catch(() => {
        setStatus("Something bad happened and it did not work :(", "error");
      });
  });
})();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Squick SOund!
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener("click", function (evt) {
  const tag = evt.target.tagName.toLowerCase();

  playSquick();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  MUTE BUTTON because its actually sooo annoying
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const muteBtn = document.getElementById("muteBtn");

if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;

    muteBtn.textContent = isMuted ? "unmute!" : "MUTE!!";

    muteBtn.style.backgroundColor = isMuted ? "#e0ad9e" : "#dcb98a";
  });
}
