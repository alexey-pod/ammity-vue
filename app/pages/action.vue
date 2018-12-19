<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box">
			<div v-if="page_item.text != ''" v-html="page_item.text"></div>
			<div v-if="page_item.text==''" class="action_page">
				<div class="tv_box">
					<div class="text">В настоящий момент акции не проводятся</div>
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
	created() {
		this.loadPage();
	},
	methods: {
		loadPage() {
			var url = '/app/respondents/pages.php';
			this.$http
				.get(url, {
					params: {
						mnemonic: 'action'
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
