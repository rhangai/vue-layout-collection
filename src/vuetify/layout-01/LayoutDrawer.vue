<template lang="pug">
v-hover(v-slot:default="{ hover }" close-delay="400")
	v-navigation-drawer.layout-drawer(
		:clipped="false"
		:mini-variant="hover ? false : miniVariant"
		:color="color"
		permanent
		app)
		v-list
			v-list-item
				v-list-item-icon: v-icon(style="visibility: hidden") mdi-home
				v-list-item-content &nbsp;
				v-list-item-action
					v-btn.layout-drawer__botao-ativar(icon small @click="miniVariant = !miniVariant")
						v-icon(small) {{ miniVariant ? 'mdi-pin' : 'mdi-pin-off' }}
			v-divider
			template(v-for="(item, i) in items")
				layout-drawer-menu-item(:item="item" :key="i")
		v-spacer
		v-list
			layout-drawer-menu-item(:item="itemLogout")
</template>
<script lang="ts">
import { LayoutMenuItem } from "./index.d";
import LayoutDrawerMenuItem from "./LayoutDrawerMenuItem.vue";
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
		LayoutDrawerMenuItem,
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
		items: {
			type: Array,
			default: () => []
		},
		color: String
	}
})
export default class LayoutDrawer extends Vue {
	miniVariant = true;
	items!: LayoutMenuItem[];

	itemLogout: LayoutMenuItem = {
		title: "Sair",
		icon: "mdi-exit-to-app",
		to: "logout"
	};
}
</script>
<style lang="scss" scoped>
.layout-drawer::v-deep {
	overflow: visible !important;

	.v-navigation-drawer__content {
		display: flex;
		flex-direction: column;
	}

	.v-list-group__items {
		background-color: rgba(#222, 0.9);
	}

	.layout-drawer-menu-item.layout-drawer-menu-item--level-2 {
		> .v-list-item {
			padding-left: 3rem;
			transition: padding-left 0.15s;
		}
	}

	&.v-navigation-drawer--mini-variant {
		.layout-drawer-menu-item.layout-drawer-menu-item--level-2 {
			> .v-list-item {
				padding-left: 1rem;
			}
		}
	}

	.v-list-group__header {
		color: inherit;
	}
}
</style>
