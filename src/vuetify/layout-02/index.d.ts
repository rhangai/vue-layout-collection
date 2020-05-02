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
	to?: string | { [key: string]: any };
	href?: string;
	props?: { [key: string]: any };
	children?: LayoutDrawerMenuItem[];
}

export type LayoutConfig = {};

export type LayoutOptions = {
	containerFluid: Boolean,
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
