var exports = module.exports = {};

var Git = require("nodegit");

var path = require("path");
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));

var directoryName = "bills";

//fix por async. see https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js#L8
fse.ensureDir = promisify(fse.ensureDir);


exports.commitToGit = function(billID, billContents) {
	var fileName = billID + ".txt";
	
	console.log("Bill with ID " + billID + " commited to git");
	console.log("Bill contents: " + billContents);

	var repo;

	Git.Repository.open("../billtracker_git")
		.then(function(repository) {
			repo = repository;
			return fse.ensureDir(path.join(repo.workdir(), directoryName));
		})
		.then(function() {
			return fse.writeFile(path.join(repo.workdir(), directoryName, fileName), billContents);
		})
		.then(function() {
			return repo.openIndex();
		})
		.then(function(indexResult) {
			index = indexResult;
			return index.read(1);
		})
		.then(function() {
			return index.addByPath(path.join(directoryName, fileName));
		})
		.then(function() {
			return index.write();
		})
		.then(function() {
			return index.writeTree();
		})
		.then(function(oidResult) {
			oid = oidResult;
			return Git.Reference.nameToId(repo, "HEAD");
		})
		.then(function(head) {
			return repo.getCommit(head);
		})
		.then(function(parent) {
			var author = Git.Signature.create("Bill Tracker",
				"billtracker@democraciaenred.com", 123456789, 60);
			var committer = Git.Signature.create("Bill Tracker",
				"billtracker@democraciaenred.com", 987654321, 90);

			return repo.createCommit("HEAD", author, committer, "Commited new revision for Bill " + billID, oid, [parent]);
		})
		.done(function(commitId) {
			console.log("New Commit: ", commitId);
		});


	/**
			.then(getMostRecentCommit)
			.then(getCommitMessage)
			.then(function(message) {
				console.log("billtracker_git> last commit message is: " + message);
			})
			*/


	//git hash corresponding to this commit, will be the stageID in mongoDB
	return "a1b2c3";
};

var getMostRecentCommit = function(repository) {
	return repository.getBranchCommit("master");
};

var getCommitMessage = function(commit) {
	return commit.message();
};