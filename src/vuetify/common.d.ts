import Vue from "vue";

export type LayoutManagerSnackbar = {
	message: string;
};

export type LayoutManagerDialogConfirmation = {
	title?: string;
	message: string;
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
