const fs = require("fs"),
	path = require("path");

var rootPath = "..";

function dirTree(filename) {
	const stats = fs.lstatSync(filename),
		info = {};
	if (stats.isDirectory()) {
		info.type = "category";
		let name = path.basename(filename);
		info.label = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		info.items = fs.readdirSync(filename).map(function (child) {
			let name = path.posix.join(filename, child);
			return dirTree(name);
		});
	} else {
		let name = filename
			.split(".")
			.slice(0, -1)
			.join(".");
		name = name.slice(rootPath.length - 2, name.length);
		return name;
	}
	return info;
}

if (module.parent == undefined) {
	rootPath = process.argv[2];
	const dir = dirTree(rootPath);
	const res = JSON.stringify(dir.items, null, 2);
	fs.writeFile("./sidebars.js", `module.exports = {someSidebars: ${res}}`, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
}
