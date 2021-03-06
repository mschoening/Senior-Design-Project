/*
*
*	Programmer: Lukasz Czerwinski | luki2p@gmail.com
*   ===============================================================
*   Copyright (c) 2014 Lukasz Czerwinski 
*   ===============================================================
*	FLICKR GALLERY | JQUERY 1.9+ & FLICKR API
*	 
*/
(function ($) {
    /* Global variables */
    var prty, flickr;
    
	$.fn.flickrGallery = function(settings) {
		//Defaults settings  
		 var opts = $.extend({}, prty.settings, settings);  
         //Setup
         prty.Setup($(this), opts); 
	}; //End FN    
    
	//Basic arrays
	prty = { 
        //Default settings 
        settings: { 
            //FLICKR API KEY
            Key: 'e8f44bcb8c59ff404359a1c1c81eaa9b',
            //Secret
            Secret: 'cd3ec65b7f44fc04',
            //FLICKR user ID
            User: '21853641@N03',
            //Flickr PhotoSet ID
            PhotoSet: photo_id, //Dwight: defined in 'ExpandedInfo.php' with inline JS
            /*-- VIEWBOX SETTINGS --*/ 
			Speed		: 400,		//Speed of animations
            navigation	: 1,		//(true) Navigation (arrows)
			keyboard	: 1,		//(true) Keyboard navigation 
			numberEl	: 1 		//(true) Number elements
        },
        //Array with photos and details
        photoDetails: [],
        //Active element
        activeEl: 0,
        //Background thumbs
        bgThumb: '',
		/*  define basic elements */  
        //Content of thumbs
        thumbTitle: '',
        //Plus icon of items
        plusIcon: '',
        //Thumb of items
        thumb: '',
        //Gallery div
        galleryDiv: '', 
        //VievBox div
        vbDiv: '', 
        //Close ViewBox
        closeBtn: '',
        //Next ViewBox
        nextBtn: '',
        //Prevous ViewBox
        prevBtn: '',
        //resize ViewBox
        resizeBtn: '',
        //Title ViewBox
        titleViewBox: '',
        //Panel ViewBox
        panelViewBox: '',
        //Preloader 
        loader: '',
        //Content ViewBox
        cntViewBox: '',
        //Div with details of photo
        vbDetails: '',
        vbDetailsBottom: 10,
        //Height and Widht of window browser
        browserSize: '', 
        /* FUNCTIONS */
        Setup: function(gDiv, settings) {
            //Select the gallery div 
            prty.galleryDiv = gDiv.append('<ul class="entries-columns"></ul>').find('ul');
            flickr = new Flickr({
                api_key: settings.Key 
            });
            //Get the tree of sets
            flickr.photosets.getPhotos({
                photoset_id: settings.PhotoSet,
                extras: 'url_o, url_m, owner_name, views, date_upload'
            }, function(err, results){ 
                if(!err) {
                //Get the image datas and declare basic variables
                var photoSet = results.photoset;  
                    //Get photo info 
                    prty.photoDetails = photoSet.photo;
                    //Build the gallery structure/
                    prty.buildThumb();
                    ////////////////////////////////////
                    //Click the items and initialize ViewBox
                    prty.thumb.on('click', function(e){
                        //Stop link
                        e.preventDefault(); 
                        //Initialize ViewBox
                        prty.setupViewBox($(this), settings);
                    });
                } else {
                    console.log(err);
                }
            });
        },  
        //Build HTML structure of the thumb
        buildThumb: function() { 
            var thisItem, img;
            //Build ala-each fn 
            for(var i=0; i < prty.photoDetails.length; i++){
                img = prty.photoDetails[i];
                thisItem = prty.galleryDiv.append("<li id="+i+"><a href='"+img.url_o+"'><img src='"+img.url_m+"' alt='"+img.title+"' /><div class='bg'></div><div class='content'></div><i class='show' data-href='"+img.url_o+"' data-photoid='"+img.id+"'>VIEW IT</i></a></li>").find('li .content').last();
                //Check title and add it
                if(img.title !== "") {
                    thisItem.append("<h4>"+img.title+"</h4>");
                }  
            } //End ala-each fn 
            //Show item if ready
            prty.galleryDiv.find('li img').on('load', function(){
                $(this).parents('li').animate({
                    opacity: 1.0
                }, 255);
            });
            //Set thumb elements
            prty.bgThumb = prty.galleryDiv.find('.bg');
            prty.plusIcon = prty.galleryDiv.find('.show');
            prty.thumbTitle = prty.galleryDiv.find('li .content');
            prty.thumb = prty.galleryDiv.find('li');
                    //Support for mouse events
                    prty.mouseEvents();
        },
        //Mouse events
        mouseEvents: function(){
            var currentPlus = prty.plusIcon.first().css('top'),
                currentTitle = prty.thumbTitle.first().css('top');
            },
        /*-- VIEWBOX --*/
        setupViewBox: function(el, settings){
            //Set the active element by id
            prty.activeEl = el.attr('id'); 
            //Build ViewBox Structure and animate it
            prty.viewBoxHTML(settings);
            prty.viewBoxStart(settings);
        },
        //ViewBox structure
        viewBoxHTML: function(settings) {
            $('body').append('<div class="viewbox"><div class="panel"><h3>Title of Picture</h3><a href="#" class="resize icon"></a><a href="#" class="close icon"></a></div><div class="media_c"></div><div class="details"></div><div class="loader"></div></div>');
            //Define ViewBox elements
            prty.vbDiv = $('.viewbox');
            //Check navigation
            if(settings.navigation) {
                //Add arrows
                prty.vbDiv.append('<a href="#" class="prev icon"></a><a href="#" class="next icon"></a>');
            }
                //Set the elements
                prty.panelViewBox = prty.vbDiv.find('.panel');
                prty.titleViewBox = prty.vbDiv.find('h3');
                prty.closeBtn = prty.vbDiv.find('.close');
                prty.resizeBtn = prty.vbDiv.find('.resize');
                prty.loader = prty.vbDiv.find('.loader');
                prty.cntViewBox = prty.vbDiv.find('.media_c');
                prty.nextBtn = prty.vbDiv.find('.next');
                prty.prevBtn = prty.vbDiv.find('.prev');
                prty.vbDetails = prty.vbDiv.find('.details');
                prty.vbDetailsBottom = prty.vbDetails.css('bottom');
                //Check if is number 
                if(settings.numberEl){
                    //Add number place 
                    prty.numberDiv = prty.panelViewBox.prepend('<div class="number"></div>').find('.number');
                }
        },
        //Start the ViewBox
        viewBoxStart: function(settings) { 
            /*   ANIMATIONS   */
            //Show the background 
            prty.vbDiv.fadeIn(settings.Speed);
            //Show the panel
            prty.panelViewBox.fadeIn(settings.Speed).animate({
                top: 0
            }, settings.Speed);
            //Load content
            prty.loadCnt(settings);
        },
        //Load content
        loadCnt: function(settings){
            //Show the loader
            prty.loader.fadeIn(settings.Speed/2);
            //Set the title
            prty.titleViewBox.text(prty.photoDetails[prty.activeEl].title);
            var img = new Image();
                img.onload = function(){
                    //Put img
                    prty.cntViewBox.append('<img src="'+img.src+'" alt="'+prty.photoDetails[prty.activeEl].title+'" />'); 
                    //Resize
                    prty.resizeViewBox(settings, 'm');                
                    //Hide the preloader
                    prty.loader.fadeOut(settings.Speed/2);  
                }; 
                img.src = prty.photoDetails[prty.activeEl].url_o;
            //Add next and prev support
            if(settings.navigation) {
                //Init the support
                prty.navSupport(settings);
            }
            //Set the number element
            if(settings.numberEl){
                //Add number 
                prty.numberDiv.text(1+parseInt(prty.activeEl)+'/'+prty.photoDetails.length);
            }
        },
        //Navigation support (arrows)
        navSupport: function(settings) {
            //Get basic datas
            var nextItem = parseInt(prty.activeEl)+1,
                prevItem = parseInt(prty.activeEl)-1,
                allItems = prty.photoDetails.length; 
            //check if is next 
            if(nextItem < allItems) {
                //Show next button
                prty.nextBtn.fadeIn(settings.Speed).off().on('click', function(e){
                    e.preventDefault();
                    prty.activeEl = nextItem;
                    //Chang media
                    prty.changeSlide(settings, '-=');
                });
            } else {
                //Hide next button
                prty.nextBtn.fadeOut(settings.Speed);
            }
            //check if is prev 
            if(prevItem > -1) {
                //Show prev button
                prty.prevBtn.fadeIn(settings.Speed).off().on('click', function(e){
                    e.preventDefault();
                    prty.activeEl = prevItem;
                    //Chang media
                    prty.changeSlide(settings, '+=');
                });
            } else {
                //Hide prev button
                prty.prevBtn.fadeOut(settings.Speed);
            }
            //Close button
            prty.closeBtn.off().on('click', function(e){
                e.preventDefault();
                prty.closeViewBox(settings);
            }); 
            //resize button
            prty.resizeBtn.off().on('click', function(e){
                e.preventDefault();
                if(prty.resizeBtn.is('.active')){
                    //Change class
                    prty.resizeBtn.toggleClass('active', false);
                    //resize out
                    prty.exitFullscreen(prty.vbDiv);
                } else {
                    //Change class
                    prty.resizeBtn.toggleClass('active', true);
                    //resize in
                    prty.initFullscreen(prty.vbDiv);
                }
            }); 
            /* KEYBOARD SUPPORT*/
				$(document.documentElement).off().on("keyup", function (event) {
                    //Left
                    if(event.keyCode == 37) {
                       if(prty.prevBtn.is(':visible')){
                            prty.activeEl = prevItem;
                            //Change media
                            prty.changeSlide(settings, '+=');
                        }
                    }
                    //Right
                    if(event.keyCode == 39) {
                       if(prty.nextBtn.is(':visible')){
                           prty.activeEl = nextItem;
                            //Change media
                            prty.changeSlide(settings, '-=');

                        }
                    }
					//ESC = close and exit fullscreen
					if(event.keyCode == 27) {
                        prty.closeViewBox(settings); 
					}
				});
				
				function swipedetect(el, callback){
  
					var touchsurface = el,
					swipedir,
					startX,
					startY,
					distX,
					distY,
					threshold = 150, //required min distance traveled to be considered swipe
					restraint = 100, // maximum distance allowed at the same time in perpendicular direction
					allowedTime = 300, // maximum time allowed to travel that distance
					elapsedTime,
					startTime,
					handleswipe = callback || function(swipedir){}
  
					touchsurface.addEventListener('touchstart', function(e){
						var touchobj = e.changedTouches[0]
						swipedir = 'none'
						dist = 0
						startX = touchobj.pageX
						startY = touchobj.pageY
						startTime = new Date().getTime() // record time when finger first makes contact with surface
						//e.preventDefault() //commented out because it prevents exiting from the gallery 
					}, false)
  
					touchsurface.addEventListener('touchmove', function(e){
						//e.preventDefault() // prevent scrolling when inside DIV //commented out because it prevents exiting from the gallery 
					}, false)
  
					touchsurface.addEventListener('touchend', function(e){
						var touchobj = e.changedTouches[0]
						distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
						distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
						elapsedTime = new Date().getTime() - startTime // get time elapsed
						if (elapsedTime <= allowedTime){ // first condition for awipe met
							if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
								swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
							}
							else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
								swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
							}
						}
						handleswipe(swipedir)
						//e.preventDefault() //commented out because it prevents exiting from the gallery 
					}, false)
				}
  
				//USAGE:

				var el = document.documentElement;
				swipedetect(el, function(swipedir){
					// swipedir contains either "none", "left", "right", "top", or "down"
					if (swipedir == "left"){
						if(prty.nextBtn.is(':visible')){
                           prty.activeEl = nextItem;
                            //Change media
                            prty.changeSlide(settings, '-=');
							
                        }
					}
					else if (swipedir == "right"){
						if(prty.prevBtn.is(':visible')){
                            prty.activeEl = prevItem;
                            //Change media
                            prty.changeSlide(settings, '+=');
							
                        }
					}
					else{}
					
				
				});
        },
        //Change slide
        changeSlide: function(settings, direction){  
            //Hide old details
            prty.vbDetails.animate({
                bottom: -prty.vbDetails.height()
            }, settings.Speed/2);
          //Hide active   
            prty.cntViewBox.animate({
                left: direction+prty.browserSize[1],
                opacity: 0.0 
            }, settings.Speed, function(){
                //Clear img
                prty.cntViewBox.find('img').remove();
                //Reset the position
                if(direction == '-=') {
                    //If it is next
                    prty.cntViewBox.css('left', prty.browserSize[1]);
                } else {
                    //If it is prev
                    prty.cntViewBox.css('left', -prty.browserSize[1]); 
                }
                 //Load new content
                 prty.loadCnt(settings);
            });
        },
        //Close ViewBox
        closeViewBox: function(settings){
            //Animate the ViewBox
            prty.cntViewBox.animate({
                height: 0,
                top: prty.browserSize[0]/2,
                width: 0,
                left: prty.browserSize[1]/2
            }, settings.Speed, 'easeOutExpo');
                //Fade out and remove
                prty.vbDiv.fadeOut(settings.Speed, function(){
                    prty.vbDiv.remove();
                        //Exit Fullscreen
                        prty.exitFullscreen(prty.vbDiv);
                });
        },
        //Resize
        resizeViewBox: function(settings) {
            //Update browser window sizes
            prty.updateBrowserSize();  
            //Get sizes
            var img = prty.photoDetails[prty.activeEl],
                Height = img.height_o,
                Width = img.width_o,
                size = prty.scale(prty.browserSize[1], prty.browserSize[0], Width, Height);
            //Animate content'
            prty.cntViewBox.animate({
                top: prty.browserSize[0]/2-size[1]/2,
                height: size[1],
                left: prty.browserSize[1]/2-size[0]/2,
                width: size[0],
                opacity: 1.0
            }, settings.Speed, 'easeOutBack');
            //Responsive Web Design
            $(window).on('resize', function(e){
                e.preventDefault();
                //Update browser window sizes
                prty.updateBrowserSize(); 
                size = prty.scale(prty.browserSize[1], prty.browserSize[0], Width, Height);
                prty.cntViewBox.css({
                    top: prty.browserSize[0]/2-size[1]/2,
                    height: size[1],
                    left: prty.browserSize[1]/2-size[0]/2,
                    width: size[0]
                });
            });
            //Add dragging support
            if(prty.browserSize[0] < Height || prty.browserSize[1] < Width) {
                //Enable dragg
                prty.cntViewBox.draggable({disabled: false});
            } else {
                //disable dragg
                prty.cntViewBox.draggable({disabled: true});
            }
        },  
        //Support for fullscreen 
        initFullscreen: function (element) {
            element.attr('id', 'flscreen');
            var fls = document.getElementById('flscreen');
                  if(fls.requestFullscreen) {
                    fls.requestFullscreen();
                  } else if(fls.mozRequestFullScreen) {
                    fls.mozRequestFullScreen();
                  } else if(fls.webkitRequestFullscreen) {
                    fls.webkitRequestFullscreen();
                  } else if(fls.msRequestFullscreen) {
                    fls.msRequestFullscreen();
                  } 
        },
        //Exit fullscreen
        exitFullscreen: function () {
          if(document.exitFullscreen) {
            document.exitFullscreen();
          } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
          $('#flscreen').removeAttr('id');
        }, 
		//Browser size
		updateBrowserSize:function () {
			var arraySize = new Array();
			//Height
			arraySize[0] = document.documentElement.clientHeight;
			//width 
			arraySize[1] = document.documentElement.clientWidth;
			prty.browserSize = arraySize;
		},
        //Scalling images 
        scale: function(maxW, maxH, currW, currH){ 
            var ratio = currH / currW;
            if(currW >= maxW && ratio <= 1){
                currW = maxW;
                currH = currW * ratio;
            } else if(currH >= maxH){
                currH = maxH;
                currW = currH / ratio;
            } 
            return [currW, currH];
        },
	};
 
})(jQuery); //The end