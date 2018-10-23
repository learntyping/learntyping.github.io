/* https://github.com/wesbos/keycodes */
'use strict';

var keyCodes = {
  8 : "backspace",
  9 : "tab",
  13 : "enter",
  16 : "shift-left/shift-right",
  17 : "control",
  18 : "option-left/option-right",
  20 : "capslock",
  32 : "space",
  48 : "0",
  49 : "1",
  50 : "2",
  51 : "3",
  52 : "4",
  53 : "5",
  54 : "6",
  55 : "7",
  56 : "8",
  57 : "9",
  59 : "semicolon",
  61 : "equal",
  65 : "a",
  66 : "b",
  67 : "c",
  68 : "d",
  69 : "e",
  70 : "f",
  71 : "g",
  72 : "h",
  73 : "i",
  74 : "j",
  75 : "k",
  76 : "l",
  77 : "m",
  78 : "n",
  79 : "o",
  80 : "p",
  81 : "q",
  82 : "r",
  83 : "s",
  84 : "t",
  85 : "u",
  86 : "v",
  87 : "w",
  88 : "x",
  89 : "y",
  90 : "z",
  173 : "minus",
  186 : "semicolon",
  187 : "equal",
  188 : "comma",
  189 : "minus",
  190 : "dot",
  191 : "slash",
  192 : "tilda",
  219 : "open-bracket",
  220 : "backslash",
  221 : "close-bracket",
  222 : "quote",
  223 : "tilda",
  225 : "option-right"
};

var body = document.querySelector('body');

body.onkeydown = function (e) {
  if ( !e.metaKey ) {
    e.preventDefault();
  }
  var key = keyCodes[e.keyCode];
  
  var a = document.getElementById("svgObject");
  var svgDoc = a.contentDocument;
  var path = $("path", svgDoc);
  var sound = $("#sound i").hasClass("fa-volume-up");
  
  path.removeClass("active");
  key.split("/").forEach(function (id) {
    $("#key-"+id, svgDoc).addClass("active");
	var audio = document.getElementById('audio-'+id);
	if (sound && audio) audio.play();
  });
  
  setTimeout(function(){ path.removeClass("active"); }, 300);
};

function setSound(flag) {
	var icon = $("#sound i");
	if (flag) {
		icon.removeClass("fa-volume-off");
		icon.addClass("fa-volume-up");
	} else {
		icon.removeClass("fa-volume-up");
		icon.addClass("fa-volume-off");
	}
	
	if(typeof Storage !== "undefined") {
	  sessionStorage.typing_sound = JSON.stringify(flag);
	}
}

$(document).ready(function() {
	$("#sound").click(function(){
		var flag = $("#sound i").hasClass("fa-volume-up");
		setSound(!flag);
	});
	
	if(typeof Storage !== "undefined" && sessionStorage.typing_sound) {
		setSound(JSON.parse(sessionStorage.typing_sound));
	} else {
		setSound(true);
	}
});