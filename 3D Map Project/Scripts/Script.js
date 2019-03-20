var year;
require([
	"esri/Map",
	"esri/Graphic",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Home",
	"esri/widgets/Search",
	"esri/geometry/Polyline",
	"esri/symbols/LineSymbol3D",
	"esri/symbols/PathSymbol3DLayer"
    ], 
	function(Map, Graphic, SceneView, FeatureLayer, Home, Search, Polyline, LineSymbol3D, PathSymbol3DLayer) {

		var mosquesUrl =
        "https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/filtertest/FeatureServer";
		
		var countiesUrl =
		"https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/counties_v17a/FeatureServer";
		
		var citiesUrl =
		"https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/cities_townships/FeatureServer";
		
		var connUrl = 
		"https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/pathstest/FeatureServer";

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
		
		//Slider handler calls a new renderer every time slider is moved
		var slider = document.getElementById("myRange");
		slider.addEventListener("input", inputHandler);
				
		function inputHandler(){
			setYear(parseInt(slider.value));	
		}
		
		function setYear(value){
			MosquesLayer.renderer = generateRender(value);
			connLayer.renderer = generateConnRender(value);
		}
		
		
		
		
		//Code for switching visibility of highlighted layers. 
		
		var defaultMapView = document.getElementById("Type1").onclick= function(){
			citiesLayer.visible = false;
			countiesLayer.visible = false;
		}
		var countiesMapView = document.getElementById("Type2").onclick= function(){
			citiesLayer.visible = false;
			countiesLayer.visible = true;
		}
		var citiesMapView = document.getElementById("Type3").onclick= function(){
			citiesLayer.visible = true;
			countiesLayer.visible = false;
		}
		
		
		/***********************************************************************
		 *Functions to build the varrious expressions for filtering the map. 
		 ***********************************************************************/
		 
		//function and button for filtering by ethnicity 
		function EthnicityExpressionBuilder(){
			var checks = document.getElementsByName("eFilters");
			var expr ='';
			var flag = 0;
			for (i=0; i<4; i++){
				if (checks[i].checked===true){
					if (flag == 0){
						expr += "PrimaryEthnicity="+ "'"+checks[i].value + "'";
						flag = 1;
					}
					else{
						expr += " OR " +"PrimaryEthnicity="+ "'"+checks[i].value + "'";
					}
				}
			}
			return expr;
		}
		
		var ethnicityFltrBtn = document.getElementById("ethnicityFtlrBtn").onclick= function(){
			MosquesLayer.definitionExpression = EthnicityExpressionBuilder();
		}
		
		//function and button for filtering by city 
		function CityExpressionBuilder(){
			var checks = document.getElementsByName("cFilters");
			var expr ='';
			var flag = 0;
			for (i=0; i<4; i++){
				if (checks[i].checked===true){
					if (flag == 0){
						expr += "City="+ "'"+checks[i].value + "'";
						flag = 1;
					}
					else{
						expr += " OR " +"City="+ "'"+checks[i].value + "'";
					}
				}
			}
			return expr;
		}
		
		var cityFltrBtn = document.getElementById("cityFtlrBtn").onclick= function(){
			MosquesLayer.definitionExpression = CityExpressionBuilder();
		}
		
		//function and button for filtering by county 
		function CountyExpressionBuilder(){
			var checks = document.getElementsByName("CoFilters");
			var expr ='';
			var flag = 0;
			for (i=0; i<4; i++){
				if (checks[i].checked===true){
					if (flag == 0){
						expr += "County="+ "'"+checks[i].value + "'";
						flag = 1;
					}
					else{
						expr += " OR " +"County="+ "'"+checks[i].value + "'";
					}
				}
			}
			return expr;
		}
		
		var countyFltrBtn = document.getElementById("countyFtlrBtn").onclick= function(){
			MosquesLayer.definitionExpression = CountyExpressionBuilder();
		}
		
		
      /**************************************************
       * Renderer for symbolizing mosques on time axis
       **************************************************/
		function generateRender(year){
			//var testOutput = document.getElementById("hlModeLbl");
			
			var growExp = "return (" + year + "-$feature.OpenDate)*10";
			//testOutput.innerHTML=String(growExp);
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
						anchor: "bottom", // Dwight: Was 'Bottom', changed to 'bottom' (Threw error beforehand)
						width: 60
					}]
				},
		//signifies variables that can be changed via data
				visualVariables: [{
					type: "size",
					valueExpression: growExp,
					//valueExpression: "When($feature.CloseDate<year, ($feature.CloseDate-$feature.OpenDate)*10, $feature.CloseDate>year,(year-$feature.OpenDate)*10)", expression for calculating height based on open date and close date
					axis: "height",
					valueUnit: "meters"
				}, 
				{
					type: "color",
					field: "OpenDate",
					stops: [{
						value: year-1,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 1
						}
					},
					{
						value: year+1,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 0
						},
					}]
				},
		
				{
					type: "size",
					axis: "width",
					useSymbolValue: true // sets the width
				}]
			}
		};
		
		/***************************************
		* Function for generating connections. *
		****************************************/
		function generateConnRender(year){
			
			return {
				type: "simple",
				symbol: {
					type: "line-3d",
					symbolLayers: [{
						type: "path",
						size: 50,
						material:{
							color: "red"
						}
					}]
				},
				visualVariables: [{
					type: "color",
					field: "ConYear",
					stops: [{
						value: year-1,
						color: {
							r: 255,
							g: 0,
							b: 0,
							a: 1,
						}
					},
					{
						value: year+1,
						color: {
							r: 255,
							g: 0,
							b: 0,
							a: 0,
						}
					}]
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
		
		var countiesRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "simple-fill", // autocasts as new PointSymbol3D()
				style: "solid",
				color:[
					48,
					50,
					92,
					.5
				],
			}	
		}
		var citiesRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "simple-fill", // autocasts as new PointSymbol3D()
				style: "solid",
				color:[
					48,
					50,
					92,
					.5
				],
			}	
		}
	  
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
			returnZ: true,
			elevationInfo: {
				mode: "relative-to-ground",
				featureExpressionInfo:{
					expression: "Geometry($feature).z + $feature.z"
				}
			},
			unit: "meters"
		});   
		
		var countiesLayer = new FeatureLayer({
			url: countiesUrl,
			outFields: ["*"],
			renderer: countiesRenderer,	
		});
		
		var citiesLayer = new FeatureLayer({
			url: citiesUrl,
			outFields: ["*"],
			renderer: citiesRenderer,
			
		});
		
		var connLayer = new FeatureLayer({
			url: connUrl,
			definitionExpression: "",
			outFields: ["*"],
			returnZ: true, 
			elevationInfo: {
				mode: "relative-to-ground",
				offset: 0,
				featureExpressionInfo: {
					expression: "$feature.z"
				}
				
			},
			unit: "meters"
		});

      /********************************************************************
       * Create a map with the above defined layers and a topographic
       * basemap
       ********************************************************************/
		var map = new Map({
			basemap: "dark-gray",
			layers: [MosquesLayer, countiesLayer, citiesLayer, connLayer],
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
		
		// Search bar implementation
		
		var searchWidget = new Search({
			view: view,
			searchAllEnabled: false,
			locationEnabled: false,
			includeDefaultSources: false,
			popupEnabled: true,
			sources:[{
				featureLayer:{
					url: mosquesUrl,
					popupTemplate: mosqueTemplate,
				},
				searchFields:["Name","Address"],
				displayField: "Name",
				exactMatch: false,
				outFields: ["Name","Address","OpenDate","CloseDate","PrimaryEthnicity","link"],
				name: "sampleName",
				placeholder: "exampletxt",
			}]
		}, SearchTB);
		
	}
);

/*****************************************
 *Functions used in the html document. 
 *****************************************/


//function for switching inbetween the tab content
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

//function for switching between filter options. 
function setForm(val){
	if(val == 'cityFtlr'){
		document.getElementById('cityFtlrDiv').style='display: block;';
		document.getElementById('countyFtlrDiv').style='display: none;';
		document.getElementById('prEtFtlrDiv').style='display: none;';
	}
	else if (val == 'countyFtlr'){
		document.getElementById('cityFtlrDiv').style='display: none;';
		document.getElementById('countyFtlrDiv').style='display: block;';
		document.getElementById('prEtFtlrDiv').style='display: none;';
	}
	else{
		document.getElementById('cityFtlrDiv').style='display: none;';
		document.getElementById('countyFtlrDiv').style='display: none;';
		document.getElementById('prEtFtlrDiv').style='display: block;';
	}
};



//function for updating time slider year label 
function updateYear(){
	var slider = document.getElementById("myRange");
	var output = document.getElementById("curYear");
	year = parseInt(slider.value);
	output.innerHTML = year;
	//setYear(year);
};

