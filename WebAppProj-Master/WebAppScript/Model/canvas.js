/** credit:
http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
https://www.mikechambers.com/blog/2011/01/31/setting-the-background-color-when-generating-images-from-canvas-todataurl/
**/
(function() {

  // hide save-print-div
  document.getElementById("save-print-div").style.display = "none";
  
  // Get a regular interval for drawing to the screen
  window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || 
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimaitonFrame ||
          function (callback) {
            window.setTimeout(callback, 1000/60);
          };
  })();

  
  // Set up the main canvas
  var canvas = document.getElementById("prescription-canvas");
  
  // Set up canvas for stroke size
  var strokeSizeCanvas = document.getElementById("stroke-size");
  var currentStrokeSizeCanvas = document.getElementById("current-stroke-size");
  
  // Context for main canvas
  var ctx = canvas.getContext("2d");
  
  var strokeSizeCtx = strokeSizeCanvas.getContext("2d");
  strokeSizeCtx.beginPath();
  
  var currentStrokeSizeCtx = currentStrokeSizeCanvas.getContext("2d");
  currentStrokeSizeCtx.beginPath();
  
  // Create background for saved image
  function canvasToImage(backgroundColor) {
    // h and w
    var w = canvas.width;
    var h = canvas.height;

    var data;

    if(backgroundColor) {
      //img data
      data = ctx.getImageData(0, 0, w, h);

      //stor curret globalCompositeOperation
      var compositeOperation = ctx.globalCompositeOperation;

      //set to draw behind current content
      ctx.globalCompositeOperation = "destination-over";

      // set bckg color
      ctx.fillStyle = backgroundColor;

      //draw bckg / rect on canvas
      ctx.fillRect(0, 0, w, h);
    }

    //get img data from canvas

    var imageData = canvas.toDataURL("");

    if (backgroundColor) {
      //clear canvas
      ctx.clearRect(0, 0, w, h);

      //restore with original data
      ctx.putImageData(data, 0, 0);

      //reset globalCompositeOperation
      ctx.globalCompositeOperation = compositeOperation;
    }

    //return base64
    return imageData;
  }
  
  // Set up the UI
  
	var dropDownBtn = document.getElementById('dropbtn');
	var dropDownContent = document.getElementById('dropdown-content');
	var presTxt = document.getElementById("prescription-dataUrl");
	var presImg = document.getElementById("prescription-image");
	var clearBtn = document.getElementById("prescription-clearBtn");
	var submitBtn = document.getElementById("prescription-submitBtn");


	//Stroke size and color
	var strokeSizeSlider = document.getElementById("strokeRange");
	var strokeSize = strokeSizeSlider.value;
	//Change stroke size
	strokeSizeSlider.oninput = function() {
	strokeSize = this.value;
	
} 
  
	//Color palets
	var colorPalet = document.getElementsByName("colorPalet");
	var strokeColor = colorPalet[4].getAttribute("value");
	
	colorPalet.forEach(color => changeColor(color));
	
	function changeColor(color) {
		color.addEventListener("click", function(e) {
			strokeColor = color.getAttribute("value");
		});
	}


  //dropdown for color and size in canvas
  
  //check mouse over buttons
  var dropDownBtnHover = false;
  //check to see if mouse is over button
  dropDownBtn.addEventListener("mouseover", function(e) { dropDownBtnHover = true; });
  dropDownBtn.addEventListener("mouseleave", function(e) {dropDownBtnHover = false; });
  //check once button clicked, if mouse is over the dropdown
  dropDownContent.addEventListener("mouseover", function(e) {dropDownBtnHover = true; });
  dropDownContent.addEventListener("mouseleave", function(e) {dropDownBtnHover = false; });
  dropDownBtn.addEventListener("click", function (e) {
	dropDown();
  }, false);
  //hide dropdown wherever you click
  this.addEventListener("click", function (e) {
  if (dropDownContent.style.display != "none" && !dropDownBtnHover) //checks if mouse is over color button or color palet
		dropDownContent.style.display = "none";
  }, false);
  
  clearBtn.addEventListener("click", function (e) {
    clearCanvas();
    presImg.setAttribute("src", "");
    document.getElementById("save-print-div").style.display = "none";
  }, false);
  
  submitBtn.addEventListener("click", function (e) {
    //var dataUrl = canvas.toDataURL("");
    var dataUrl = canvasToImage("#EEF0F1");
	
	document.getElementById("yourcanvas").innerHTML = "You can download or print the prescription image";
    presImg.setAttribute("src", dataUrl);
    // Trim base64 string and save to JSON object

    prescOrder.custom_pres = dataUrl.replace(/^data:.+;base64,/, '');

    // send JSON package to medpick database
    sendPrescription();
    showSavePrint(dataUrl);
  }, false);

  function showSavePrint( img ) {
    var x = document.getElementById("save-print-div");
    x.style.display = "block";
    document.getElementById("save").setAttribute("href", img);

    document.getElementById("print").addEventListener("click", function () {
      var win = window.open('');
      var imgTag = '<img src="' + img + '" onload="window.print();window.close()"> </img>';
        win.document.write(imgTag);
        win.focus();
      }, false); 
    }


  
  // set up mouse events
  var drawing = false;
  var mousePos = { x:0, y:0 };
  var lastPos = mousePos;
  
  canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
  }, {passive: false});
  
  canvas.addEventListener("mouseup", function (e) {
    drawing = false;
  }, {passive: false});
  
  canvas.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(canvas, e);
  }, {passive: false});

  
  // Set up touch events
  canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, {passive: false});
  
  canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
  }, {passive: false});
  
  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, {passive: false});

  
  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, {passive: false});
  
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, {passive: false});
  
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, {passive: false});

  
  // Get the position of the mouse relative to the canvas
  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  
  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  
  // Draw to the canvas
  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  
  // clear the canvas
  function clearCanvas() {
    canvas.width = canvas.width;
  }

  
  // Allow for animation
  (function drawLoop () {
    requestAnimFrame(drawLoop);
    renderCanvas();
	updateStrokeSizeColor(strokeSize, strokeColor);
  })();
  
  //Draw the stroke size in the size option
  function updateStrokeSizeColor(size, color) {
	  strokeSizeCanvas.width = strokeSizeCanvas.width;
	  currentStrokeSizeCanvas.width = currentStrokeSizeCanvas.width;
	  strokeSizeCtx.beginPath();
	  currentStrokeSizeCtx.beginPath();
	  currentStrokeSizeCtx.fillStyle = color;
	  strokeSizeCtx.fillStyle = color;
	  ctx.strokeStyle = color;
	  currentStrokeSizeCtx.arc(currentStrokeSizeCanvas.width/2, currentStrokeSizeCanvas.height/2, size/2, 0, Math.PI * 2);
	  strokeSizeCtx.arc(strokeSizeCanvas.width/2, strokeSizeCanvas.height/2, size/2, 0, Math.PI * 2);
	  ctx.lineWidth = size;
	  strokeSizeCtx.fill();
	  currentStrokeSizeCtx.fill();
  }
  
  
  // drops down the nemu bar for classes of dropDownContent
  function dropDown() {
	if (dropDownContent.style.display == "none") dropDownContent.style.display = "block";
	else dropDownContent.style.display = "none";
  }
  

})();

