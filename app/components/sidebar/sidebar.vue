<template>
	<aside
		id="left_sidebar"
		class="sidebar"
		:style="mnemonic == 'index' || mnemonic == 'compare' ? 'display:none;' : ''"
	>
		<menu-block></menu-block>
		<banner-block></banner-block>
	</aside>
</template>

<script>
import menu from '../sidebar/sidebar-menu';
import banner from '../sidebar/sidebar-banner';

export default {
	components: { 'banner-block': banner, 'menu-block': menu },
	computed: {
		mnemonic() {
			return this.$store.getters.get('page_item').mnemonic;
		}
	}
};
</script>