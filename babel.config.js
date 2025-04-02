module.exports = {
    presets: [
      ['@babel/preset-env', { 
        targets: { node: 'current' }, // Para que funcione com a versão atual do Node.js
        modules: 'commonjs' // Isso força a conversão de módulos para CommonJS
      }]
    ]
  };
  