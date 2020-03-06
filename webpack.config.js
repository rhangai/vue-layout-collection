const path = require("path");

const LAYOUTS = [
	// Layout list
	"vuetify/layout-01"
];

/**
 *
 * @param {string} layoutDir
 */
function layoutGenerateConfig(layoutDir) {
	return {
		name: layoutDir,
		entry: path.resolve(__dirname, "src", layoutDir, "index.ts"),
		target: "node",
		output: {
			path: path.resolve(__dirname, "dist", layoutDir),
			filename: "index.js",
			module: true
		}
	};
}

module.exports = function(env) {
	const configs = LAYOUTS.map(layoutGenerateConfig);

	return configs;
};
