<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box">
			<div class="presentation_page">
				<div
					v-for="pr_item in pr_array"
					:key="pr_item.id"
					:data-pr_item_id="pr_item.id"
					class="pr_item hide_"
				>
					<div class="content">
						<a :name="'pr_' + pr_item.id"></a>
						<div class="header">
							<img class="icon" :src="pr_item.icon_black">
							<div class="title">{{ pr_item.name }}</div>
						</div>
						<scrol-text :text="pr_item.text"></scrol-text>
					</div>
					<pr-image-list :image_array="pr_item.image_array" :pr_item_id="pr_item.id"></pr-image-list>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import pr_image_list from '../components/presentation-image-list.vue';
import scrol_text from '../components/scrol-text.vue';
export default {
	components: { 'pr-image-list': pr_image_list, 'scrol-text': scrol_text },
	data() {
		return {
			page_item: {},
			pr_array: {}
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
						mnemonic: 'presentation'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.pr_array = results.pr_array;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		}
	}
};
</script>
