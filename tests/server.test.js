const supertest = require("supertest");
const Server = require("../models/server");
const server = new Server();
let token = {};
beforeAll((done) => {
    console.log("beforeEach");
    server.dbConnection();
    done();
});

afterAll((done) => {
    console.log("afterEach");
    server.deleteCloseDB();
    done();
});

test("POST /api/users", async () => {
    const post = {
        email: "gerardo.marquez.carmona@gmail.com",
        full_name: "Gerardo Marquez Carmona",
        password: "GERardo123"
    };

    const response = await supertest(server.app)
        .post('/api/users')
        .send(post);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(post.email);
    expect(response.body.full_name).toBe(post.full_name);
});


test("POST /api/auth/login", async () => {
    const post = {
        email: "gerardo.marquez.carmona@gmail.com",
        password: "GERardo123"
    };

    const response = await supertest(server.app)
        .post('/api/auth/login')
        .send(post);
    //console.log(response);
    this.token = response.body;
    expect(response.status).toBe(200);
});

test("POST /api/orders", async () => {
    const post = {
        client_name: "Gerardo Marquez Carmona",
        total_price: "200",
        products: [
            {
                name: "Producto 1",
                price: 100,
                quantity: 2
            }
        ]
    };
    const response = await supertest(server.app)
        .post('/api/orders')
        .set('x-token', this.token.token)
        .send(post);
    expect(response.status).toBe(200);
});

test("POST /api/orders", async () => {
    const post = {
        client_name: "Gerardo Marquez Carmona",
        total_price: "200",
        products: [
            {
                name: "Producto 1",
                price: 100,
                quantity: 3
            }
        ]
    };
    const response = await supertest(server.app)
        .post('/api/orders')
        .set('x-token', this.token.token)
        .send(post);
    expect(response.status).toBe(400);
});