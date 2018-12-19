<template>
	<div>
		<section class="home-main-widgets clearfix">
			<article v-for="item in cat_array" :key="item.id">
				<a :href="item.link_disable == 0 ? item.url : ''">
					<img :src="item.image">
					<h2>{{ item.name }}</h2>
				</a>
			</article>
		</section>
		<article class="line-news">
			<strong>Новость:</strong>
			<a>новое поступление эллиптических и велотренажеров</a>
		</article>
		<section class="bottom-widgets clearfix">
			<a v-for="item in pr_mane" :key="item.id" class="widget" :href="item.url">
				<h3 v-html="item.name"></h3>
				<div class="url_name">{{ item.url_name }}</div>
				<img :src="item.icon_white">
			</a>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cat_array: [],
			pr_mane: [],
			page_item: ''
		};
	},
	computed: {},
	created() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			var url = '/app/respondents/index.php';
			this.$http
				.get(url, {
					params: {
						mnemonic: 'index'
					}
				})
				.then(results => {
					results = results.data;
					this.cat_array = results.cat_array;
					this.pr_mane = results.pr_mane;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		}
	}
};
</script>
