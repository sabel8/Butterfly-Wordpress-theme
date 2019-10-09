var movingicon, movingiconbox, movingiconpath, movingiconpathlength,
	containerFade1,containerFade2,containerFade3,
	SVGanimationDuration=10;

$(function () {
	$("#mainSection").on("mousemove", function (e) {
		let purplePercent = Math.round(e.pageX / $(window).width() * 100 / 4) + 75;
		let bluePercent = Math.round(e.pageY / $(window).height() * 100 / 5);
		$("#mainSection").css("background-image", "linear-gradient(" + (bluePercent + 350) + "deg, #21D4FD " + bluePercent +
			"%, #B721FF " + purplePercent + "%)");
	});

	//set the path of the svg considering the window size
	let containerWidth = $("#bodyContainer").width();
	let edge = containerWidth - 25; //right margin
	let heightUnit = ($(window).height() / 14)-50/14;

	//calculate the path taking the height of the screen into consideration
	let newD = "M " + edge + " 0 Q " + edge + " " + heightUnit + " " + (edge / 2) + " " + heightUnit + " Q 25 " + heightUnit + " 25 " +
		(heightUnit * 2) + " L 25 " + (heightUnit * 4) + " Q 25 " + (heightUnit * 5) + " " + (edge / 2) + " " + (heightUnit * 5) +
		" Q " + edge + " " + (heightUnit * 5) + " " + edge + " " + (heightUnit * 6) + " L " + edge + " " + (heightUnit * 8) + " Q " +
		edge + " " + (heightUnit * 9) + " " + (edge / 2) + " " + (heightUnit * 9) + " Q 25 " + (heightUnit * 9) + " 25 " +
		(heightUnit * 10) + " L 25 " + (heightUnit * 12) + " Q 25 " + (heightUnit * 13) + " " + (edge / 2) + " " + (heightUnit * 13) +
		" Q " + edge + " " + (heightUnit * 13) + " " + edge + " " + (heightUnit * 14);

	$("#firstSVG").css("width", containerWidth);
	$("#firstSVG").css("height", $(window).height());

	$("#firstPath").attr("d", newD);
	var length = $("#firstPath").get(0).getTotalLength();
	$("#firstPath").attr("stroke-dasharray", length + " " + length);

	//start the animation
	$("#firstPath").attr("stroke-dashoffset", length);

	//icon setup
	movingicon = Snap("#firstSVG").select('#movingicon');
	movingiconbox = movingicon.getBBox();
	movingiconpath = Snap("#firstSVG").path(newD).attr({
		'fill': 'none',
		'stroke': 'none'
	});
	movingiconpathlength = Snap.path.getTotalLength(movingiconpath);
	$("#movingicon").hide();

	//section css setup
	$(".serviceContainer").css({"margin-top":(heightUnit * 2)-30+"px",
		"height":heightUnit*2+40});
});

function movingiconanimation() {
	fadeInServiceContainers();
	$("#movingicon").show();
	//fade in the services divs
	Snap.animate(0, movingiconpathlength, function (step) {
		moveToPoint = Snap.path.getPointAtLength(movingiconpath, step);
		x = moveToPoint.x - (movingiconbox.width / 2);
		y = moveToPoint.y - (movingiconbox.height / 2);
		movingicon.transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + 
		movingiconbox.cx + ', ' + movingiconbox.cy + ')');
	}, SVGanimationDuration*1000, mina.easeinout);
}

function fadeInServiceContainers() {
	containerFade1 = setTimeout(function(){$('.serviceContainer:eq(0)').animate({opacity:1},3000)}, (SVGanimationDuration/15)*1000);
	containerFade2 = setTimeout(function(){$('.serviceContainer:eq(1)').animate({opacity:1},3000)}, (SVGanimationDuration/3)*1000);
	containerFade3 = setTimeout(function(){$('.serviceContainer:eq(2)').animate({opacity:1},3000)}, (SVGanimationDuration/2)*1000);
}

function abortContainerFades() {
	clearTimeout(containerFade1);
	clearTimeout(containerFade2);
	clearTimeout(containerFade3);
	//stop the animations which already have started
	$(".serviceContainer").stop();
	$(".serviceContainer").css("opacity",0);
}

var navWidth = 250;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
	$("#mySidenav").css("width", navWidth + "px")
	$("#mainCenter").css("margin-left", "+=" + (navWidth / 2) + "px")
	$("#mainSection").css("opacity", 0.4);
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav(sectionName) {
	$("#mySidenav").css("width", "0px")
	$("#mainCenter").css("margin-left", "-=" + (navWidth / 2) + "px")
	$("#mainSection").css("opacity", 1);
	$.scrollify.move("#" + sectionName);
}