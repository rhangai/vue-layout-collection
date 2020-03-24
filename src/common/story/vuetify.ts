import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import {
	VIcon,
	VList,
	VListItem,
	VListItemAction,
	VListItemContent,
	// @ts-ignore
} from "vuetify/lib/components";

Vue.use(Vuetify, {
	components: { VIcon, VList, VListItem, VListItemAction, VListItemContent },
});

export const WithVuetify = () => () => {
	const vuetify = new Vuetify();
	return {
		vuetify,
		template: "<story />",
	};
};
