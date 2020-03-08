import { VueConstructor } from "vue";
import { ILayoutManagerStatic } from "../common";

export interface LayoutOptions {
	title?: string;
	breadcrumbs?: LayoutBreadcrumbItem[];
}

export interface LayoutBreadcrumbItem {
	text: string;
	to?: string;
	current?: boolean;
}

export interface LayoutMenuItem {
	title: string;
	icon?: string;
	to?: string;
	href?: string;
	children?: LayoutMenuItem[];
}

export type LayoutConfig = {
	drawerColor?: string;
	headerColor?: string;
};

export const Layout: VueConstructor;
export const LayoutManager: ILayoutManagerStatic;
