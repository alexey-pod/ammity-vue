<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box">
			<div class="presentation_page">
				<div class="pr_item hide_">
					<div v-html="page_item.text"></div>
					<div
						style="background-color:#999999; color:white; font-family:Arial; font-size:12px; margin:25px -15px 0 -15px; padding-left:20px; padding-top:19px; padding-bottom:8px"
					>
						<b>СПИСОК ОБОРУДОВАНИЯ, ПОДДЕРЖИВАЮЩЕГО ФУНКЦИЮ APP:</b>
					</div>
					<center class="dba_container">
						<div
							v-for="app_cat_item in app_cat_array"
							:id="'dba'+ app_cat_item.id "
							:key="app_cat_item.id"
							class="dba"
						>
							<div class="name">{{ app_cat_item.name }}</div>
						</div>
					</center>
					<div class="DBLs">
						<div
							v-for="app_cat_item in app_cat_array"
							:id="'DBL' + app_cat_item.id"
							:key="app_cat_item.id"
							class="DBLsN"
							style="display:none;"
						>
							<div v-for="ann_item in app_cat_item.ann_array" :key="ann_item.id">
								<a :href="ann_item.url">{{ ann_item.series_mnemonic }} {{ ann_item.name }}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import ext from '../ext-js/app.js';
export default {
	data() {
		return {
			page_item: {},
			app_cat_array: {}
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
						mnemonic: 'app'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.app_cat_array = results.app_cat_array;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
					ext.run();
				});
		}
	}
};
</script>



