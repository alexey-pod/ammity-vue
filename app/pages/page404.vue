<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box">
			<div class="container_404">
				<div class="img_text"></div>
				<div class="text">
					вход
					<a href="/catalog/">в каталог продукции</a>
				</div>
			</div>
		</div>
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
						mnemonic: '404'
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
