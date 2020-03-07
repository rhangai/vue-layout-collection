<template lang="pug">
.layout-breadcrumb(v-if="items.length > 0")
	v-icon.layout-breadcrumb__icon-single(v-if="items.length === 1") 
		| mdi-chevron-right
	v-breadcrumbs(large :items="items")
		template(v-slot:divider="")
			v-icon mdi-chevron-right
</template>
<script lang="ts">
import { Component, Vue } from "@common/component";
import { VIcon, VBreadcrumbs } from "vuetify/lib";
import { LayoutBreadcrumbItem } from "./index.d";

@Component({
	components: {
		VIcon,
		VBreadcrumbs
	},
	props: {
		breadcrumbs: {
			type: Array,
			required: true
		}
	}
})
export default class LayoutBreadcrumbs extends Vue {
	breadcrumbs!: LayoutBreadcrumbItem[];

	get items() {
		return this.breadcrumbs.map(b => ({
			text: b.text,
			to: b.to
		}));
	}
}
</script>
<style lang="scss" scoped>
.layout-breadcrumb {
	position: relative;

	.v-breadcrumbs::v-deep {
		margin-top: 0 !important;
		padding: 0;

		&:first-child {
			margin-top: 1rem;
		}

		li {
			font-size: 0.8rem;
			color: #999;

			&:only-child {
				padding-left: 1rem;
			}

			&.v-breadcrumbs__divider {
				padding: 0 0.25rem;
			}

			a {
				text-decoration: underline;
				color: #999;
			}
		}
	}

	.layout-breadcrumb__icon-single {
		display: inline-block;
		position: absolute;
		top: 4px;
		left: 0;
		font-size: 0.8rem;
	}
}
</style>
