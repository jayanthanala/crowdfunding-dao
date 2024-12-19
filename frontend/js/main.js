// Contract Configuration
console.log('main.js loaded successfully');

// Rest of your main.js code...
const contractAddress = "0xFf40429Dba1aeC59CB3d8FAEcB68F56a1B89d284"; // Replace with your deployed contract address
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "contributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ContributionMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "FundsWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fundingGoal",
        "type": "uint256"
      }
    ],
    "name": "ProjectCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "ProposalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      }
    ],
    "name": "ProposerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      }
    ],
    "name": "ProposerRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "support",
        "type": "bool"
      }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "projectCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projects",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "fundingGoal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "funded",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "proposalCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "votesFor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "votesAgainst",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "executed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "proposers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_proposer",
        "type": "address"
      }
    ],
    "name": "addProposer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_proposer",
        "type": "address"
      }
    ],
    "name": "removeProposer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_fundingGoal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_durationInDays",
        "type": "uint256"
      }
    ],
    "name": "createProject",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_projectId",
        "type": "uint256"
      }
    ],
    "name": "contribute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_projectId",
        "type": "uint256"
      }
    ],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_projectId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "createProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_support",
        "type": "bool"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_projectId",
        "type": "uint256"
      }
    ],
    "name": "getProject",
    "outputs": [
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "fundingGoal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "funded",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_projectId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_contributor",
        "type": "address"
      }
    ],
    "name": "getContribution",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "votesFor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "votesAgainst",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "executed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
let provider;
let signer;
let contract;
let userAddress;

// Wallet Connection
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask to use this dApp');
            return;
        }

        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        userAddress = accounts[0];
        
        // Update UI with connected wallet address
        document.getElementById('wallet-address').textContent = 
            `Connected: ${userAddress.substring(0, 6)}...${userAddress.substring(38)}`;

        // Setup ethers providers and contract
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Load projects after connecting
        await loadProjects();
        
        // Enable create project form
        document.getElementById('create-project-form').classList.remove('disabled');
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet');
    }
}

// Project Creation
async function createProject(event) {
    event.preventDefault();
    
    if (!contract) {
        alert('Please connect your wallet first');
        return;
    }

    const name = document.getElementById('project-name').value;
    const description = document.getElementById('project-description').value;
    const fundingGoal = document.getElementById('funding-goal').value;
    const duration = document.getElementById('duration').value;

    if (!name || !description || !fundingGoal || !duration) {
        alert('Please fill in all fields');
        return;
    }

    try {
        // Show loading state
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Creating...';

        // Create project transaction
        const tx = await contract.createProject(
            name,
            description,
            ethers.utils.parseEther(fundingGoal),
            duration
        );
        
        // Wait for transaction confirmation
        await tx.wait();
        
        // Reset form and update UI
        event.target.reset();
        alert('Project created successfully!');
        await loadProjects();
    } catch (error) {
        console.error('Error creating project:', error);
        alert('Failed to create project: ' + error.message);
    } finally {
        // Reset button state
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Create Project';
    }
}

// Project Contribution
async function contribute(projectId) {
    if (!contract) {
        alert('Please connect your wallet first');
        return;
    }

    const contributionInput = document.getElementById(`contribute-${projectId}`);
    const amount = contributionInput.value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid contribution amount');
        return;
    }

    try {
        // Show loading state
        const contributeButton = contributionInput.nextElementSibling;
        contributeButton.disabled = true;
        contributeButton.textContent = 'Contributing...';

        // Send contribution transaction
        const tx = await contract.contribute(projectId, {
            value: ethers.utils.parseEther(amount)
        });
        
        // Wait for transaction confirmation
        await tx.wait();
        
        // Reset input and update UI
        contributionInput.value = '';
        alert('Contribution successful!');
        await loadProjects();
    } catch (error) {
        console.error('Error contributing:', error);
        alert('Failed to contribute: ' + error.message);
    } finally {
        // Reset button state
        const contributeButton = contributionInput.nextElementSibling;
        contributeButton.disabled = false;
        contributeButton.textContent = 'Contribute';
    }
}

// Load and Display Projects
async function loadProjects() {
    if (!contract) return;

    const container = document.getElementById('projects-container');
    const loader = document.getElementById('loader');
    
    try {
        // Show loading state
        loader.style.display = 'block';
        container.innerHTML = '';

        // Get total number of projects
        const projectCount = await contract.projectCount();
        
        // Load each project's details
        for (let i = 0; i < projectCount; i++) {
            const project = await contract.getProject(i);  // Changed from getProjectDetails to getProject
            const fundingGoal = ethers.utils.formatEther(project.fundingGoal);
            const currentAmount = ethers.utils.formatEther(project.currentAmount);
            const progress = (currentAmount / fundingGoal) * 100;
            
            // Format deadline date
            const deadline = new Date(project.deadline * 1000);
            const isExpired = deadline < new Date();

            // Create project card
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card';
            projectElement.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <p>Created by: ${project.creator}</p>
                <p>Goal: ${fundingGoal} ETH</p>
                <p>Current: ${currentAmount} ETH</p>
                <div class="progress">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                <p>Progress: ${progress.toFixed(2)}%</p>
                <p>Deadline: ${deadline.toLocaleDateString()} ${deadline.toLocaleTimeString()}</p>
                ${!project.funded && !isExpired ? `
                    <div class="contribute-form">
                        <input type="number" 
                            id="contribute-${i}" 
                            step="0.01" 
                            placeholder="Amount in ETH"
                            class="contribute-input"
                        >
                        <button onclick="contribute(${i})" class="contribute-button">
                            Contribute
                        </button>
                    </div>
                ` : `
                    <p class="status-text ${project.funded ? 'success' : 'error'}">
                        ${project.funded ? 'Funded!' : 'Expired'}
                    </p>
                `}
            `;
            container.appendChild(projectElement);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="error">Error loading projects</p>';
    } finally {
        loader.style.display = 'none';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Connect wallet button
    document.getElementById('connect-wallet').addEventListener('click', connectWallet);
    
    // Create project form
    document.getElementById('create-project-form').addEventListener('submit', createProject);
    
    // MetaMask account change
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            if (accounts.length === 0) {
                // Handle disconnected state
                userAddress = null;
                document.getElementById('wallet-address').textContent = 'Not connected';
                document.getElementById('create-project-form').classList.add('disabled');
            } else {
                // Reconnect with new account
                connectWallet();
            }
        });

        window.ethereum.on('chainChanged', function() {
            // Reload page on network change
            window.location.reload();
        });
    }
});

// Export functions for external use if needed
window.connectWallet = connectWallet;
window.createProject = createProject;
window.contribute = contribute;