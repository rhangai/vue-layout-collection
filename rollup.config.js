import * as path from "path";
// import pluginCommonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import virtual from "@rollup/plugin-virtual";
import { pascalCase, pascalCaseTransformMerge } from "pascal-case";
import { LAYOUTS } from "./src/build";

const EXTERNALS = ["vue", "vuetify/lib", "vuetify/lib/directives"];

const GLOBALS = {
	vue: "Vue",
	"vuetify/lib": "Vuetify",
	"vuetify/lib/directives": "Vuefity",
};

const plugins = () => [
	//
	alias({
		entries: [
			{ find: "@common", replacement: path.resolve(__dirname, "src/common") },
		],
	}),
	resolve({
		extensions: [".ts", ".js"],
	}),
	typescript(),
	vue(),
];

function getLayoutName(layout) {
	const layoutCaseName = pascalCase(layout, {
		transform: pascalCaseTransformMerge,
	});
	return layoutCaseName;
}

/**
 *
 * @param {*} param0
 */
function generateConfigModule(env, input, output, name, extraPlugins) {
	if (typeof extraPlugins === "function") {
		extraPlugins = extraPlugins();
	}
	return {
		input: input,
		external: ["vue-class-component", ...EXTERNALS],
		output: {
			name: name,
			file: output,
			format: "esm",
			globals: { ...GLOBALS },
		},
		plugins: [
			// Default plugins
			...plugins(),
			...[].concat(extraPlugins).filter(Boolean),
		],
	};
}

function configBundle(env) {
	const bundleImports = [];
	const bundleExports = [];

	LAYOUTS.forEach(layoutDir => {
		const layoutInput = path.resolve(__dirname, "src", layoutDir, "index.ts");
		const layoutName = getLayoutName(layoutDir);
		bundleImports.push(
			`import * as ${layoutName} from ${JSON.stringify(layoutInput)}`
		);
		bundleExports.push(layoutName);
	});

	const input = path.resolve(__dirname, "src/index.ts");
	const name = "VueLayoutCollection";
	const outputBase = path.resolve(__dirname, "layout/vue-layout-collection");
	const extraPlugins = () => [
		virtual({
			"@rhangai/vue-layout-collection": [
				...bundleImports,
				"",
				`export { ${bundleExports.join(",")} };`,
			].join("\n"),
		}),
	];
	return [
		generateConfigModule(env, input, `${outputBase}.js`, name, extraPlugins),
	];
}

export default function(env) {
	const configLayouts = LAYOUTS.map(layoutDir => {
		const input = path.resolve(__dirname, "src", layoutDir, "index.ts");
		const outputBase = path.resolve(__dirname, "layout", `${layoutDir}/index`);
		const name = `VueLayout${getLayoutName(layoutDir)}`;
		return [generateConfigModule(env, input, `${outputBase}.js`, name)];
	});

	return [
		// Each module
		...configLayouts,
		// Bundle
		configBundle(env),
	].flat();
}
