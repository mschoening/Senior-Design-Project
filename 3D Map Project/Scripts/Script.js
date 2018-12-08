var year;

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
		var slider = document.getElementById("myRange");
		slider.addEventListener("input", inputHandler);
		//slider.addEventListener("change", inputHandler);
		//var output = document.getElementById("curYear");
		
		function inputHandler(){
			setYear(parseInt(slider.value));
		}
		
		function setYear(value){
			MosquesLayer.renderer = generateRender(value);
		}
		
      /**************************************************
       * Renderer for symbolizing mosques on time axis
       **************************************************/
		function generateRender(year){
			return{
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
						value: year-1,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 0.1
						}
					},
					{
						value: year+1,
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
			}
		}
		/*var mosquesSurfaceRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "point-3d", // autocasts as new PointSymbol3D()
				symbolLayers: [{
					type: "icon", // autocasts as new IconSymbol3DLayer()
					material: {
					color: "#785226"
					},
					resource: {
						primitive: "x"
					},
					size: 4
				}]
			}
		};*/
		/*var countiesRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "esriSFS", // autocasts as new PointSymbol3D()
				style: "esriSFSSolid",
				color: "red",
				outline: 
				{
					type: "esriSLS",
					style: "esriSFSSolid"
				}
				
		}*/
	  
	  /**************************************************
       * mosque popup template
       **************************************************/
		var mosqueTemplate = {
		 title:"{Name}",
		 content: "<b>Address:</b> {Address}<br>"+
		   "<b>Open Date:</b> {OpenDate}<br>"+
		   "<b>Close Date:</b> {CloseDate}<br>"+ 
		   "<b>Primary Ethnicity:</b> {PrimaryEthnicity}<br>"+
		   "<a href={Link} rel='modal:open'>Click Here To Learn More</a>"
		 };

      /**************************************************
       * Layers depicting mosques
       **************************************************/

      // Layer for depicting mosques on time axis
		var MosquesLayer = new FeatureLayer({
			url: mosquesUrl,
			definitionExpression: "",
			outFields: ["*"],
			popupTemplate: mosqueTemplate,
			//renderer: generateRender(year),
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
			basemap: "dark-gray",
			layers: [MosquesLayer],
			ground: {
				navigationConstraint: {
					type: "stay-above" //Dwight: Changed 'stayAbove' to 'stay-above' (threw error beforehand)
				}
			}
		});
		setYear(1900);

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


function openTab(evt, tName){
	var i, tabcontent, tablinks; 
	
// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tName).style.display = "block";
	evt.currentTarget.className += " active";
};



function updateYear(){
	var slider = document.getElementById("myRange");
	var output = document.getElementById("curYear");
	year = parseInt(slider.value);
	output.innerHTML = year;
	//setYear(year);
};

