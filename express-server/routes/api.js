// Importando as dependencias
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const dbHost = 'mongodb://database/projeto-node';


mongoose.connect(dbHost);


const usuarioSchema = new mongoose.Schema({
  nome_usuario: String,
  idade: Number,
  telefone: Number,
  cpf: String,
  id_usuario_git_hub: String
});


const Usuario = mongoose.model('Usuario', usuarioSchema);



router.get('/', (req, res) => {
        res.send('api works');
});

/* GET all usuarios. */
router.get('/usuarios', (req, res) => {
    Usuario.find({}, (err, usuarios) => {
        if (err) res.status(500).send(error)

        res.status(200).json(usuarios);
    });
});


router.get('/usuarios/:id', (req, res) => {
    Usuario.findById(req.param.id, (err, usuarios) => {
        if (err) res.status(500).send(error)

        res.status(200).json(usuarios);
    });
});


router.post('/usuarios', (req, res) => {
    let usuario = new Usuario({
        nome_usuario: req.body.nome_usuario,
        idade: req.body.idade,
        telefone: req.body.telefone,
        cpf: req.body.cpf,
        id_usuario_git_hub: req.body.id_usuario_git_hub
    });

    usuario.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'Usuario criado com sucesso'
        });
    });
});

module.exports = router;