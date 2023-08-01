// codigo da monitoria

const { PrismaClient } = require('@prisma/client');
const express = require('express')

const app = express();
app.use(express.json());

const prismaClient = new PrismaClient();

app.get("/", (req, res) => {
    return res.json({
        message: "hello world"
    })
})

// POST books
app.post("/books", async (req, res) => {
    const {name, author, rate, comment} = req.body;

    const data = await prismaClient.books.create({
        data: {
            name,
            author,
            rate,
            comment
        }
    })

    res.status(201).json(data);
})

// GET books
app.get("/books", async (req, res) => {
    const result = await prismaClient.books.findMany();

    res.status(200).json(result);
})

// GET por id
app.get("/books/:id", async (req, res) => {
    const {id} = req.params;

    const data = await prismaClient.books.findUnique({where: {id: parseInt(id)}});

    res.status(200).json(data);
})

app.listen(3001);
