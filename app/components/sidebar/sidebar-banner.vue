<template>
	<div>
		<a v-for="pr_item in pr_left" :key="pr_item.id" :href="pr_item.url" class="aside-widget">
			<img :src="pr_item.icon_white">
			<h3
				:style="pr_item.disable_name == 1 ? 'color:#000; background:none;' : ''"
				v-html="pr_item.name"
			></h3>
			<div class="url_name">{{ pr_item.url_name }}</div>
		</a>
	</div>
</template>

<script>
export default {
	computed: {
		pr_left() {
			return this.$store.getters.get('pr_left');
		}
	}
};
</script>