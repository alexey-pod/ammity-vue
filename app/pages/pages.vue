<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box" v-html="page_item.text" />
	</section>
</template>

<script>
export default {
	data() {
		return {
			page_item: ''
		};
	},
	watch: {
		$route(to, from) {
			this.loadPage();
		}
	},
	created() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			var url = '/app/respondents/pages.php';
			this.$http
				.get(url, {
					params: {
						mnemonic: this.$route.params.mnemonic
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		}
	}
};
</script>
