<template lang="pug">
v-hover(v-slot:default="{ hover }" close-delay="400")
	v-navigation-drawer.layout-drawer(
		:clipped="false"
		:mini-variant="hover ? false : miniVariant"
		:color="color"
		permanent
		app
		v-bind="props")
		.layout-drawer__top
			slot(name="top" :mini="hover ? false : miniVariant")
			v-btn.layout-drawer__pin-button(icon small @click="miniVariant = !miniVariant")
				v-icon(small) {{ miniVariant ? 'mdi-pin' : 'mdi-pin-off' }}
		v-divider
		v-list
			template(v-for="(item, i) in items")
				layout-drawer-menu-item(:item="item" :key="i")
		v-spacer
		v-list
			template(v-for="(item, i) in itemsBottom")
				layout-drawer-menu-item(:item="item" :key="i")
</template>
<script lang="ts">
import { LayoutDrawerMenuItem } from "./index.d";
import LayoutDrawerMenuItemComponent from "./LayoutDrawerMenuItem.vue";
import { Component, Vue } from "@common/component";
import {
	VNavigationDrawer,
	VList,
	VListItem,
	VListItemIcon,
	VIcon,
	VListItemContent,
	VListItemAction,
	VHover,
	VBtn,
	VDivider,
	VSpacer
} from "vuetify/lib";

@Component({
	components: {
		LayoutDrawerMenuItem: LayoutDrawerMenuItemComponent,
		VNavigationDrawer,
		VList,
		VListItem,
		VListItemIcon,
		VIcon,
		VListItemContent,
		VListItemAction,
		VHover,
		VBtn,
		VDivider,
		VSpacer
	},
	props: {
		color: String,
		items: {
			type: Array,
			default: () => []
		},
		itemsBottom: {
			type: Array,
			default: () => []
		},
		props: { type: Object, default: () => ({}) }
	}
})
export default class LayoutDrawer extends Vue {
	miniVariant = true;
	color!: string;
	items!: LayoutDrawerMenuItemComponent[];
	itemsBottom!: LayoutDrawerMenuItemComponent[];
	props!: any;
}
</script>
<style lang="scss" scoped>
.layout-drawer::v-deep {
	overflow: visible !important;

	.v-navigation-drawer__content {
		display: flex;
		flex-direction: column;
	}

	.v-list-group__header {
		color: inherit;
	}

	.v-list-group__items {
		background-color: rgba(#222, 0.9);
	}

	@mixin set-item-padding($index, $padding) {
		.layout-drawer-menu-item.layout-drawer-menu-item--level-#{$index}
			> .v-list-item {
			padding-left: $padding;
			transition: padding-left 0.15s;
		}
		&.v-navigation-drawer--mini-variant {
			.layout-drawer-menu-item.layout-drawer-menu-item--level-#{$index}
				> .v-list-item {
				padding-left: 1rem;
			}
		}
	}

	@include set-item-padding(2, 3rem);
	@include set-item-padding(3, 4.5rem);
}

.layout-drawer__top {
	position: relative;
	min-height: 72px;
	width: 256px;
}

.layout-drawer__pin-button {
	position: absolute;
	top: 0.75rem;
	right: 0.75rem;
}
</style>