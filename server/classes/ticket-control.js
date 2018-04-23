const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        // si es el mismo día de trabajo,  hay que
        // continuar con los tickets del día
        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            // Es un día nuevo. Reinicializar los tickets
            this.reiniciarConteo();
        }
    }

    // Aumentamos en 1 el ultimo ticket
    siguiente() {
        // aumentamos en 1 el último ticket
        this.ultimo += 1;

        // Creamos un nuevo ticket
        let ticket = new Ticket(this.ultimo, null);
        // lo añadims al arreglo de tickets
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        // Obtener el primer ticket de la lista
        let numeroTicket = this.tickets[0].numero;
        // eliminar el primer ticket del arreglo
        this.tickets.shift();

        // generamos un nuevo ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // añadir atenderTicket al inicio del arreglo ultimos4
        this.ultimos4.unshift(atenderTicket);
        // si el arreglo es mayor a 4 borrar el último elemento del arreglo
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        // grabar json en data
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}



module.exports = {
    TicketControl
};