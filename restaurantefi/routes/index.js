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

module.exports = router;
