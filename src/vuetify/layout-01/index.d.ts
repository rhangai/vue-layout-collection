import { VueConstructor } from "vue";
import { ILayoutManagerStatic } from "../common";

export interface LayoutHeaderBreadcrumbItem {
	text: string;
	to?: string;
	current?: boolean;
}

export interface LayoutDrawerMenuItem {
	title: string;
	icon?: string;
	to?: string;
	href?: string;
	props?: { [key: string]: any };
	children?: LayoutDrawerMenuItem[];
}

export type LayoutConfig = {};

export type LayoutOptions = {
	drawer?: {
		color?: string;
		items?: LayoutDrawerMenuItem[];
		itemsBottom?: LayoutDrawerMenuItem[];
		props?: { [key: string]: any };
	};
	header?: {
		color?: string;
		title?: string;
		breadcrumbs?: LayoutHeaderBreadcrumbItem[];
		props?: { [key: string]: any };
	};
};

export const Layout: VueConstructor;
export const LayoutManager: ILayoutManagerStatic;
