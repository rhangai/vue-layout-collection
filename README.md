# @rhangai/vue-layout-collection

## Layouts available

- Vuetify
  - Layout01: `'@rhangai/vue-layout-collection/layout/vuetify/layout-01'`

# Layouts

## vuetify

### Layout 01

```html
<template>
	<layout :items="items">
		Content
	</layout>
</template>
<script>
	import { Layout } from "@rhangai/vue-layout-collection/layout/vuetify/layout-01";

	export default {
		components: {
			Layout
		},
		data: () => ({
			items: [{}]
		})
	};
</script>
```
