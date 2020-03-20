import { Layout } from "./";
import { WithVuetify } from "@common/story/vuetify";

const DRAWER_ITEMS = [
	{
		title: "Home",
		icon: "mdi-home",
	},
	{
		title: "Profile",
		icon: "mdi-domain",
	},
	{
		title: "My Data",
		icon: "mdi-format-list-bulleted",
	},
];

const DRAWER_ITEMS_BOTTOM = [
	{
		title: "Logout",
		icon: "mdi-logout",
	},
];

export default {
	title: "Vuetify/Layout01",
	component: Layout,
	decorators: [WithVuetify()],
};

export const CompleteExample = () => ({
	components: { Layout },
	data: () => ({
		layoutOptions: {
			header: {
				color: "primary",
				dark: true,
			},
			drawer: {
				color: "secondary",
				items: DRAWER_ITEMS,
				itemsBottom: DRAWER_ITEMS_BOTTOM,
				props: {
					dark: true,
				},
			},
		},
	}),
	template: `
		<layout :options="layoutOptions">
			<template v-slot:header-info>
				Header Slot
			</template>
			<template v-slot:drawer-top>
				<v-list>
					<v-list-item>
						<v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
						<v-list-item-content>Drawer Slot</v-list-item-content>
					</v-list-item>
				</v-list>
			</template>
			Content
		</layout>
	`,
});

export const ThemeDefault = () => ({
	components: { Layout },
	data: () => ({
		layoutOptions: {
			drawer: {
				items: DRAWER_ITEMS,
				itemsBottom: DRAWER_ITEMS_BOTTOM,
			},
		},
	}),
	template: `
		<layout :options="layoutOptions">
			Content
		</layout>
	`,
});

export const ThemeDark = () => ({
	components: { Layout },
	data: () => ({
		layoutOptions: {
			header: {
				color: "#113248",
			},
			drawer: {
				color: "gray",
				items: DRAWER_ITEMS,
				itemsBottom: DRAWER_ITEMS_BOTTOM,
				props: {
					dark: true,
				},
			},
		},
	}),
	template: `
		<layout :options="layoutOptions">
			Content
		</layout>
	`,
});
