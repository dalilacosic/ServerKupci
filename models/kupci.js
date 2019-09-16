const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Sema = mongoose.Schema;

const korisnikSema = new Sema({
    ime: {
        type: String,
    },
    masa: {
        type: String,
    },
    volumen: {
        type: String,
    },
    adresa: {
        type: String,
    },
    longituda: { type: mongoose.Schema.Types.Double},
    latituda: { type: mongoose.Schema.Types.Double}
},{
    timestamps: true
});

module.exports = mongoose.model('Korisnik', korisnikSema);