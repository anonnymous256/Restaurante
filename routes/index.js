var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/Cardapio', function(req, res) {
  res.render('Restaurante/Cardapio');
});

router.get('/Carrinho', function(req, res) {
  res.render('Restaurante/Carrinho');
});

router.get('/Dashboard', function(req, res) {
  res.render('Administrador/Dashboard');
});

router.get('/Criar', function(req, res) {
  res.render('Administrador/AddPrato');
});

router.get('/vizualizar', function(req, res) {
  res.render('Administrador/VizualizarPratos');
});

router.get('/Clientes', function(req, res) {
  res.render('Administrador/Clientes');
});

router.get('/Funcionarios', function(req, res) {
  res.render('Administrador/Funcionarios');
});

module.exports = router;
