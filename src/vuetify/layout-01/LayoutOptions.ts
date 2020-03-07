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
