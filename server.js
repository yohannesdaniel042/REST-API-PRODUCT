
import express from 'express';
import 'dotenv/config';
import { Client } from 'pg';

const app = express();
const port = 3000;

app.use(express.json());

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});
app.get('/', (req, res) => {
    res.send('The API is running');
});

app.get('/products', async (req, res) => {
    const result = await db.query('SELECT * FROM products');
    res.json(result.rows);
});
app.post('/products', async (req, res) => {
    const { product_name, price } = req.body;
    if (!product_name || typeof product_name !== 'string' || product_name.trim() === '') {
        return res.status(400).json({
            message: 'Product name is required'
        });
    }

    if (price === undefined || typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
            message: 'Price must be a positive number'
        });
    }


    const cleanName = product_name.trim();

    const result = await db.query(
        'INSERT INTO products (product_name, price) VALUES ($1, $2) RETURNING *',
        [cleanName, price]
    );

    res.status(201).json(result.rows[0]);
});

db.connect()
    .then(() => {
        console.log('Connected to PostgreSQL successfully!');

        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
    });