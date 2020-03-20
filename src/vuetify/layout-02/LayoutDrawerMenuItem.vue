<template lang="pug">
div.layout-drawer-menu-item(:class="classes")
	template(v-if="item.children")
		v-list-group(color="white" eager :prepend-icon="item.icon")
			template(v-slot:activator="")
				v-list-item-content: v-list-item-title {{ item.title }}
			template(v-for="(child, i) in item.children")
				layout-drawer-menu-item(:key="i" :item="child" :level="level+1")
	template(v-else)
		v-list-item(v-bind="routerProps")
			v-list-item-action: v-icon {{ item.icon }}
			v-list-item-content: v-list-item-title {{ item.title }}
</template>
<script lang="ts">
import { Component, Vue } from "@common/component";
import {
	VListGroup,
	VListItem,
	VListItemAction,
	VListItemContent,
	VListItemTitle,
	VIcon,
} from "vuetify/lib";
import { LayoutDrawerMenuItem } from "./index.d";

@Component({
	name: "layout-drawer-menu-item",
	components: {
		VListGroup,
		VListItem,
		VListItemAction,
		VListItemContent,
		VListItemTitle,
		VIcon,
	},
	props: {
		item: {
			type: Object,
			required: true,
		},
		level: {
			type: Number,
			default: () => 1,
		},
	},
})
export default class LayoutDrawerMenuItemComponent extends Vue {
	item!: LayoutDrawerMenuItem;
	level!: number;

	get classes() {
		return `layout-drawer-menu-item--level-${this.level}`;
	}

	get routerProps() {
		if (this.item.to) {
			let to: unknown;
			if (typeof this.item.to === "string") {
				to = { name: this.item.to };
			} else {
				to = this.item.to;
			}
			return {
				router: true,
				to,
				...this.item.props,
			};
		} else if (this.item.href) {
			return {
				link: true,
				href: this.item.href,
				...this.item.props,
			};
		}
		return { link: true, ...this.item.props };
	}
}
</script>
