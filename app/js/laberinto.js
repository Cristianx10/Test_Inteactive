"use strict";
$(document).ready(function () {
    var aple = document.querySelector('#aple');
    var canvas = document.getElementById('juego-relacion');
    var stage = new createjs.Stage(canvas);
    stage.enableMouseOver(1000);
    var zona;
    aple.addEventListener("load", function () {
        zona = new createjs.Bitmap(aple);
        stage.addChild(zona);
        stage.update();
        zona.on("rollover", function () {
            console.log("sobre");
        });
    });
    /* createjs.Ticker.addEventListener("tick", function(){
         console.log("update");
         stage.update();
     });*/
    aple.addEventListener("mousemove", function () {
        console.log("sobre");
    });
});
