import Vue from "vue";
import Vuetify from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
Vue.use(Vuetify);

export const WithVuetify = () => () => {
	const vuetify = new Vuetify();
	return {
		vuetify,
		template: "<story />",
	};
};
