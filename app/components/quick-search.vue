<template>
	<form>
		<input id="top_query" type="text" class="type-text" value placeholder="Найти на сайте...">
		<input type="submit" value class="submit">
	</form>
</template>

<script>
import ext from '../ext-js/quick-search.js';
export default {
	mounted() {
		var http = this.$http;
		var script_url = this.$store.getters.get('script_url');
		ext.run(http, script_url);
	}
};
</script>