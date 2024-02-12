const path = require('path');
const productController = require('./controller/products');

function initialize(app) {
  app.get('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), {}, function (err) {
      if (err) {
        console.error('err', err);
        res.sendStatus(err.status).end();
      }
    });
  });

  app.get('/src/images/ST/*', (req, res) => {
    let _path = req.path;
    let _pathPosition = _path.lastIndexOf('/') + 1;
    let _pathList = _path.split('/');
    let _fileName = _path.substring(_pathPosition);
    let _ST_filePath = path.join(__dirname, 'src/images/ST');
    // let _ST_filePath2 = _pathList[_pathList.length - 2] !== 'ST' ? _pathList[_pathList.length - 2] : '';
    // res.sendFile(path.join(_ST_filePath, _ST_filePath2, _fileName), {}, (err) => {
    res.sendFile(path.join(_ST_filePath, _fileName), {}, (err) => {
      if (err) {
        console.error('err', err);
        res.status(404).send('no such file or directory.');
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
