<template lang="pug">
v-app.layout.layout-vuetify-layout-01(dark :class="classes" v-scroll="onScroll")
	layout-manager-container(:layout-manager="layoutManager")
	layout-drawer(v-bind="normalizedOptions.drawer")
		template(v-slot:top="props")
			// @slot Top of the navigation drawer
			slot(name="drawer-top" v-bind="props")
	layout-header(v-bind="normalizedOptions.header")
		template(v-slot:info="props")
			// @slot Header info (Left side of header)
			slot(name="header-info" v-bind="props")
		template(v-slot:actions="props")
			// @slot Header actions (Right side of header)
			slot(name="header-actions" v-bind="props")
	v-content: v-container
		// @slot The content
		slot
</template>
<script lang="ts">
import { Component, Vue } from "@common/component";
import { VApp, VContent, VContainer } from "vuetify/lib";
import { Scroll } from "vuetify/lib/directives";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutDrawer from "./LayoutDrawer.vue";
import { LayoutOptions } from "./index.d";
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
		LayoutManagerContainer,
	},
	directives: {
		Scroll,
	},
	props: {
		/**
		 * Options
		 *
		 * - `drawer.color`: Color of the drawer
		 * - `drawer.items`: Items on the drawer menu
		 * - `drawer.itemsBottom`: Items on the drawer menu bottom
		 * - `drawer.props`: Props to pass directly to the drawer
		 * - `header.color`: Color of the header
		 * - `header.props`: Props to pass directly to the drawer
		 */
		options: {
			type: Object,
			default: () => ({}),
		},
	},
})
export default class Layout extends Vue {
	options!: LayoutOptions;

	layoutManager!: LayoutManager;

	isScrolled = false;

	created() {
		this.layoutManager = new LayoutManager(this);
		// @ts-ignore
		this[LayoutManagerSymbol] = this.layoutManager;
	}

	get normalizedOptions(): LayoutOptions {
		const propOptions = this.options || {};
		const defaultOptions: LayoutOptions = {
			drawer: {},
			header: {},
		};
		return merge(defaultOptions, propOptions);
	}

	get classes() {
		return {
			"layout--is-not-scrolled": !this.isScrolled,
			"layout--is-scrolled": this.isScrolled,
		};
	}

	onScroll(e: any) {
		this.isScrolled = e.target.documentElement.scrollTop > 0;
	}
}
</script>
<style lang="scss" scoped>
</style>
