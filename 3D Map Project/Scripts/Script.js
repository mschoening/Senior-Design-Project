require([
	"esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Home"
    ], 
	function(Map, SceneView, FeatureLayer, Home) {

		var mosquesUrl =
        "https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/filtertest/FeatureServer";
		
		var countiesUrl =
		"https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/counties_v17a/FeatureServer"

		// sets extent to the area wanted
		var greaterDetroit = { // autocasts as new Extent()
			xmax:-9158073.232901145,
			xmin:-9424685.587559769,
			ymax:5372805.56336561,
			ymin:5125761.087947986,
			spatialReference: { // autocasts as new SpatialReference()
				wkid: 3857
			}
		};
	  
	 // var definitionExpressionMkr;
	  
	//function createFilter{
		
	//	var definitionExpressionMkr =""
		//var checkBoxes = document.getElementsByName("Filters");
		//for (var i = 0; i<checkBoxes.length; i++){
			//if(checkBoxes[i].checked == true){
			//	definitionExpressionMkr=definitionExpressionMkr+checkBoxes[i].value + " OR"
			//}
		//}
	  
     

      /**************************************************
       * Renderer for symbolizing mosques on time axis
       **************************************************/
		var mosquesRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "point-3d", // autocasts as new PointSymbol3D()
				symbolLayers: [{
					type: "object", // autocasts as new ObjectSymbol3DLayer()
					resource: {
						primitive: "cylinder"
					},
					material: {
						color: "red"
					},			
					anchor: "bottom", //Dwight: Was 'Bottom', changed to 'bottom' (Threw error beforehand)
					width: 20
				}]
			},
		//signifies variables that can be changed via data
			visualVariables: [{
				type: "size",
				field: "TimeOpen",
				axis: "height",
				valueUnit: "meters"
			}, 
			{
				type: "color",
				field: "CloseDate",
				stops: [{
					value: 2018,
					color: {
						r: 245,
						g: 41,
						b: 235,
						a: 1
					}
				},
				{
					value: 1970,
					color: {
						r: 245,
						g: 41,
						b: 235,
						a: 1
					},
				}]
			},
		
			{
				type: "size",
				axis: "width",
				useSymbolValue: true // sets the width
			}]
		};
		//var countiesRenderer = {
			
		//}
	  
	  /**************************************************
       * mosque popup template
       **************************************************/
		var mosqueTemplate = {
		 title:"{Name}",
		 content: "<b>Address:</b> {Address}<br>"+
		   "<b>Open Date:</b> {OpenDate}<br>"+
		   "<b>Close Date:</b> {CloseDate}<br>"+ 
		   "<b>Primary Ethnicity:</b> {PrimaryEthnicity}<br>"+
		   "<button id={Link} type='button'>Click Here To Learn More</button><br>"
		 };

      /**************************************************
       * Layers depicting mosques
       **************************************************/

      // Layer for depicting mosques on time axis
		var MosquesLayer = new FeatureLayer({
			url: mosquesUrl,
			definitionExpression: "PrimaryEthnicity='Arab' OR PrimaryEthnicity='African American' ",
			outFields: ["*"],
			popupTemplate: mosqueTemplate,
			renderer: mosquesRenderer,
			returnZ: true,
			elevationInfo: {
				mode: "relative-to-ground",
				featureExpressionInfo:{
					expression: "Geometry($feature).z + $feature.z"
				}
			},
			unit: "meters"
		});   
		
		/*var countiesLayer = new FeatureLayer({
			url: countiesUrl,
			outFields["*"],
			renderer: countiesRenderer,
			
		});*/

      /********************************************************************
       * Create a map with the above defined layers and a topographic
       * basemap
       ********************************************************************/
		var map = new Map({
			basemap: "topo",
			layers: [MosquesLayer],
			ground: {
				navigationConstraint: {
					type: "stay-above" //Dwight: Changed 'stayAbove' to 'stay-above' (threw error beforehand)
				}
			}
		});

      /********************************************************************
       * Create a local scene 
       ********************************************************************/
		var view = new SceneView({
			container: "viewDiv",
			map: map,
			// Indicates to create a local scene
			viewingMode: "local",
			clippingArea: greaterDetroit,
			extent: greaterDetroit,
			environment: {
				atmosphere: null,
				starsEnabled: false
			}
		});


      // Set up a home button for resetting the viewpoint to the intial extent
		var homeBtn = new Home({
			view: view
		}, "homeDiv");
	}
);