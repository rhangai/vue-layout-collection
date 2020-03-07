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
	return src("src/**/*.d.ts")
		.pipe(
			rename(file => {
				if (file.basename === "index.d") {
					const newBasename = path.basename(file.dirname);
					file.dirname = path.dirname(file.dirname);
					file.basename = newBasename;
					file.extname = ".d.ts";
				}
			})
		)
		.pipe(dest("layout"));
}

exports.build = series(buildRollup, buildCopyDeclarations);
