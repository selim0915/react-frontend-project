const path = require('path');
const productController = require('./controller/products');

function initialize(app) {
  app.post('/product', productController.createProduct);
  app.get('/product/list', productController.getProducts);
  app.get('/product/:productId', productController.getProductById);
  app.put('/product/:productId', productController.updateProduct);
  app.delete('/product/:productId', productController.deleteProduct);

  app.get('/hello', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/images/ST/netflix.png'), {}, (err) => {
      if (err) {
        console.error('err', err);
        res.status(404).send('no such file or directory.');
      }
    });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), {}, function (err) {
      if (err) {
        console.error('err', err);
        res.sendStatus(err.status).end();
      }
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
  });
}

exports.initialize = initialize;
