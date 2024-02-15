const path = require('path');
const productController = require('./controller/products');

function initialize(app) {
  app.get('/hello', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/images/ST/netflix.png'), {}, (err) => {
      if (err) {
        console.error('err', err);
        res.status(404).send('no such file or directory.');
      }
    });
  });

  app.post('/', productController.createProduct);
  app.get('/', productController.getProducts);
  app.get('/:productId', productController.getProductById);
  app.put('/:productId', productController.updateProduct);
  app.delete('/:productId', productController.deleteProduct);

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
