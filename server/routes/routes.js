const productController = require("../controllers/products");

function initialize(app) {
  app.post("/product", productController.createProduct);
  app.get("/product/list", productController.getProducts);
  app.get("/product/:productId", productController.getProductById);
  app.put("/product/:productId", productController.updateProduct);
  app.delete("/product/:productId", productController.deleteProduct);

  app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
  });
}

exports.initialize = initialize;
