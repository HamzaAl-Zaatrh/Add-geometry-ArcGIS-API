var map;
var home;
var point;
var toolbar;
require([
  "esri/map",
  "esri/toolbars/draw",
  "esri/dijit/HomeButton",
  "esri/graphic",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "dojo/domReady!",
], function (
  Map,
  Draw,
  HomeButton,
  Graphic,
  PictureMarkerSymbol,
  SimpleLineSymbol,
  SimpleFillSymbol
) {
  // Create a map ==========================
  map = new Map("map", {
    basemap: "streets",
    center: [36, 31],
    zoom: 7,
  });

  map.on("load", createToolbar);
  // createToolbar();

  function createToolbar() {
    toolbar = new Draw(map);
    toolbar.on("draw-complete", addToMap);
  }

  document.getElementById("addPoint").onclick = function () {
    toolbar.activate(Draw.POINT);
    map.hideZoomSlider();
  };

  document.getElementById("addLine").onclick = function () {
    toolbar.activate(Draw.LINE);
    map.hideZoomSlider();
  };

  document.getElementById("addPolygon").onclick = function () {
    toolbar.activate(Draw.POLYGON);
    map.hideZoomSlider();
  };

  function addToMap(evt) {
    toolbar.deactivate();
    map.showZoomSlider();

    switch (evt.geometry.type) {
      case "point":
        var symbol = new PictureMarkerSymbol();
        symbol.setHeight(35);
        symbol.setWidth(35);
        symbol.setUrl(
          "https://drive.google.com/uc?export=view&id=1r_ZB5_5ti3rUmw55PicbHBW1B-eF39-l"
        );
        break;
      case "polyline":
        symbol = new SimpleLineSymbol();
        break;
      default:
        symbol = new SimpleFillSymbol();
        break;
    }

    var graphic = new Graphic(evt.geometry, symbol);
    map.graphics.add(graphic);
  }

  // add Home Button =======================
  home = new HomeButton(
    {
      map: map,
    },
    "HomeButton"
  );
  home.startup();
});
