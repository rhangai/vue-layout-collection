<template lang="pug">
div
	template(v-for="snackbar in snackbars")
		v-snackbar(
			:key="snackbar.id" 
			v-model="snackbar.visible"
			@input="snackbar.onInput"
			v-bind="snackbar.item.$props"
		) 
			| {{ snackbar.item.message }}
			v-btn(@click="snackbar.resolve()" text) Fechar

	template(v-for="dialog in dialogs")
		v-dialog(
			:key="dialog.id" 
			v-model="dialog.visible" 
			@input="dialog.onInput"
			persistent
			max-width="290"
			v-bind="dialog.item.$props"
		)
			v-card
				v-card-title.headline(v-html="dialog.item.title")
				v-card-text(v-html="dialog.item.message")
				v-card-actions
					v-spacer
					v-btn(
						color="grey"
						ext
						@click="dialog.resolve(false)") {{'Cancelar'}}
					v-btn(
						color="primary"
						@click="dialog.resolve(true)") {{'OK'}}
</template>
<script lang="ts">
import { Vue, Component } from "@common/component";
import { LayoutManagerSymbol, LayoutManager } from "./LayoutManager";
import {
	LayoutManagerSnackbar,
	LayoutManagerDialogConfirmation
} from "../common";
import {
	VDialog,
	VBtn,
	VCard,
	VCardTitle,
	VCardText,
	VCardActions,
	VSpacer,
	VSnackbar
} from "vuetify/lib";

type LayoutManagerContainerListItem<ItemType> = {
	id: number;
	visible: boolean;
	$resolvePromise: null | ((v: unknown) => void);
	resolve: (v: unknown) => void;
	onInput: (v: boolean) => void;
	item: ItemType;
};
type LayoutManagerContainerList<T> = Array<LayoutManagerContainerListItem<T>>;

@Component({
	components: {
		VDialog,
		VBtn,
		VCard,
		VCardTitle,
		VCardText,
		VCardActions,
		VSpacer,
		VSnackbar
	},
	props: {
		layoutManager: {
			type: Object,
			required: true
		}
	}
})
export default class LayoutManagerContainer extends Vue {
	layoutManager!: LayoutManager;
	snackbars: LayoutManagerContainerList<LayoutManagerSnackbar> = [];
	dialogs: LayoutManagerContainerList<LayoutManagerDialogConfirmation> = [];

	created() {
		this.layoutManager.setHandlers({
			snackbar: snackbar => this.snackbar(snackbar),
			dialogConfirmation: confirmation => this.dialogConfirmation(confirmation)
		});
	}

	/**
	 * Get a new unique ID from the list
	 */
	private createItemId<T>(list: LayoutManagerContainerListItem<T>[]): number {
		const itemMap: { [key: string]: true } = {};
		for (let item of list) {
			itemMap[item.id] = true;
		}

		let newItemId = 0;
		while (itemMap[newItemId]) ++newItemId;
		return newItemId;
	}

	/**
	 * Performs an operation for an item
	 */
	private async createItem<T, ResultType = any>(
		list: LayoutManagerContainerList<T>,
		item: T,
		cancelValue?: ResultType
	): Promise<ResultType> {
		const itemId = this.createItemId(list);

		// Create the dialog
		const listItem: LayoutManagerContainerListItem<T> = {
			id: itemId,
			item,
			visible: false,
			$resolvePromise: null,
			resolve: (v: any) => {
				if (!listItem.$resolvePromise) return;
				listItem.$resolvePromise(v);
				listItem.$resolvePromise = null;
			},
			onInput: (visible: boolean) => {
				if (!visible) listItem.resolve(cancelValue);
			}
		};
		const listItemPromise = new Promise<ResultType>((resolve, reject) => {
			// @ts-ignore
			listItem.$resolvePromise = resolve;
		});

		// Awaits for the dialog and then removes it
		list.push(listItem);
		await this.$nextTick(() => {
			listItem.visible = true;
		});
		const result = await listItemPromise;
		listItem.visible = false;

		// Awais a few seconds before deleting the item
		setTimeout(() => {
			const index = list.findIndex(v => v.id === itemId);
			if (index >= 0) {
				list.splice(index, 1);
			}
		}, 2000);

		return result;
	}

	/**
	 * Snackbar
	 */
	async snackbar(snackbar: LayoutManagerSnackbar): Promise<void> {
		await this.createItem(this.snackbars, snackbar);
	}

	/**
	 * Dialog confirmation
	 */
	async dialogConfirmation(
		confirmation: LayoutManagerDialogConfirmation
	): Promise<boolean> {
		return await this.createItem(this.dialogs, confirmation, false);
	}
}
</script>