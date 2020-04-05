var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (resp) => {
        console.log(resp);
        label.text(resp);
    });
});

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});