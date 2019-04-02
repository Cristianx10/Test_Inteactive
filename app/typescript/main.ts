class Navegable{

    secciones:Array<HTMLElement>;

    constructor(secciones:Array<HTMLElement>){
        this.secciones = secciones;
    }

    mostrar(seccion:HTMLElement){
        seccion.style.display = "block";
    }

    ocultar(seccion:HTMLElement){
        seccion.style.display = "none";
    }
}