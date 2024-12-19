const DAOCrowdfunding = artifacts.require("DAOCrowdfunding");

module.exports = function(deployer) {
  deployer.deploy(DAOCrowdfunding);
};