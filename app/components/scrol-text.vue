<template>
	<div class="text" v-html="text"></div>
</template>

<script>
import Vue from 'vue';

export default {
	props: ['text'],
	mounted() {
		var el = this.$el;
		var height = $(el).height();
		if (height < 160) {
			$(el).height(height);
			$(el).css({ 'padding-right': 10 });
		} else {
			$(el).height(160);
			$(el).scrollbars();
			$(el)
				.find('.scrollblock')
				.after('<div class="scrollblock_bg"></div>');
		}
	}
};
</script>