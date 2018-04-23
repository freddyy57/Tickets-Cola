// Comando para establecer la conexión
var socket = io();

// Obtener los parámetros
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

// Obtener los valores del parámetro que viene con escritorio
var escritorio = searchParams.get('escritorio');
var label = $('small');

// console.log(escritorio);
// Asignar el valor de escritorio a la etiqueta h1
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {
        console.log(res);
        if (res.numero === undefined) {
            label.text(res);
            return;
        } else {
            label.text('Ticket: ' + res.numero);
        }
    });
});