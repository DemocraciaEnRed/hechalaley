var exports = module.exports = {};

var Git = require("nodegit");

var path = require("path");
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));

var directoryName = "bills";

var log = require('debug')('billtracker:git');

//fix por async. see https://github.com/nodegit/nodegit/blob/master/examples/add-and-commit.js#L8
fse.ensureDir = promisify(fse.ensureDir);


exports.commitToGit = function commitToGit(billID, billContents) {
	var fileName = billID + ".txt";

	log("Bill with ID " + billID + " commited to git");
	log("Bill contents: " + billContents);

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
			log("New Commit: ", commitId);
		});
};

exports.readFileFromGit = function readFileFromGit(billID, callback) {

	var _entry;
	Git.Repository.open('../billtracker_git')
		.then(function(repo) {
			return repo.getBranchCommit('master');
		})
		.then(function(commit) {
			return commit.getEntry('bills/' + billID + '.txt');
		})
		.then(function(entry) {
			_entry = entry;
			return _entry.getBlob();
		})
		.then(function(blob) {
			var firstTenLines = blob.toString().split("\n").slice(0, 10).join("\n");

			callback(firstTenLines);
		})
		.done();
};