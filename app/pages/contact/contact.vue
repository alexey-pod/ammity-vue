<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div class="become-box" style="margin-bottom:0;padding-bottom:0;">
			<div v-if="page_item.text" v-html="page_item.text"></div>
			<div id="contact_menu" class="contact_menu">
				<div
					class="item question"
					:class="{'selected': selected_tab == 'question'}"
					@click="setTab('question');"
				></div>
				<div
					class="item comment"
					:class="{'selected': selected_tab=='comment'}"
					@click="setTab('comment');"
				></div>
				<div
					class="item service"
					:class="{'selected': selected_tab=='service'}"
					@click="setTab('service');"
				></div>
			</div>
		</div>
		<question :selected_tab="selected_tab"></question>
		<comment :selected_tab="selected_tab" :cat_array="cat_array"></comment>
		<service :selected_tab="selected_tab" :cat_array="cat_array"></service>
		<div class="hide">
			<img src="/img/client/bContact_comment_over.png">
			<img src="/img/client/bContact_comment_down.png">
			<img src="/img/client/bContact_service_over.png">
			<img src="/img/client/bContact_service_down.png">
			<img src="/img/client/icon/star_red.png">
		</div>
	</section>
</template>

<script>
import question from '../contact/contact-question';
import comment from '../contact/contact-comment';
import service from '../contact/contact-service';
export default {
	components: { question, comment, service },
	data() {
		return {
			page_item: {},
			cat_array: [],
			selected_tab: ''
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
						mnemonic: 'contact'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.cat_array = results.cat_array;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		},
		setTab(val) {
			this.selected_tab = val;
		}
	}
};
</script>
