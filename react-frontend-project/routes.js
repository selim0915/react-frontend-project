const path = require('path');
const productController = require('./controller/products');

function initialize(app) {
  app.get('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'public/index.html'), {}, function (err) {
      if (err) {
        console.error('err', err);
        res.sendStatus(err.status).end();
      }
    });
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'), {}, function (err) {
      if (err) {
        console.error('err', err);
        res.sendStatus(err.status).end();
      }
    });
  });

  app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'), {}, function (err) {
      if (err) {
        console.error('err', err);
        res.sendStatus(err.status).end();
      }
    });
  });

  app.post('/', productController.createProduct);
  app.get('/', productController.getProducts);
  app.get('/:productId', productController.getProductById);
  app.put('/:productId', productController.updateProduct);
  app.delete('/:productId', productController.deleteProduct);

  app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
  });
}

exports.initialize = initialize;
