<template lang="pug">
v-app.layout.layout-vuetify-layout-01(dark :class="classes" v-scroll="onScroll")
	layout-manager-container(:layout-manager="layoutManager")
	layout-drawer(v-bind="normalizedOptions.drawer")
		template(v-slot:top="props")
			slot(name="drawer-top" v-bind="props")
	layout-header(v-bind="normalizedOptions.header")
		template(v-slot:info="props")
			slot(name="header-info" v-bind="props")
		template(v-slot:actions="props")
			slot(name="header-actions" v-bind="props")
	v-content: v-container
		slot
</template>
<script lang="ts">
import { Component, Vue } from "@common/component";
import { VApp, VContent, VContainer } from "vuetify/lib";
import { Scroll } from "vuetify/lib/directives";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutDrawer from "./LayoutDrawer.vue";
import { LayoutConfig, LayoutOptions } from "./index.d";
import { LayoutManagerSymbol, LayoutManager } from "../common/LayoutManager";
import LayoutManagerContainer from "../common/LayoutManagerContainer.vue";
const merge = require("deepmerge");

@Component<Layout>({
	components: {
		VApp,
		VContent,
		VContainer,
		LayoutHeader,
		LayoutDrawer,
		LayoutManagerContainer
	},
	directives: {
		Scroll
	},
	props: {
		config: {
			type: Object,
			default: () => ({})
		},
		options: {
			type: Object,
			default: () => ({})
		}
	}
})
export default class Layout extends Vue {
	config!: LayoutConfig;
	options!: LayoutOptions;

	layoutManager!: LayoutManager;

	isScrolled = false;

	created() {
		this.layoutManager = new LayoutManager(this);
		// @ts-ignore
		this[LayoutManagerSymbol] = this.layoutManager;
	}

	get normalizedConfig(): LayoutConfig {
		const propConfig = this.config || {};
		return merge({}, propConfig);
	}

	get normalizedOptions(): LayoutOptions {
		const propOptions = this.options || {};
		const defaultOptions: LayoutOptions = {
			drawer: {},
			header: {}
		};
		return merge(defaultOptions, propOptions);
	}

	get classes() {
		return {
			"layout--is-not-scrolled": !this.isScrolled,
			"layout--is-scrolled": this.isScrolled
		};
	}

	onScroll(e: any) {
		this.isScrolled = e.target.documentElement.scrollTop > 0;
	}
}
</script>
<style lang="scss" scoped>
</style>
