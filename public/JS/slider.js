//! PERFORMING A FUNCTION IN THE MOUSE MOVE FUNCTION

const showNumber = document.querySelector('.numberShow');
showNumber.textContent = document.getElementById('rangeInput').value;


const sliderContainer = document.querySelector('.slider-container');
var currentSliderWidth;

var blurVal = document.getElementById('rangeInput').value / 10;

//KEEP TRACK OF MOUSE POSITION
var mouseX, mouseY;
$(document).mousemove(function (e) {
	// values: e.clientX, e.clientY, e.pageX, e.pageY
	mouseX = e.clientX;
	mouseY = e.clientY;
});

function calculateBlurValue() {

	var blurVal = document.getElementById('rangeInput').value / 10;

    gsap.to('.drag_h2', { filter: `blur(${blurVal}px)` });
}


function display(number) {
	showNumber.textContent = number;
	document.getElementById('rangeInput').value = number;
}

var isMouseDown = false;
var isMoving = false;
var duration = 0.35,
	ease = 'none';
ease = 'expo.inOut';

const slider_slider = document.querySelector(".slider_slider")

$(slider_slider).mousedown(function (event) {
	isMouseDown = true;
	$('body').addClass('dragging');





	initialMouseX = event.pageX;
	initialSliderWidth = parseFloat(
		getComputedStyle(document.querySelector('.inner-slider')).width
	);

	if (isMouseDown) {
		var mouseOffset = (event.pageX - initialMouseX) / 2; // Divide by a factor to reduce the movement
		newWidth = initialSliderWidth + mouseOffset;
		newWidth = Math.max(0, Math.min(newWidth, 175)); // Limit newWidth to a range between 0 and 175

		var rangeValue = Math.round((newWidth / 175) * 100);
		display(rangeValue);

		currentSliderWidth = newWidth; // Update currentSliderWidth


		document.querySelector('.inner-slider').style.width = newWidth + 'px';

		// Calculate value
		calculateBlurValue();
	}

	//CHANGE SLIDER SIZE
	$('.slider').addClass('animating');

	// Calculate value
	calculateBlurValue();
});

$(document).mousemove(function (event) {
	if (isMouseDown) {
		//&& event.pageX > sliderContainer.offsetLeft ORIGINAL CALCULATIONS FOR FIXED POSITION
		// var mouseOffset = event.pageX - initialMouseX; //ORIGINAL VALUE
		isMoving = true;
		var mouseOffset = (event.pageX - initialMouseX) / 2; // Divide by a factor to reduce the movement
		newWidth = initialSliderWidth + mouseOffset;
		newWidth = Math.max(0, Math.min(newWidth, 175)); // Limit newWidth to a range between 0 and 175

		var rangeValue = Math.round((newWidth / 175) * 100);
		display(rangeValue);

		currentSliderWidth = newWidth; // Update currentSliderWidth


		document.querySelector('.inner-slider').style.width = newWidth + 'px';

		// Calculate value
		calculateBlurValue();
	}
});

$(document).mouseup(function () {
	isMouseDown = false;
	$('body').removeClass('dragging');
	
	
	var currentValue = Math.round((currentSliderWidth / 175) * 100)

	//CHANGE SLIDER SIZE BACK
	$('.slider').removeClass('animating');

	//make sure it only displays numbers
	if(!currentValue) {
		return
	}
	display(currentValue);
});





