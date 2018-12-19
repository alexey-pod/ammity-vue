<template>
	<section class="content-main" style>
		<div class="page_header margin_bottom">
			<h1>{{ cat_item.name }}</h1>
		</div>
		<div class="main-box">
			<img
				class="cat_img"
				:src="cat_item.mnemonic == 'begovye-dorozhki' ? '/img/cat_ban_beg.jpg':'/img/pix_2.jpg' "
				alt
				style="margin-top:0;"
			>
			<p v-if="cat_item.text" style="text-align:justify;" v-html="cat_item.text"></p>
		</div>
		<div class="catalog-widgets clearfix" ann_list ann_array="page.ann_array">
			<ann-array :ann_array="ann_array"></ann-array>
		</div>
		<img style="display:none;" src="/img/client/ann_item/delete_compare_hover.png">
	</section>
</template>

<script>
import ann_array from '../catalog/ann-array-inc.vue';

export default {
	components: { 'ann-array': ann_array },
	data() {
		return {
			page_item: {},
			ann_array: {},
			cat_item: {}
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
			var cat_mnemonic = this.$route.params.cat_mnemonic || 'begovye-dorozhki';
			this.$http
				.get(url, {
					params: {
						mode: 'ann_array_cat',
						cat_mnemonic
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.ann_array = results.ann_array;
					this.cat_item = results.cat_item;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
					this.$store.commit('set', {
						type: 'cat_mnemonic',
						items: cat_mnemonic
					});
				});
		}
	}
};
</script>
