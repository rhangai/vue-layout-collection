const path = require("path");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
	stories: ["../src/**/*.stories.(ts|mdx)"],
	addons: ["@storybook/addon-docs"],
	webpackFinal: async config => {
		config.plugins.unshift(new VuetifyLoaderPlugin());
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: "ts-loader",
					options: { appendTsSuffixTo: [/\.vue$/] },
				},
			],
		});
		config.module.rules.push({
			test: /\.pug$/,
			use: ["pug-plain-loader"],
		});
		config.module.rules.push({
			test: /\.scss$/,
			use: ["vue-style-loader", "css-loader", "sass-loader"],
		});
		config.module.rules.push({
			test: /\.sass$/,
			use: [
				"vue-style-loader",
				"css-loader",
				{
					loader: "sass-loader",
					options: {
						sassOptions: {
							indentedSyntax: true,
						},
					},
				},
			],
		});
		config.resolve.extensions.push(".ts", ".tsx");
		config.resolve.alias = {
			...config.resolve.alias,
			"@common": path.resolve(__dirname, "../src/common"),
		};
		return config;
	},
};
