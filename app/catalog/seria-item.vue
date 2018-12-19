<template>
	<section class="content-main">
		<div class="catalog-widgets clearfix">
			<div v-for="s_item in seria_array" :key="s_item.id" class="seria_block">
				<div class="page_header">
					<h1>{{ s_item.name }} серия {{ seria_item.name }}</h1>
				</div>
				<ann-array :ann_array="s_item.ann_array"></ann-array>
			</div>
		</div>
	</section>
</template>

<script>
import ann_array from '../catalog/ann-array-inc.vue';
export default {
	components: { 'ann-array': ann_array },
	data() {
		return {
			page_item: {},
			seria_item: {},
			seria_array: {}
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
			var url = '/app/respondents/catalog.php';
			var seria_mnemonic = this.$route.params.seria_mnemonic;
			this.$http
				.get(url, {
					params: {
						mode: 'ann_array_seria',
						seria_mnemonic
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.seria_array = results.seria_cat_array;
					this.seria_item = results.seria_item;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		}
	}
};
</script>
