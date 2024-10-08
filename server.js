import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = 5000; // Set your desired port here

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const mongoUrl = 'mongodb://localhost:27017/user2'; // Your MongoDB URL
const client = new MongoClient(mongoUrl);

async function run() {
    try {
        await client.connect();
        const database = client.db('user2'); // Replace with your database name
        const collection = database.collection('ally'); // Replace with your collection name

        // Example API Endpoint to fetch data
        app.get('/api/data', async (req, res) => {
            try {
                const data = await collection.find().toArray();
                res.json(data);
            } catch (error) {
                //res.status(500).json({ error: 'Failed to fetch data' });
            }
        });

        // Example API Endpoint to add data
        app.post('/api/data', async (req, res) => {
            const newData = req.body; // Expecting JSON body
            try {
                const result = await collection.insertOne(newData);
                res.status(201).json(result);
            } catch (error) {
                res.status(500).json({ error: 'Failed to insert data' });
            }
        });

        // Root route
        app.get('/', (req, res) => {
            res.send('Welcome to the API!'); // Response for the root URL
        });

        // More endpoints can be added here...

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    run().catch(console.dir);
});
