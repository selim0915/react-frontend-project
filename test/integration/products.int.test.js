const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

it("POST /api/products", async () => {
    const response = await request(app)
        .post("/api/products")
        .send(newProduct);
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name) // 필수값 체크
    expect(response.body.description).toBe(newProduct.description) // 필수값 체크
})

it("should return 500 on POST /api/products", async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: "phone" }) // 한 값만 필어온 경우 ...
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required." })
})

it("GET /api/products", async () => {
    const response = await request(app)
        .get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0]
})

it("GET /api/product/:productId", async () => {
    const response = await request(app)
        .get('/api/products/' + firstProduct._id)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(firstProduct.name)
    expect(response.body.description).toBe(firstProduct.description)
})