import Vue from "vue";
import Layout from "./Layout.vue";
import { WithVuetify } from "@common/story/vuetify";

export default {
	title: "Layout01",
	decorators: [WithVuetify()],
};

export const Layout01 = () => ({
	components: { Layout },
	template: "<layout />",
});
