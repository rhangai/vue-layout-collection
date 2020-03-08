const path = require("path");
const execa = require("execa");
const { src, dest, series } = require("gulp");
const rename = require("gulp-rename");

async function buildRollup() {
	const rollupProccess = execa("rollup", ["-c", "rollup.config.js"], {
		stdio: "inherit"
	});
	return await rollupProccess;
}

async function buildCopyDeclarations() {
	return src("src/**/*.d.ts").pipe(dest("layout"));
}

exports.build = series(buildRollup, buildCopyDeclarations);
