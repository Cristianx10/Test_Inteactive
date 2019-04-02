"use strict";
function init() {
    function selector(id) {
        var elemento = document.querySelector(id);
        if (elemento == null) {
            alert("No existe la etiqueta: " + id);
        }
        return elemento;
    }
    function selectorAll(id) {
        var elemento = document.querySelectorAll(id);
        if (elemento == null) {
            alert("No existe la etiqueta: " + id);
        }
        return elemento;
    }
    var bloqueActual;
    var nulo = null;
    var bloquear = false;
    var Bloque = /** @class */ (function () {
        function Bloque(ficha, padre) {
            var _this = this;
            this.ficha = ficha;
            this.validado = false;
            this.cliqueado = false;
            this.padre = padre;
            var element = document.createElement("div");
            element.className = "tablero__bloque";
            var bloque = document.createElement("div");
            bloque.className = "bloque";
            var cara = document.createElement("div");
            cara.className = "bloque__cara";
            var sello = ficha;
            sello.className = "bloque__sello";
            element.appendChild(bloque);
            bloque.appendChild(cara);
            bloque.appendChild(sello);
            this.bloque = element;
            this.tarjeta = bloque;
            this.bloque.addEventListener("click", function () {
                if (bloquear == false) {
                    if (_this.validado === false && bloqueActual !== _this) {
                        if (_this.tarjeta.style.transform === "rotateY(180deg)") {
                            _this.ocultar();
                        }
                        else {
                            _this.mostrar();
                            if (_this.padre.validar(bloqueActual)) {
                                _this.padre.confirmado();
                                console.log("Valido");
                                bloqueActual = nulo;
                            }
                            else if (bloqueActual !== null && bloqueActual !== undefined) {
                                bloquear = true;
                                setTimeout(function () {
                                    bloqueActual.ocultar();
                                    _this.ocultar();
                                    bloqueActual = nulo;
                                    bloquear = false;
                                    console.log("Fallo");
                                }, 1000);
                            }
                            else {
                                bloqueActual = _this;
                            }
                        }
                    }
                    else if (_this.validado === false && bloqueActual === _this) {
                        _this.cliqueado = false;
                        _this.bloque.style.transform = "rotateY(0deg)";
                    }
                }
            });
        }
        Bloque.prototype.ocultar = function () {
            this.cliqueado = false;
            this.tarjeta.style.transform = "rotateY(0deg)";
        };
        Bloque.prototype.mostrar = function () {
            this.cliqueado = true;
            this.tarjeta.style.transform = "rotateY(180deg)";
        };
        Bloque.prototype.getBloque = function () {
            return this.bloque;
        };
        Bloque.prototype.reset = function () {
            this.cliqueado = false;
            this.tarjeta.style.transform = "rotateY(0deg)";
        };
        Bloque.prototype.validar = function () { };
        return Bloque;
    }());
    var Pareja = /** @class */ (function () {
        function Pareja(elementoA, elementoB) {
            this.elementos = new Array();
            var a = new Bloque(elementoA, this);
            var b = new Bloque(elementoB, this);
            this.elementos.push(a);
            this.elementos.push(b);
        }
        Pareja.prototype.getElementoA = function () {
            return this.elementos[0].getBloque();
        };
        Pareja.prototype.getElementoB = function () {
            return this.elementos[1].getBloque();
        };
        Pareja.prototype.validar = function (bloque) {
            if (this.elementos.indexOf(bloque) !== -1) {
                return true;
            }
            return false;
        };
        Pareja.prototype.confirmado = function () {
            this.elementos.forEach(function (element) {
                element.validado = true;
            });
        };
        return Pareja;
    }());
    function shuffle(array) {
        array.sort(function () { return Math.random() - 0.5; });
    }
    var bloques = selector(".tableros");
    var carga = new createjs.LoadQueue(true);
    carga.loadFile({ src: "../../data/emparejado.json" });
    carga.on("fileload", function (event) {
        if (event.item.type == "json") {
            for (var i = 0; i < event.result.secciones.length; i++) {
                var sec = event.result.secciones[i];
                var fichas = new Array();
                var tarjetas = new Array();
                for (var j = 0; j < sec.recursos.length; j++) {
                    var recur = sec.recursos[j];
                    var a = document.createElement("div");
                    a.innerHTML = "<img src=\"" + recur + "\" />";
                    console.log(recur);
                    fichas.push(a);
                }
                for (var i_1 = 0; i_1 < fichas.length; i_1++) {
                    var a = fichas[i_1];
                    i_1++;
                    var b = fichas[i_1];
                    var par = new Pareja(a, b);
                    tarjetas.push(par.getElementoA());
                    tarjetas.push(par.getElementoB());
                }
                shuffle(tarjetas);
                var bloc = document.createElement("div");
                bloc.className = "tablero";
                for (var i_2 = 0; i_2 < tarjetas.length; i_2++) {
                    bloc.appendChild(tarjetas[i_2]);
                }
                bloques.appendChild(bloc);
            }
        }
    });
}
$(document).ready(init);
/*
  bloques.forEach(element => {
    element.addEventListener("click", () => {
      if (element.style.transform === "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      } else {
        element.style.transform = "rotateY(180deg)";
      }

      console.log();
    });
  });
*/
/*
  let fichas: Array<HTMLElement> = new Array();
  let tarjetas: Array<HTMLElement> = new Array();
  
  let a = document.createElement("div");
  let b = document.createElement("div");
  a.innerHTML = "mono" + "A";
  b.innerHTML = "mono" + "B";

  fichas.push(a);
  fichas.push(b);

  a = document.createElement("div");
  b = document.createElement("div");

  a.innerHTML = "Lobo" + "A";
  b.innerHTML = "Lobo" + "B";

  fichas.push(a);
  fichas.push(b);

  a = document.createElement("div");
  b = document.createElement("div");

  a.innerHTML = "Arana" + "A";
  b.innerHTML = "Arana" + "B";

  fichas.push(a);
  fichas.push(b);


  for (let i = 0; i < fichas.length; i++) {
    let a = fichas[i];
    i++;
    let b = fichas[i];
    let par = new Pareja(a, b);
    tarjetas.push(par.getElementoA());
    tarjetas.push(par.getElementoB());
  }

  function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
  }

  shuffle(tarjetas);

  function addBloques() {
    var columnas = 5;
    var tr = document.createElement("tr");

    for (let i = 0; i < tarjetas.length; i++) {
      if (i % columnas == 0) {
        bloques.appendChild(tr);
        tr = document.createElement("tr");
      }
      tr.appendChild(tarjetas[i]);
    }
    bloques.appendChild(tr);
  }

  addBloques();
  */
