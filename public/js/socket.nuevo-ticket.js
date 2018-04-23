// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', (client) => {
    console.log('Perdimos conexión con el servidor');
});


$('button').on('click', function() {
    // enviar mensaje
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});

// recibir mensaje Servidor estadoActual
socket.on('estadoActual', function(res) {
    console.log('Servidor: ', res);
    label.text(res.estado_actual);
});