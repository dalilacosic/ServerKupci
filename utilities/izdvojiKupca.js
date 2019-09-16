// Function for restriction of user info
module.exports = (kupac) => {
    return kupac.map(x => ({
        kupac: {
            ime: x.ime,
            id: x._id,
            masa: x.masa,
            volumen: x.volumen,
            adresa: x.adresa,

            longituda: x.longituda,
            latituda: x.latituda }
    }));
};