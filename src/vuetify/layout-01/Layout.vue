<template lang="pug">
v-app.layout.layout-vuetify-layout-01(dark :class="classes" v-scroll="onScroll")
	//- layout-manager-snackbar
	//- layout-manager-confirmacao
	layout-drawer(:items="items")
	layout-header(:title="title" :breadcrumbs="breadcrumbs")
		template(v-slot:actions="")
			slot(name="header-actions")
	v-content: v-container
		slot
</template>

<script lang="ts">
import { Component, Vue } from "@common/component";
import { VApp, VContent, VContainer } from "vuetify/lib";
import { Scroll } from "vuetify/lib/directives";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutDrawer from "./LayoutDrawer.vue";
import { LayoutMenuItem, LayoutBreadcrumbItem } from "./index.d";

@Component<Layout>({
	components: {
		VApp,
		VContent,
		VContainer,
		LayoutHeader,
		LayoutDrawer
	},
	directives: {
		Scroll
	},
	props: {
		items: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: () => ""
		},
		breadcrumbs: {
			type: Array,
			default: () => []
		}
	}
})
export default class Layout extends Vue {
	items!: LayoutMenuItem;
	title!: string;
	breadcrumbs!: LayoutBreadcrumbItem[];

	isScrolled = false;

	get classes() {
		return {
			"layout-app--is-scrolled": this.isScrolled
		};
	}

	onScroll(e: any) {
		this.isScrolled = e.target.documentElement.scrollTop > 0;
	}
}
</script>
<style lang="scss" scoped>
</style>
