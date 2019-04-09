var year;
var animation = null;
var prevRand;
var randCamIdle;
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
        "https://services9.arcgis.com/DC7lz0T9RX9VsXbK/arcgis/rest/services/finalsorteddata/FeatureServer";
		
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
		
		
		/*******************************************************
		 * Functions for traversing across the map in idle mode*
		 *******************************************************/
		
		//different cammera views that will iterate through the map. 
		
		//camera position 1
		function cam1(){				
			view.goTo(
			{
				position: {
					x: -82.920330, // longitude
					y: 42.220230, //latitude
					z: 16000, // height of the camera in meters
				},
				heading: -45, //position of the camera
				tilt: 70 // the degree the camera is tilted
			},			
			{
			speedFactor: 1.0,
			easing: "linear"
			});
		}
		
		//camera position 2
		function cam2(){
			view.goTo(
			{
				position: {
					x: -83.156695,
					y: 42.681704,
					z: 16000,
				},
				heading: 180,
				tilt: 70
			},			
			{
			speedFactor: 1.0,
			easing: "linear"
			});
		}
		
		//camera position 3
		function cam3(){                
            view.goTo(
            {
                position: {
                    x: -82.952076, // longitude
                    y: 42.551539, //latitude
                    z: 16000, // height of the camera in meters
                },
                heading: 225, //position of the camera
                tilt: 70 // the degree the camera is tilted
            },            
            {
            speedFactor: 2.0,
            easing: "linear"
            });
        }
		
		//camera position 4
		function cam4(){                
			view.goTo(
            {
                position: {
                    x: -83.166321, // longitude
                    y: 42.606604, //latitude
                    z: 16000, // height of the camera in meters
                },
                heading: 180, //position of the camera
                tilt: 70 // the degree the camera is tilted
            },            
            {
            speedFactor: 2.0,
            easing: "linear"
            });
        }
		
		//camera position 5
		function cam5(){                
			view.goTo(
            {
                position: {
                    x: -83.342158, // longitude
                    y: 42.550726, //latitude
                    z: 16000, // height of the camera in meters
                },
                heading: 135, //position of the camera
                tilt: 70 // the degree the camera is tilted
            },            
            {
            speedFactor: 2.0,
            easing: "linear"
            });
        }
		
		//camera position 6
		function cam6(){                
            view.goTo(
            {
                position: {
                    x: -83.422176, // longitude
                    y: 42.415132, //latitude
                    z: 16000, // height of the camera in meters
                },
                heading: 90, //position of the camera
                tilt: 70 // the degree the camera is tilted
            },            
            {
            speedFactor: 2.0,
            easing: "linear"
            });
        }
		
		//camera position 7
		function cam7(){                
             view.goTo(
            {
                position: {
                    x: -83.336255, // longitude
                    y: 42.280141, //latitude
                    z: 16000, // height of the camera in meters
                },
                heading: 45, //position of the camera
                tilt: 70 // the degree the camera is tilted
            },            
            {
            speedFactor: 2.0,
            easing: "linear"
            });
        }
		
		//camera position 8
		function cam8(){                
            view.goTo(
            {
                position: {
                    x: -83.133262, // longitude
                    y: 42.220915, //latitude
                    z: 16000, // height of the camera in meters
                },
                heading: 0, //position of the camera
                tilt: 70 // the degree the camera is tilted
            },            
            {
            speedFactor: 2.0,
            easing: "linear"
            });
        }
		
		//camera position 9
		function cam9(){
			view.goTo(
			{
				position: {
					x: -82.920330,
					y: 42.220230,
					z: 16000,
				},
				heading: -45,
				tilt: 70
			},			
			{
			speedFactor: 1.0,
			easing: "linear"
			});
		}
		
		//camera position 10
		function cam10(){
			view.goTo(
			{
				position: {
					x: -82.920330,
					y: 42.220230,
					z: 16000,
				},
				heading: -45,
				tilt: 70
			},			
			{
			speedFactor: 1.0,
			easing: "linear"
			});
		}
		
		//Code for randomly jumping to a camera postition. 
		function randCam(){
			
			var random = Math.floor(Math.random() * 10)+1;
			if (random == prevRand){
				randCam();
			}
			else{
				prevRand = random
				
				switch (random){
				case 1:
					cam1();
					break;
				case 2:
					cam2();
					break;
				case 3:
					cam3();
					break;
				case 4:
					cam4();
					break;
				case 5:
					cam5();
					break;
				case 6:
					cam6();
					break;
				case 7:
					cam7();
					break;
				case 8:
					cam8();
					break;
				case 9:
					cam9();
					break;
				case 10:
					cam10();
					break;
				default:
					break;
				}
			}
			
		}
		
		
		
		//test button for debugging 
		var test = document.getElementById("tstBtn").onclick= function(){
			randCam();
		}
		
		
		/***************************************************************
		 * Functions to automatically animate the map during idle mode.*
		 ***************************************************************/
		 
		//Function for automatically animating the map slider		
		function animateSlider(value){
			
			var slider = document.getElementById("myRange");
			var output = document.getElementById("curYear");
			
			output.innerHTML = Math.floor(value);
			slider.value = Math.floor(value);
			
			MosquesLayer.renderer = generateRender(value);
			connLayer.renderer = generateConnRender(value);
			topSpheresLayer.renderer = generateTopSphereRender(value);
			topSpheresLayer.elevationInfo = generateSphereHeight(value);
		}
		
		//Function to set up the inactivity listeners. 	
		function setInactivityListeners(){
			this.addEventListener("mousemove", resetInactivityTimer, false);
			this.addEventListener("mousedown", resetInactivityTimer, false);
			this.addEventListener("keypress", resetInactivityTimer, false);
			this.addEventListener("DOMMouseScroll", resetInactivityTimer, false);
			this.addEventListener("mousewheel", resetInactivityTimer, false);
			this.addEventListener("touchmove", resetInactivityTimer, false);
			this.addEventListener("MSPointerMove", resetInactivityTimer, false);
			
			startInactivityTimer();
		}
		
		setInactivityListeners();
		
		//Function to start the inactivity timer
		function startInactivityTimer(){
			timeoutID = window.setTimeout(goInactive, 5000);
		}
		
		//Function to reset the inactivity timer
		function resetInactivityTimer(e){
			window.clearTimeout(timeoutID);
			goActive();
			
		}
		
		//Function to start the idle mode. Resets the filters any selected highlight layer. 
		function goInactive(){
			setDefaultHighlightLayer();
			setDefaultConnVisibility();
			resetFilters();
			startMapAnimation();			
		}
		
		//Function to stop the idle mode
		function goActive(){
			stopMapAnimation();
			startInactivityTimer();
		}
		
		//Function to start the map animation
		function startMapAnimation(){
			var slider = document.getElementById("myRange");
			
			randCam(); //call random cam to start
			
			stopMapAnimation();
			animation = animateMap(parseInt(slider.value));
			randCamIdle = window.setInterval(function(){randCam();},10000);//set interval for the random cam function. 
			
		}
		//Function to stop the map animation 
		function stopMapAnimation(){
			if(!animation){
				return;
			}
			window.clearInterval(randCamIdle);//clear interval for random cam function. 
			animation.remove();
			animation = null;
		}
		
		//Function to make the map animation fluid
		function animateMap(startYear){
			var animating = true; 
			var yrVal = startYear;
			
			var frame = function(timestamp){
				if(!animating){
					return;
				}
				yrVal += 0.5;
				if(yrVal > 2019){
					yrVal = 1900;
				}
				animateSlider(yrVal);
				
				setTimeout(function(){
					requestAnimationFrame(frame);
				}, 1000/30);
			};
			frame();
			return{
				remove: function(){
					animating = false;
				}
			};	
		}
		
		/*******************************************
		 * Code for switching visibility of layers *
		 *******************************************/
		
		//Code for switching visibility of highlighted layers.
		
		function setDefaultHighlightLayer(){
			citiesLayer.visible = false;
			countiesLayer.visible = false;
			document.getElementById("Type1").checked = true;
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
		
		//Code for switching visibility of layers
		
		function setDefaultConnVisibility(){
			document.getElementById("toggleConnLayer").checked = true;
			connLayer.visible = true;
		}
		
		var connectionVisibility = document.getElementById("toggleConnLayer").onclick= function(){
			if (document.getElementById("toggleConnLayer").checked == true){
				connLayer.visible = true;
			}
			else{
				connLayer.visible = false;
			}
		}
		
		
		
		/***********************************************************************
		 *Functions to build the varrious expressions for filtering the map. 
		 ***********************************************************************/
		 
		//function and button for filtering by ethnicity 
		function EthnicityExpressionBuilder(){
			var checks = document.getElementsByName("eFilters");
			var expr ='hasAllFeatures = 1';
			var flag = 0;
			for (i=0; i<4; i++){
				if (checks[i].checked===true){
					if (flag == 0){
						expr += " AND PrimaryEthnicity="+ "'"+checks[i].value + "'";
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
			topSpheresLayer.definitionExpression = EthnicityExpressionBuilder();
		}
		
		//function and button for filtering by city 
		function CityExpressionBuilder(){
			var checks = document.getElementsByName("cFilters");
			var expr ='hasAllFeatures = 1';
			var flag = 0;
			for (i=0; i<4; i++){
				if (checks[i].checked===true){
					if (flag == 0){
						expr += " AND City="+ "'"+checks[i].value + "'";
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
			topSpheresLayer.definitionExpression = CityExpressionBuilder();
		}
		
		//function and button for filtering by county 
		function CountyExpressionBuilder(){
			var checks = document.getElementsByName("CoFilters");
			var expr ='hasAllFeatures = 1';
			var flag = 0;
			for (i=0; i<4; i++){
				if (checks[i].checked===true){
					if (flag == 0){
						expr += " AND County="+ "'"+checks[i].value + "'";
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
			topSpheresLayer.definitionExpression = CountyExpressionBuilder();
		}
		
		//function to reset the filters for use in idle mode. 
		function resetFilters(){
			MosquesLayer.definitionExpression = 'hasAllFeatures = 1';
			topSpheresLayer.definitionExpression = 'hasAllFeatures = 1';
		}
		
		/***********************************************************
		 *Functions for rendering the different layers on the map
		 **********************************************************/
      
		//Renderer for symbolizing mosques on time axis
		function generateRender(year){
			//var testOutput = document.getElementById("debugTxt");
			
			//Dwight: visualVariables.valueExpression must be a number! (no strings)
			var fieldPkr = "When($feature.Cdate <= " + year + ",1, $feature.Odate <= " + year +" && $feature.Cdate > " + year + ",2,  $feature.Odate > " + year + ", 3, 4)"; // need to change this to CDate and ODate when data is updated 		
			
			var growExp2 = "IIf (" + year + ">= $feature.Cdate,$feature.Closedate-$feature.Odate,"+ year + "-$feature.Odate)*" + growScale * zScale; // need to change this to CDate and ODate when data is updated 
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
							r: 38,
							g: 196,
							b: 165,
							a: 1
						},
					},
					{
						value: 1,
						color: {
							r: 224,
							g: 35,
							b: 48,
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
			var fieldPkr = "When($feature.Cdate <= " + year + ",1, $feature.Odate <= " + year +" && $feature.Cdate > " + year + ",2,  $feature.Odate > " + year + ", 3, 4)"; // need to change this to CDate and ODate when data is updated 		
			
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
							r: 38,
							g: 196,
							b: 165,
							a: 1
						},
					},
					{
						value: 1,
						color: {
							r: 224,
							g: 35,
							b: 48,
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
			genHeight = "IIf (" + year + ">= $feature.Cdate, ($feature.z * " + zScale + ") + (($feature.Closedate-$feature.Odate) * " + (growScale * zScale) + ") - 5, ($feature.z * " + zScale + " ) + (("+ year + "-$feature.Odate)*" + (growScale * zScale) + ") - 5)";
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
							r: 96,
							g: 43,
							b: 175,
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
					120,
					62,
					46,
					0.3
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
					120,
					62,
					46,
					0.3
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
			definitionExpression: "hasAllFeatures = 1",
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
			definitionExpression: "hasAllFeatures = 1",
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
				outFields: ["Name","Address","OpenDate","CloseDate","PrimaryEthnicity","Link"],
				name: "sampleName",
				placeholder: "Search",
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







