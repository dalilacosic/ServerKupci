var express = require('express');
var router = express.Router();
const Kupac = require('../models/kupci');
const izdvojiKorisnika = require('../utilities/izdvojiKupca');


router.get('/vratiKupce', async (req, res, next) => {
  try {
    const result = await Kupac.find();
    const kupci = izdvojiKorisnika(result);
    //console.log(users);
    res.status(200).json({ kupci });
  } catch(err) {
    res.status(500).json({ msg:'Greska na serveru' });
  }
});

router.post('/registracija', async (req, res, next) => {
      let ime = req.body.ime;
      let masa = req.body.masa;
      let volumen = req.body.volumen;
      let adresa = req.body.adresa;
      let latituda = req.body.latituda;
      let longituda = req.body.longituda;

      const errors = req.validationErrors();
      if (errors) {
        res.status(400).json(errors);
      } else {
        try {
          let korisnik = new Korisnik({
            ime: ime,
            masa: masa,
            volumen: volumen,
            adresa: adresa,
            latituda: latituda,
            longituda: longituda,
          });
          let result = await korisnik.save();
          res.status(200).json({msg: 'Success'});
        } catch (err) {
          console.log(err);
          res.status(409).json({msg: err.errmsg || 'Conflict!'});
        }
      }
    }
);


router.delete('/obrisi/:id', async function(req, res, next){
  //console.log(req.params.id);
  const kupac = await Kupac.findByIdAndDelete(req.params.id);

  res.status(200).json(kupac);
});

module.exports = router;