//Constantes
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//Config FireBase
const admin = require('firebase-admin');

var serviceAccount = require("../configFireBase/fir-angular-auth-cdb4a-firebase-adminsdk-b03l1-693344e399.json");

admin.initializeApp({
  credencial: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-angular-auth-cdb4a-default-rtdb.firebaseio.com/'
})

const db = admin.database();

//Usar las rutas
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Obtener centro de costos

router.get('/', (req, res) => {
  //db.ref('fir-angular-auth-cdb4a-default-rtdb').once('value', (snapshot) => {
    //const data = snapshot.val();
    res.send('Entré');
  //});
});

router.post('/', (req, res) => {
  const newUser = {
    correo: req.body.correo,
    nombre: req.body.nombre
  }
  //res.send(newUser.correo + newUser.nombre);
  db.ref('contact').push(newUser);
  res.send('Funca');
});

// router.get('/', (req, res) => {
//   routePool.connect().then(pool => {
//     return pool.request()
//     .execute('obtenerCentroCosto')
//   }).then(val => {
//     routePool.close();
//     if (val.recordset === undefined) return res.status(404).json({mensaje:"No hay datos"});
//     //Este console.log es para saber el formato en que lo mando
//     return res.status(200).json(val.recordset);
//   }).catch(err => {
//     routePool.close();
//     console.error(err);
//     err.status = 500;
//     return next(err);
//   });
//
// });

module.exports = router;
