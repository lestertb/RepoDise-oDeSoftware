//Constantes
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//Usar las rutas
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Config FireBase
const admin = require('firebase-admin');

var serviceAccount = require('../configFireBase/fir-angular-auth-cdb4a-firebase-adminsdk-b03l1-693344e399.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-angular-auth-cdb4a-default-rtdb.firebaseio.com/'
})

const PoolFirestore = admin.firestore();


//Inicio endpoints
router.post('/Partida', (req,res) => {
  const idJugador1 = req.body.idJugador1;
  const nombreJugador1 = req.body.nombreJugador1;
  const idJugador2 = req.body.idJugador2;
  const nombreJugador2 = req.body.nombreJugador2;

  if (!idJugador1 || !nombreJugador1 || !idJugador2 || !nombreJugador2) return res.status(400).json({mensaje:"Faltan datos para iniciar la partida"});

  PoolFirestore.collection('Partida').add({

    Tablero : {
      0:[0,0,0,0,0,0,0,0],
      1:[0,0,0,0,0,0,0,0],
      2:[0,0,0,0,0,0,0,0],
      3:[0,0,0,1,2,0,0,0],
      4:[0,0,0,2,1,0,0,0],
      5:[0,0,0,0,0,0,0,0],
      6:[0,0,0,0,0,0,0,0],
      7:[0,0,0,0,0,0,0,0]
    },

    TableroTam: 8,

    Jugador1 :{
      id: idJugador1,
      nombre: nombreJugador1,
      puntosTotal: 2
    },

    Jugador2 :{
      id: idJugador2,
      nombre: nombreJugador2,
      puntosTotal: 2
    }

  }).then(response => {
    if (response){
      var idGame = response._path.segments[1];
      return res.status(200).json({mensaje:"La partida se generó correctamente", idGame: idGame});
    }
    else
      return res.status(200).json({mensaje:"Indefinido"});

  }).catch(err => {
    console.log(err);
  })
})

router.get('/PartidaXID', (req,res) => {
    const idPartida = req.query.idPartida;

    if (!idPartida) return res.status(400).json({mensaje:"Faltan datos"});

    PoolFirestore.collection('Partida').doc(idPartida).get().then(pool => {

      if (pool)
        return res.status(200).json({InfoPartida: pool.data()});
      else
        return res.status(200).json({mensaje:"Indefinido"});

    }).catch(err => {
      console.log(err);
    })
})

router.put('/guardarJugada', (req,res) => {
    const idPartida = req.body.idPartida;
    const Tablero = req.body.Tablero;
    const Jugador1 = req.body.Jugador1;
    const Jugador2 = req.body.Jugador2;
    if (!idPartida || !Tablero || !Jugador1 || !Jugador2)
      return res.status(400).json({mensaje:"Faltan datos"});

    PoolFirestore.collection('Partida').doc(idPartida).update({

      Tablero,
      Jugador1,
      Jugador2

  }).then(response => {
    if (response)
      return res.status(200).json({mensaje:"Jugada guardada"});
    else
      return res.status(200).json({mensaje:"Indefinido"});

  }).catch(err => {
    console.log(err);
  })
})

router.put('/PartidaXID', (req,res) => {
    const idPartida = req.body.idPartida;
    //const tablero = req.body.tablero;
    const idJugador1 = req.body.idJugador1;
    const nombreJugador1 = req.body.nombreJugador1;
    const puntosJugador1 = req.body.puntosJugador1;
    const idJugador2 = req.body.idJugador2;
    const nombreJugador2 = req.body.nombreJugador2;
    const puntosJugador2 = req.body.puntosJugador2;
    if (!idPartida || !idJugador1 || !nombreJugador1 || !puntosJugador1 || !idJugador2 || !nombreJugador2 || !puntosJugador2)
      return res.status(400).json({mensaje:"Faltan datos"});

    PoolFirestore.collection('Partida').doc(idPartida).update({

    Tablero : {
      0:[0,0,0,0,0,0,0,0],
      1:[0,0,0,0,0,0,0,0],
      2:[0,0,0,0,0,0,0,0],
      3:[0,0,0,0,0,0,0,0],
      4:[0,0,0,0,0,0,0,0],
      5:[0,0,0,0,0,0,0,0],
      6:[0,0,0,0,0,0,0,0],
      7:[0,0,0,0,0,0,0,0]
    },

    Jugador1 :{
      id: idJugador1,
      nombre: nombreJugador1,
      puntosTotal: puntosJugador1
    },

    Jugador2 :{
      id: idJugador2,
      nombre: nombreJugador2,
      puntosTotal: puntosJugador2
    }


  }).then(response => {
    if (response)
      return res.status(200).json({mensaje:"La partida se modificó correctamente"});
    else
      return res.status(200).json({mensaje:"Indefinido"});

  }).catch(err => {
    console.log(err);
  })
})




module.exports = router;
