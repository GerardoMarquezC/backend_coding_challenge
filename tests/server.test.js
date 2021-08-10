const app = require("../app");
const Order = require("../models/order");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
    mongoose.connect(process.env.MONGODB_CNN,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

test("POST /api/orders", async () => {
    const post = await Order.create({
        client_name: "Gerardo Marquez Carmona",
        total_price: "200",
        products: [
            {
                name: "Producto 1",
                quantity: 2,
                price: 100
            }
        ]
    });

    await supertest(app).post("/api/posts")
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);

            // Check data
            expect(response.body[0]._id).toBe(post.id);
            expect(response.body[0].title).toBe(post.title);
            expect(response.body[0].content).toBe(post.content);
        });
});