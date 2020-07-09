import Vue from "vue";
import {
	ILayoutManager,
	LayoutManagerSnackbar,
	LayoutManagerDialogConfirmation,
} from "../common.d";

export type LayoutManagerHandlers = {
	snackbar: (snackbar: LayoutManagerSnackbar) => Promise<void>;
	dialogConfirmation: (
		confirmation: LayoutManagerDialogConfirmation
	) => Promise<boolean>;
};

/// Symbol for layout manager
export const LayoutManagerSymbol = Symbol("LayoutManager");

/**
 * Layout manager
 */
export class LayoutManager implements ILayoutManager {
	private handlers: LayoutManagerHandlers | null = null;

	constructor(private readonly vm: Vue) {}

	setHandlers(handlers: LayoutManagerHandlers | null) {
		this.handlers = handlers;
	}
	/**
	 *
	 * @param vm
	 */
	async snackbar(snackbar: LayoutManagerSnackbar): Promise<void> {
		if (!this.handlers) throw new Error(`Invalid handlers`);
		await this.handlers.snackbar(snackbar);
	}
	/**
	 *
	 * @param vm
	 */
	async dialogConfirmation(
		confirmation: LayoutManagerDialogConfirmation
	): Promise<boolean> {
		if (!this.handlers) throw new Error(`Invalid handlers`);
		return !!(await this.handlers.dialogConfirmation(confirmation));
	}

	/**
	 * Try to find the layout manager for the given component
	 * @param vm
	 */
	static find(vm: Vue): LayoutManager | null {
		let currentVm = vm;
		while (currentVm) {
			// @ts-ignore
			const manager = currentVm[LayoutManagerSymbol];
			if (manager) return manager;
			currentVm = currentVm.$parent;
		}
		return null;
	}
}
