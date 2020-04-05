var socket = io();

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', () => {
    socket.emit('atenderTicket', { escritorio }, (resp) => {
        console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text(resp.numero);
    });
});