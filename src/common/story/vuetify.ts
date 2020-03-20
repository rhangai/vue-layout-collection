import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

export const WithVuetify = () => () => {
	const vuetify = new Vuetify();
	return {
		vuetify,
		template: "<story />",
	};
};
