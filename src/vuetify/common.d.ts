import Vue from "vue";

export type LayoutManagerSnackbar = {
	message: string;
	$props?: Record<string, any>;
};

export type LayoutManagerDialogConfirmation = {
	title?: string;
	message: string;
	$props?: Record<string, any>;
};

export interface ILayoutManager {
	snackbar(snackbar: LayoutManagerSnackbar): Promise<void>;
	dialogConfirmation(
		confirmation: LayoutManagerDialogConfirmation
	): Promise<boolean>;
}

export interface ILayoutManagerStatic {
	find(vm: Vue): ILayoutManager;
}
