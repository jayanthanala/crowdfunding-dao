// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAOCrowdfunding {
    address public owner;
    mapping(address => bool) public proposers;
    
    struct Project {
        address creator;
        string name;
        string description;
        uint256 fundingGoal;
        uint256 currentAmount;
        uint256 deadline;
        bool funded;
        mapping(address => uint256) contributions;
    }
    
    struct Proposal {
        uint256 projectId;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;  // Fixed the variable name here
        uint256 deadline;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    mapping(uint256 => Project) public projects;
    mapping(uint256 => Proposal) public proposals;
    uint256 public projectCount;
    uint256 public proposalCount;
    
    event ProjectCreated(uint256 projectId, string name, uint256 fundingGoal);
    event ContributionMade(uint256 projectId, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 projectId, uint256 amount);
    event ProposalCreated(uint256 proposalId, uint256 projectId, string description);
    event Voted(uint256 proposalId, address voter, bool support);
    event ProposerAdded(address proposer);
    event ProposerRemoved(address proposer);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyProposer() {
        require(proposers[msg.sender], "Only proposer can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        proposers[msg.sender] = true;
        projectCount = 0;
        proposalCount = 0;
    }
    
    function addProposer(address _proposer) external onlyOwner {
        proposers[_proposer] = true;
        emit ProposerAdded(_proposer);
    }
    
    function removeProposer(address _proposer) external onlyOwner {
        proposers[_proposer] = false;
        emit ProposerRemoved(_proposer);
    }
    
    function createProject(
        string memory _name,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _durationInDays
    ) public returns (uint256) {
        require(_fundingGoal > 0, "Funding goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");
        
        uint256 projectId = projectCount;
        Project storage project = projects[projectId];
        
        project.creator = msg.sender;
        project.name = _name;
        project.description = _description;
        project.fundingGoal = _fundingGoal;
        project.deadline = block.timestamp + (_durationInDays * 1 days);
        project.funded = false;
        
        projectCount += 1;
        
        emit ProjectCreated(projectId, _name, _fundingGoal);
        return projectId;
    }
    
    function contribute(uint256 _projectId) public payable {
        require(_projectId < projectCount, "Project does not exist");
        Project storage project = projects[_projectId];
        
        require(msg.value > 0, "Must send some ETH");
        require(block.timestamp < project.deadline, "Project funding period has ended");
        
        project.contributions[msg.sender] += msg.value;
        project.currentAmount += msg.value;
        
        if (project.currentAmount >= project.fundingGoal) {
            project.funded = true;
        }
        
        emit ContributionMade(_projectId, msg.sender, msg.value);
    }
    
    function withdrawFunds(uint256 _projectId) public {
        Project storage project = projects[_projectId];
        require(msg.sender == project.creator, "Only project creator can withdraw");
        require(project.funded, "Project is not fully funded");
        
        uint256 amount = project.currentAmount;
        project.currentAmount = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(_projectId, amount);
    }
    
    function createProposal(
        uint256 _projectId,
        string memory _description
    ) public onlyProposer returns (uint256) {
        require(_projectId < projectCount, "Project does not exist");
        
        uint256 proposalId = proposalCount;
        Proposal storage proposal = proposals[proposalId];
        
        proposal.projectId = _projectId;
        proposal.description = _description;
        proposal.deadline = block.timestamp + 7 days;
        proposal.executed = false;
        
        proposalCount += 1;
        
        emit ProposalCreated(proposalId, _projectId, _description);
        return proposalId;
    }
    
    function vote(uint256 _proposalId, bool _support) public {
        require(_proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];
        
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(block.timestamp < proposal.deadline, "Voting period has ended");
        require(!proposal.executed, "Proposal already executed");
        
        if (_support) {
            proposal.votesFor += 1;
        } else {
            proposal.votesAgainst += 1;  // Fixed the typo here
        }
        
        proposal.hasVoted[msg.sender] = true;
        
        emit Voted(_proposalId, msg.sender, _support);
    }
    
    function getProject(uint256 _projectId) public view returns (
        address creator,
        string memory name,
        string memory description,
        uint256 fundingGoal,
        uint256 currentAmount,
        uint256 deadline,
        bool funded
    ) {
        require(_projectId < projectCount, "Project does not exist");
        Project storage project = projects[_projectId];
        
        return (
            project.creator,
            project.name,
            project.description,
            project.fundingGoal,
            project.currentAmount,
            project.deadline,
            project.funded
        );
    }
    
    function getContribution(uint256 _projectId, address _contributor) public view returns (uint256) {
        require(_projectId < projectCount, "Project does not exist");
        return projects[_projectId].contributions[_contributor];
    }
    
    function getProposal(uint256 _proposalId) public view returns (
        uint256 projectId,
        string memory description,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 deadline,
        bool executed
    ) {
        require(_proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];
        
        return (
            proposal.projectId,
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.deadline,
            proposal.executed
        );
    }
}