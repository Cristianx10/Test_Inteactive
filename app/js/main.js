"use strict";
var Navegable = /** @class */ (function () {
    function Navegable(secciones) {
        this.secciones = secciones;
    }
    Navegable.prototype.mostrar = function (seccion) {
        seccion.style.display = "block";
    };
    Navegable.prototype.ocultar = function (seccion) {
        seccion.style.display = "none";
    };
    return Navegable;
}());
