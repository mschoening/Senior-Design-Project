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
		"https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/updatedconn/FeatureServer";

		// height-to-year ratio used by objects that grow from the time slider (how many meters of height for every year)
		growScale = 10
		
		// Z-Scaling Constant: for stretching height of everything in Z-Axis
		zScale = 10

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
			topSpheresLayer.renderer = generateTopSphereRender(value);
			topSpheresLayer.elevationInfo = generateSphereHeight(value);
			
		}
		
		/*************************************************
		 * Functions to automatically advance the slider
		 *************************************************/
		 
		//Function for automatically animating the slider
		var flag = 0;
		
		function animateSlider(){
			
			var slider = document.getElementById("myRange");
			var output = document.getElementById("curYear");
			
			var year = parseInt(slider.value);
			if (year + 1 > 2019){
				
				slider.value = "1900";
				output.innerHTML = 1900;
				setYear(1900);
			}
			else{
				year++;
				slider.value =  year.toString();
				output.innerHTML = year;
				setYear(year);
			}
			while (flag == 1){
				setTimeout(animateSlider(), 5000);
			}
			
		}
		
		attachEvent(window, 'load', function(){
			var idleTime = 10;
			var idleTimer;

			function resetIdleTimer(){
				clearTimeout(idleTimer)
				flag = 0;
				idleTimer = setTimeout(idleMode,idleTime*1000);
			}
			attachEvent(document.body,'mousemove', resetIdleTimer);
			attachEvent(document.body,'keydown',resetIdleTimer);
			attachEvent(document.body,'click',resetIdleTimer);
		
			resetIdleTimer();
		})
	
		function idleMode(){
			flag = 1;
			animateSlider();
			//setTimeout(animateSlider(), 5000);
			
		};



		function attachEvent(obj,evt,fnc,useCapture){
			if (obj.addEventListener){
				obj.addEventListener(evt,fnc,!!useCapture);
				return true;
			} 
			else if (obj.attachEvent){
				return obj.attachEvent("on"+evt,fnc);
			}
	
		}
		
		
		
		//Code for switching visibility of highlighted layers.
		
		function setDefaultHighlightLayer(){
			citiesLayer.visible = false;
			countiesLayer.visible = false;
		}
		
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
		
		
		//var test = document.getElementById("tstBtn").onclick= function(){
		//	animateSlider();
		//}
		
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
		
		/***********************************************************
		 *Functions for rendering the different layers on the map
		 **********************************************************/
      
		//Renderer for symbolizing mosques on time axis
		function generateRender(year){
			//var testOutput = document.getElementById("debugTxt");
			
			//Dwight: visualVariables.valueExpression must be a number! (no strings)
			var fieldPkr = "When($feature.CloseDate <= " + year + ",1, $feature.OpenDate <= " + year +" && $feature.CloseDate > " + year + ",2,  $feature.OpenDate > " + year + ", 3, 4)"; // need to change this to CDate and ODate when data is updated 		
			
			var growExp2 = "IIf (" + year + ">= $feature.CloseDate,$feature.Closedate-$feature.OpenDate,"+ year + "-$feature.OpenDate)*" + growScale * zScale; // need to change this to CDate and ODate when data is updated 
			//testOutput.innerHTML=String(growExp2);
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
					valueExpression: growExp2, 
					axis: "height",
					valueUnit: "meters"
				}, 
				//code that controls what color the mosques turn based on the time slider.
				{
					type: "color",
					valueExpression: fieldPkr,//change this to oDate when new data is done
					stops: [{
						value: 3,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 0
						}, 
					},
					{
						value: 2,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 1
						},
					},
					{
						value: 1,
						color: {
							r: 23,
							g: 173,
							b: 178,
							a: 0.5
						},
					},
					{
						value: 4,
						color: {
							r: 255,
							g: 102,
							b: 0,
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
		};
		
		//Function for generating the top spheres. 
		
		function generateTopSphereRender(year){
			var fieldPkr = "When($feature.CloseDate <= " + year + ",1, $feature.OpenDate <= " + year +" && $feature.CloseDate > " + year + ",2,  $feature.OpenDate > " + year + ", 3, 4)"; // need to change this to CDate and ODate when data is updated 		
			
			//testOutput.innerHTML=String(growExp2);
			return{
				type: "simple", // autocasts as new SimpleRenderer()
				symbol: {
					type: "point-3d", // autocasts as new PointSymbol3D()
					symbolLayers: [{
						type: "object", // autocasts as new ObjectSymbol3DLayer()
						resource: {
							primitive: "sphere"
						},			
						anchor: "bottom", // Dwight: Was 'Bottom', changed to 'bottom' (Threw error beforehand)
						width: 160
					}]
				},
				//signifies variables that can be changed via data
				visualVariables: [{
					type: "color",
					valueExpression: fieldPkr,
					stops: [{
						value: 3,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 0
						}, 
					},
					{
						value: 2,
						color: {
							r: 245,
							g: 41,
							b: 235,
							a: 1
						},
					},
					{
						value: 1,
						color: {
							r: 23,
							g: 173,
							b: 178,
							a: 0.5
						},
					},
					{
						value: 4,
						color: {
							r: 255,
							g: 102,
							b: 0,
							a: 1
						},
					}]
					
				}]
			}
		};
		
		//Function to generate top shpere height
		
		function generateSphereHeight(year){
			genHeight = "IIf (" + year + ">= $feature.CloseDate, ($feature.z * " + zScale + ") + (($feature.Closedate-$feature.OpenDate) * " + (growScale * zScale) + ") - 5, ($feature.z * " + zScale + " ) + (("+ year + "-$feature.OpenDate)*" + (growScale * zScale) + ") - 5)";
			return{
				
				mode: "relative-to-ground",
				featureExpressionInfo:{
					expression: genHeight
				}	
			}
		};
		
		//Function for generating connections layer.
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
					field: "StartDate",
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
		};
		
		//Renderer for the layer showing mosques on the surface.
		var mosquesSurfaceRenderer = {
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
		};
		
		//Renderer for the layer showing the county highlights. 
		var countiesRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "simple-fill", // autocasts as new PointSymbol3D()
				style: "solid",
				color:[
					48,
					50,
					92,
					0.5
				],
			}	
		};
		
		//Renderer for the layer showing the city highlights 
		var citiesRenderer = {
			type: "simple", // autocasts as new SimpleRenderer()
			symbol: {
				type: "simple-fill", // autocasts as new PointSymbol3D()
				style: "solid",
				color:[
					48,
					50,
					92,
					0.5
				],
			}	
		};
	  
	  /**************************************************
       * mosque popup template
       **************************************************/
		var mosqueTemplate = {
		 title:"{Name}",
		 content: "<b>Address:</b> {Address}<br>"+
		   "<b>Open Date:</b> {OpenDate}<br>"+
		   "<b>Close Date:</b> {CloseDate}<br>"+ 
		   "<b>Primary Ethnicity:</b> {PrimaryEthnicity}<br>"+
		   "<a href='ExpandedInfo.php?id={Link}' rel='modal:open'><button>Tap Here To Learn More</button></a>"
		 };


      /***********************************************************************
       * Code that sets up the layers with the previously defined renderers. 
       **********************************************************************/

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
					//expression: "Geometry($feature).z + $feature.z" //Dwight: Is Geometry() necessary?
					expression: "$feature.z * " + zScale
				}
			},
			unit: "meters"
		});
		
		//Layer for depecting top spheres. 
		var topSpheresLayer = new FeatureLayer({
			url: mosquesUrl,
			definitionExpression: "",
			outFields: ["*"],
			popupTemplate: mosqueTemplate,
			returnZ: true
		});
		
		// Layer for depecting county highlighting. 
		var countiesLayer = new FeatureLayer({
			url: countiesUrl,
			outFields: ["*"],
			renderer: countiesRenderer,	
		});
		
		// Layer for depecting city highlighting. 
		var citiesLayer = new FeatureLayer({
			url: citiesUrl,
			outFields: ["*"],
			renderer: citiesRenderer,
			
		});
		
		// Layer for depecting connections between mosques. 
		var connLayer = new FeatureLayer({
			url: connUrl,
			definitionExpression: "",
			outFields: ["*"],
			returnZ: true, 
			elevationInfo: {
				mode: "relative-to-ground",
				offset: 0,
				featureExpressionInfo: {
					expression: "$feature.z * " + zScale
				}
				
			},
			unit: "meters"
		});
		
		// Layer for depecting mosques on the ground. 
		var mosquesSurfaceLayer = new FeatureLayer({
			url: mosquesUrl,
			definitionExpression: "",
			outFields: ["*"],
			popupTemplate: mosqueTemplate,
			renderer: mosquesSurfaceRenderer,
			elevationInfo: {
				mode: "on-the-ground"
			}
		});

      /********************************************************************
       * Create a map with the above defined layers and a topographic
       * basemap
       ********************************************************************/
		var map = new Map({
			basemap: "dark-gray",
			layers: [MosquesLayer, countiesLayer, citiesLayer, connLayer, mosquesSurfaceLayer,topSpheresLayer],
			ground: {
				navigationConstraint: {
					type: "stay-above" //Dwight: Changed 'stayAbove' to 'stay-above' (threw error beforehand)
				}
			}
		});
		setYear(1900);
		setDefaultHighlightLayer();

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







