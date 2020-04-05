const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl;

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        console.log(`Se pidió un ticket...`);

        let ticket = ticketControl.siguiente();

        console.log(ticket);

        callback(ticket);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                message: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        callback(atenderTicket);
    });

});