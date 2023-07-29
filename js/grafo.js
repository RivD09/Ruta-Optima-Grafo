var nodes, edges, network;
var color1 = "#41D4AF";
var color2 = "#E3872D";
var ciudades, relaciones;
var distancias, gr;
var origen = 14,
    destino = 4;
//var factor = 0.53185799,
var size = 49;
var visible = false;
var ID_nodo = 49;
//var ID_lado = 23;

var step = 0;
var cola;
var abiertos;
var cerrados;
var visitados;
var ini = 0,
    fin = 0;
var tmp;
var recorrido = "";

function better_first() {

    if (step == 0) {
        //cola = new Array(Object);
        abiertos = new Array(Object);
        cerrados = new Array(Object);
        visitados = new Array();
        ini = 0;
        fin = 0;

        //cola[fin] = { id: origen, dis: distancias[origen][destino] };
        abiertos[fin] = { id: origen, dis: distancias[origen][destino] };
        visitados[origen] = 1;

    }
    step++;

    if (ini <= fin) {
    //while (ini <= fin) {
        //ordenar abiertos de menor a mayor
        for(var i=0; i<abiertos.length-1;i++){
            for(var j=0; j<abiertos.length-i-1; j++){
                if(abiertos[j+1].dis < abiertos[j].dis){
                    var temporal = abiertos[j+1];
                    abiertos[j+1] = abiertos[j];
                    abiertos[j] = temporal;
                }
            }
        }
        //mover nodo de abiertos a cerrados
        cerrados.unshift(abiertos[0]);

        nodes.update({ id: cerrados[0].id, color: color2 });

        if (cerrados[0].id == destino){
            for(var i=0; i<cerrados.length; i++){
                recorrido = recorrido + cerrados[i].id + "\n";
            }
            mostrar_recorrido();
            return;
        }

        for (var i = 1; i < ID_nodo; i++) {
            //Si existe un camino desde el nodo actual hasta el nodo i tal que i es cualquiera
            // de los 48 nodos  Y    si el nodo i no ha sido visitado, entonces)

            if (gr[cerrados[0].id][i] != null && visitados[i] == null) {
                //Establecemos el nodo i como nodo visitado
                visitados[i] = 1;

                //Pinta el color del nodo frontera
                nodes.update({ id: i, color: color1 });

                if (i == destino) {
                    //Pinta el color del nodo desino
                    cerrados.unshift({id: i});
                    nodes.update({ id: i, color: color2 });
                    ini = fin + 1;
                    for(var x=0; x<cerrados.length; x++){
                        recorrido = recorrido + cerrados[x].id + "\n";
                    }
                    mostrar_recorrido();
                    return;
                }
                var vecino = {id: i, dis: distancias[i][destino]};
                abiertos.push(vecino);
                fin++;
            }
        }
        abiertos.shift();
    }
}

function disable_buttons() {
    document.getElementById("Start").disabled = false;
}

function toJSON(obj) {
    return JSON.stringify(obj, null, 4);
}

function graph() {
    distancias = new Array();
    for (var i = 0; i < size; i++) distancias[i] = new Array();

    ciudades = [
        { id: "1", label: "1", x: -280, y: 200 },
        { id: "2", label: "2", x: -200, y: 200 },
        { id: "3", label: "3", x: -120, y: 200 },
        { id: "4", label: "4", x: -40, y: 200 },
        { id: "5", label: "5", x: 40, y: 200 },
        { id: "6", label: "6", x: 125, y: 200 },
        { id: "7", label: "7", x: 210, y: 200 },
        { id: "8", label: "8", x: 310, y: 200 },
        { id: "9", label: "9", x: -280, y: 120 },
        { id: "10", label: "10", x: -200, y: 120 },
        { id: "11", label: "11", x: -120, y: 120 },
        { id: "12", label: "12", x: -40, y: 120 },
        { id: "13", label: "13", x: 40, y: 120 },
        { id: "14", label: "P", x: 125, y: 120, color: "#d48430" },
        { id: "15", label: "15", x: 210, y: 120 },
        { id: "16", label: "16", x: 300, y: 120 },
        { id: "17", label: "17", x: -280, y: 40 },
        { id: "18", label: "18", x: -200, y: 40 },
        { id: "19", label: "19", x: -120, y: 40 },
        { id: "20", label: "20", x: -40, y: 40 },
        { id: "21", label: "21", x: 40, y: 40 },
        { id: "22", label: "22", x: 130, y: 40 },
        { id: "23", label: "23", x: 210, y: 40 },
        { id: "24", label: "24", x: 290, y: 40 },
        { id: "25", label: "25", x: -280, y: -40 },
        { id: "26", label: "26", x: -200, y: -40 },
        { id: "27", label: "27", x: -120, y: -40 },
        { id: "28", label: "28", x: -40, y: -40 },
        { id: "29", label: "29", x: 40, y: -40 },
        { id: "30", label: "30", x: 130, y: -40 },
        { id: "31", label: "31", x: 198, y: -40 },
        { id: "32", label: "32", x: 285, y: -40 },
        { id: "33", label: "33", x: -280, y: -120 },
        { id: "34", label: "34", x: -200, y: -120 },
        { id: "35", label: "35", x: -120, y: -120 },
        { id: "36", label: "36", x: -40, y: -120 },
        { id: "37", label: "37", x: 40, y: -120 },
        { id: "38", label: "38", x: 130, y: -120 },
        { id: "39", label: "39", x: 190, y: -120 },
        { id: "40", label: "40", x: 280, y: -120 },
        { id: "41", label: "41", x: -280, y: -180 },
        { id: "42", label: "42", x: -200, y: -185 },
        { id: "43", label: "43", x: -120, y: -190 },
        { id: "44", label: "44", x: -40, y: -195 },
        { id: "45", label: "45", x: 40, y: -200 },
        { id: "46", label: "46", x: 130, y: -200 },
        { id: "47", label: "47", x: 180, y: -200 },
        { id: "48", label: "48", x: 280, y: -200 },
    ];

    relaciones = [
        { id: "1", from: "1", to: "2", label: "" },
        { id: "2", from: "2", to: "3", label: "" },
        { id: "3", from: "3", to: "4", label: "Av" },
        { id: "4", from: "4", to: "5", label: "Jose" },
        { id: "5", from: "5", to: "6", label: "Pardo" },
        { id: "6", from: "6", to: "7", label: "" },
        { id: "7", from: "7", to: "8", label: "" },
        { id: "8", from: "9", to: "10", label: "" },
        { id: "9", from: "10", to: "11", label: "c." },
        { id: "10", from: "11", to: "12", label: "2 de" },
        { id: "11", from: "12", to: "13", label: "Mayo" },
        { id: "12", from: "13", to: "14", label: "" },
        { id: "13", from: "14", to: "15", label: "" },
        { id: "14", from: "15", to: "16", label: "" },
        { id: "15", from: "17", to: "18", label: "" },
        { id: "16", from: "18", to: "19", label: "" },
        { id: "17", from: "19", to: "20", label: "" },
        { id: "18", from: "20", to: "21", label: "" },
        { id: "19", from: "21", to: "22", label: "Ca." },
        { id: "20", from: "22", to: "23", label: "Enrique" },
        { id: "21", from: "23", to: "24", label: "Palacios" },
        { id: "22", from: "25", to: "26", label: "C." },
        { id: "23", from: "26", to: "27", label: "Piura" },
        { id: "24", from: "27", to: "28", label: "" },
        { id: "25", from: "28", to: "29", label: "" },
        { id: "26", from: "29", to: "30", label: "" },
        { id: "27", from: "30", to: "31", label: "" },
        { id: "28", from: "31", to: "32", label: "" },
        { id: "29", from: "33", to: "34", label: "" },
        { id: "30", from: "34", to: "35", label: "" },
        { id: "31", from: "35", to: "36", label: "" },
        { id: "32", from: "36", to: "37", label: "C." },
        { id: "33", from: "37", to: "38", label: "Chiclay" },
        { id: "34", from: "38", to: "39", label: "" },
        { id: "35", from: "39", to: "40", label: "" },
        { id: "36", from: "41", to: "42", label: "" },
        { id: "37", from: "42", to: "43", label: "" },
        { id: "38", from: "43", to: "44", label: "Av." },
        { id: "39", from: "44", to: "45", label: "Angam" },
        { id: "40", from: "45", to: "46", label: "Oeste" },
        { id: "41", from: "46", to: "47", label: "" },
        { id: "42", from: "47", to: "48", label: "" },
        { id: "43", from: "1", to: "9", label: "" },
        { id: "44", from: "9", to: "17", label: "" },
        { id: "45", from: "17", to: "25", label: "Espinar" },
        { id: "46", from: "25", to: "33", label: "Comandante" },
        { id: "47", from: "33", to: "41", label: "Av." },
        { id: "48", from: "8", to: "16", label: "" },
        { id: "49", from: "16", to: "24", label: "" },
        { id: "50", from: "24", to: "32", label: "" },
        { id: "51", from: "32", to: "40", label: "Arequipa" },
        { id: "52", from: "40", to: "48", label: "Av." },
        { id: "53", from: "2", to: "10", label: "" },
        { id: "54", from: "3", to: "11", label: "" },
        { id: "55", from: "4", to: "12", label: "" },
        { id: "56", from: "5", to: "13", label: "" },
        { id: "57", from: "6", to: "14", label: "" },
        { id: "58", from: "7", to: "15", label: "" },
        { id: "59", from: "10", to: "18", label: "" },
        { id: "60", from: "11", to: "19", label: "" },
        { id: "61", from: "12", to: "20", label: "" },
        { id: "62", from: "13", to: "21", label: "" },
        { id: "63", from: "14", to: "22", label: "" },
        { id: "64", from: "15", to: "23", label: "Atahualpa" },
        { id: "65", from: "18", to: "26", label: "Arica" },
        { id: "66", from: "19", to: "27", label: "Aguirre" },
        { id: "67", from: "20", to: "28", label: "" },
        { id: "68", from: "21", to: "29", label: "Indep." },
        { id: "69", from: "22", to: "30", label: "" },
        { id: "70", from: "23", to: "31", label: "" },
        { id: "71", from: "26", to: "34", label: "jr." },
        { id: "72", from: "27", to: "35", label: "Elias" },
        { id: "73", from: "28", to: "36", label: "" },
        { id: "74", from: "29", to: "37", label: "" },
        { id: "75", from: "30", to: "38", label: "Coronel" },
        { id: "76", from: "31", to: "39", label: "" },
        { id: "77", from: "34", to: "42", label: "" },
        { id: "78", from: "35", to: "43", label: "" },
        { id: "79", from: "36", to: "44", label: "" },
        { id: "80", from: "37", to: "45", label: "" },
        { id: "81", from: "38", to: "46", label: "" },
        { id: "82", from: "39", to: "47", label: "" },
    ];

    for (var i = 1; i < size; i++)
        for (var j = 1; j < size; j++) {
            if (distancias[i][j] == null) distancias[i][j] = distancia2(i, j);
        }
}
//Distancia de coordenadas
function distancia2(i, j) {
    return Math.sqrt(
        (ciudades[i - 1].x - ciudades[j - 1].x) * (ciudades[i - 1].x - ciudades[j - 1].x) +
            (ciudades[i - 1].y - ciudades[j - 1].y) * (ciudades[i - 1].y - ciudades[j - 1].y)
    );
}

function show_distancias(size) {
    var nodes_tmp = nodes.get();
    var s = "";
    for (var i = 1; i < size; i++) s = s + nodes_tmp[i - 1].label + ": " + distancias[i][destino] + "\n";
    $("#Distancias").html(s);
}

function mostrar_recorrido(){
    var s = "Recorrido\n\n\n";
    s = s + recorrido;
    $("#Ruta").html(s);
}


function obtener_relaciones() {
    var lados = edges.get();
    //lados hace referencias a todas las 82 relaciones existenes entre nodo y nodo
    //gr almacena la etiqueta que hay entre nodo y nodo
    gr = new Array(ID_nodo);
    for (var i = 0; i < ID_nodo; i++) gr[i] = new Array(ID_nodo);

    for (var i = 0; i < lados.length; i++) {
        gr[parseInt(lados[i].from)][parseInt(lados[i].to)] = lados[i].label;
        gr[parseInt(lados[i].to)][parseInt(lados[i].from)] = lados[i].label;
    }
}

function actualiza_select() {
    var nodes_tmp = nodes.get();

    $("#Origen").empty();
    $("#Destino").empty();

    for (var i = 0; i < nodes_tmp.length; i++) {
        $("#Origen").append($("<option>", { value: nodes_tmp[i].id, text: nodes_tmp[i].id }));
        $("#Destino").append($("<option>", { value: nodes_tmp[i].id, text: nodes_tmp[i].id }));
    }

    console.log("actualiza_select");
}

function load_main() {
    graph();
    nodes.add(ciudades);
    edges.add(relaciones);
}

function load_vis(st) {
    var container = $("#network").get(0);

    nodes = new vis.DataSet();
    edges = new vis.DataSet();

    if (st == true) load_main();

    obtener_relaciones();

    console.log("Estado: " + st);
    // create a network

    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        width: "100%",
        height: "500px",
        smoothCurves: false,

    };

    network = new vis.Network(container, data, options);
}

function button_function() {
    $("#Origen").change(function () {
        origen = $("#Origen").val();
        destino = $("#Destino").val();
        show_distancias(ID_nodo);
    });

    $("#Destino").change(function () {
        origen = $("#Origen").val();
        destino = $("#Destino").val();
        show_distancias(ID_nodo);
    });

    $("#Start").click(function () {
        console.log("Start");
        better_first();
    });

    $("#New_map").click(function () {
        console.log("Actualizar");
        window.location.reload()
    });

}

$(window).load(function () {
    disable_buttons();

    load_vis(true);
    show_distancias(size);

    button_function();
});
