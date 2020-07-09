import { Vue } from "@common/component";
import { LayoutManagerSymbol, LayoutManager } from "./LayoutManager";

export const LayoutManagerMixin = Vue.extend({
	created() {
		// @ts-ignore
		this.layoutManager = new LayoutManager(this);
		// @ts-ignore
		this[LayoutManagerSymbol] = this.layoutManager;
	},
});
