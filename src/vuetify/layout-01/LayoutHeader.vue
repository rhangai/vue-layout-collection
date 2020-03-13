<template lang="pug">
v-app-bar.layout-header(app fixed :color="color || 'transparent'" v-bind="props")
	slot(name="info" :title="title" :breadcrumbs="breadcrumbs")
		layout-header-info(:title="title" :breadcrumbs="breadcrumbs")
	v-spacer
	.layout-header__actions
		slot(name="actions")
</template>
<script lang="ts">
import { Component, Vue } from "@common/component";
import { VAppBar, VSpacer, VBtn, VAvatar, VIcon } from "vuetify/lib";
import LayoutHeaderInfo from "./LayoutHeaderInfo.vue";

@Component({
	components: {
		LayoutHeaderInfo,
		VAppBar,
		VSpacer,
		VBtn,
		VAvatar,
		VIcon
	},
	props: {
		title: String,
		breadcrumbs: {
			type: Array,
			default: () => []
		},
		color: String,
		props: { type: Object, default: () => ({}) }
	}
})
export default class LayoutHeader extends Vue {}
</script>
<style lang="scss" scoped>
</style>
