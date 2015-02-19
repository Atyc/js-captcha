var returnedCaptcha="0";
//create play area
$("#captcha").css({"display":"block", "clear":"both", "height":"55px", "margin-top":"15px"});
$('<div/>' ,{
	'id': "playArea"
}).appendTo('#captcha');
$("#playArea").css({"border": "1px solid black", "width":"190px", "height":"50px", "position":"absolute", "margin-bottom":"10px", "display":"block"});

//color list - a square will be created for each color defined here
var sqrColors={
	"red": "#ff0000",
	"orange": "#ff6600",
	"green": "#00ff00",
	"blue": "#0000ff",
	"purple": "#862ad1",
	"black": "#000000",
	"pink": "#ff55db",
	"grey": "#cacaca",
	"yellow": "#f1d400"
};

//generate coloured squares
function generateSquares() {
	var total=Object.keys(sqrColors).length;

	for(var word in sqrColors) {
		$('<div/>' ,{'id': "sq"+total, "class":word}).appendTo('#playArea');
		$("#sq"+total).css({"width": "15px", "height":"15px", "position":"absolute", "background-color":sqrColors[word], "border":"1px solid grey", "z-index":total});
		$("#sq"+total).draggable();

		var positionX = Math.floor((Math.random() * 176) + 0);
		var positionY = Math.floor((Math.random() * 34) + 0);
		$("#sq"+total).css({"left": positionX, "top":positionY});

		total--;
	}
	var theTwoSquares=pickTwo();

//generate text on top
$('<div/>' ,{
	'id': "toptext",
	'html': "Drag <u>" + theTwoSquares[0] + "</u> square over <u>" + theTwoSquares[1]+"</u> square"
}).appendTo('#playArea');
$("#toptext").css({"top": "-15px", "font-size":"9px", "font-family":"verdana", "position":"absolute"});
return theTwoSquares;
}

//add option to refresh CAPTCHA code - stopped
// $('<div/>' ,{
// 	'id': "refresh",
// 	'text': "refresh"
// }).appendTo('#playArea');
// $("#refresh").css({"left": "155px", "top": "52px", "font-size":"10px", "font-family":"verdana", "position":"absolute"});

$("#refresh").click(function() {
	for (var i = 1; i < Object.keys(sqrColors).length; i++) {
		$("#sq"+i).remove();
	};
	$("#toptext").remove();
	theseCollide (generateSquares());
});


//function to detect overlaps
//Copyright (c) 2013 Yannick Albert (http://yckart.com)

(function($){
	$.fn.overlaps = function(obj) {
		var elems = {targets: [], hits:[]};
		this.each(function() {
			var bounds = $(this).offset();
			bounds.right = bounds.left + $(this).outerWidth();
			bounds.bottom = bounds.top + $(this).outerHeight();

			var compare = $(obj).offset();
			compare.right = compare.left + $(obj).outerWidth();
			compare.bottom = compare.top + $(obj).outerHeight();

			if (!(compare.right < bounds.left ||
				compare.left > bounds.right ||
				compare.bottom < bounds.top ||
				compare.top > bounds.bottom)
				) {
				elems.targets.push(this);
			elems.hits.push(obj);
		}
	});

		return elems;
	};
}(jQuery));

//Pick 2 different random squares
function pickTwo(){
	var returned=[];
	var first="0";
	var second="0";
	var sqrColorskeys = [];
	for (var prop in sqrColors) {
		if (sqrColors.hasOwnProperty(prop)) {
			sqrColorskeys.push(prop);
		}
	}
	while (first==second){
		first = sqrColorskeys[Math.floor(Math.random()*sqrColorskeys.length)];
		second = sqrColorskeys[Math.floor(Math.random()*sqrColorskeys.length)];
	}
	returned.push(first);
	returned.push(second);
	return returned;
}

//check if they overlap
function theseCollide(someArray) {
	first=$("."+someArray[0]);
	second=$("."+someArray[1]);
	var returned;

	first.mouseup(function() {
		var collides = first.overlaps(second);
		var itOverlaps = collides.hits;
		if (itOverlaps!="") {
			captcha("1");
		} 
		else{
			captcha("0");
		}
		//return returned;
	});
}

//var test=generateSquares();

var test=theseCollide (generateSquares());
//console.log(test[0]);

//do something if true or false

function captcha(par) {
	
	if(par==0) {
        $("#oktext").remove();
        var returnedCaptcha="0";
        $("#checker").attr("value", "10");
    }
	if(par==1) {
    $("#oktext").remove();
    $('<div/>' ,{
    'id': "oktext",
    'text': "That's right!" }).appendTo('#playArea');
    $("#oktext").css({"top": "52px", "font-size":"10px", "font-family":"verdana", "position":"absolute", "font-weight":"bold"});
    var returnedCaptcha="1";
    $("#checker").attr("value", "1");
    };
} 


$("#playArea").children().mousedown(function() {
	$("#playArea").children().css({"z-index": "1"});
	var clickedDiv=$("#"+this.id);
	clickedDiv.css({"z-index": "100"});
});

