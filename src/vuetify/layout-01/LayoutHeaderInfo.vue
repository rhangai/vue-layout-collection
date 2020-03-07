<template lang="pug">
nav.layout-header-info
	.layout-header-info__breadcrumb
		layout-breadcrumbs(:breadcrumbs="breadcrumbs")
	.layout-header-info__title {{title}}
</template>

<script lang="ts">
import { Component, Vue } from "@common/component";
import LayoutBreadcrumbs from "./LayoutBreadcrumbs.vue";

@Component<LayoutHeaderInfo>({
	components: {
		LayoutBreadcrumbs
	},
	props: {
		title: {
			type: String,
			default: ""
		},
		breadcrumbs: {
			type: Array,
			default: () => []
		}
	}
})
export default class LayoutHeaderInfo extends Vue {}
</script>
<style lang="scss" scoped>
.layout-header-info__titulo {
	font-weight: bold;
	font-size: 1.5rem;
}
</style>
