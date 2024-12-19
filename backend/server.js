const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Import the full contract artifact
const DAOCrowdfunding = require('../build/contracts/DAOCrowdfunding.json');

// Verify environment variables
console.log(process.env)
if (!process.env.CONTRACT_ADDRESS) {
    console.error('CONTRACT_ADDRESS not found in environment variables');
    process.exit(1);
}

if (!process.env.RPC_URL) {
    console.error('RPC_URL not found in environment variables');
    process.exit(1);
}

// Print configuration for debugging
console.log('Contract Address:', process.env.CONTRACT_ADDRESS);
console.log('RPC URL:', process.env.RPC_URL);

// Read-only provider
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Initialize contract
let contract;
try {
    contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        DAOCrowdfunding.abi,
        provider
    );
} catch (error) {
    console.error('Error initializing contract:', error);
    process.exit(1);
}

// Read-only endpoints
app.get('/api/projects', async (req, res) => {
    try {
        const projectCount = await contract.projectCount();
        const projects = [];

        for (let i = 0; i < projectCount; i++) {
            const project = await contract.getProject(i);
            projects.push({
                id: i,
                creator: project.creator,
                name: project.name,
                description: project.description,
                fundingGoal: ethers.utils.formatEther(project.fundingGoal),
                currentAmount: ethers.utils.formatEther(project.currentAmount),
                deadline: new Date(project.deadline * 1000),
                funded: project.funded
            });
        }

        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get contract info
app.get('/api/contract-info', (req, res) => {
    res.json({
        address: process.env.CONTRACT_ADDRESS,
        abi: DAOCrowdfunding.abi
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});