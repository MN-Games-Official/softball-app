const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { pipeline } = require('@huggingface/transformers');

const app = express();
app.use(bodyParser.json());

const HF_API_KEY = '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';  // Replace with your Hugging Face API key

// Example of using a Hugging Face model
const generateLineupModel = async (players) => {
    const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: players })
    });
    const data = await response.json();
    return data;  // Adjust based on your model's output format
};

app.post('/generate-lineup', async (req, res) => {
    const { players } = req.body;
    try {
        const lineup = await generateLineupModel(players);
        res.json(lineup);
    } catch (error) {
        res.status(500).send('Error generating lineup');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
