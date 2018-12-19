<template>
	<div id="left_menu">
		<nav v-for="left_menu_item in left_menu" :key="left_menu_item.id">
			<ul>
				<li :class="{ open: left_menu_item.mnemonic == cat_mnemonic }">
					<a :href="left_menu_item.link_disable==0 ? left_menu_item.url:''">{{ left_menu_item.name }}</a>
					<ul class="submenu" :style="left_menu_item.mnemonic != cat_mnemonic ? 'display:none':''">
						<li v-for="seria_item in left_menu_item.seria_array" :key="seria_item.id">
							<a :href="seria_item.url">{{ seria_item.name }}</a>
							<ul>
								<a
									v-for="ann_item in seria_item.ann_array"
									:key="ann_item.id"
									:class="{ selected: ann_item.mnemonic == ann_mnemonic }"
									:href="ann_item.url"
								>{{ ann_item.name }}</a>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	computed: {
		left_menu() {
			return this.$store.getters.get('left_menu');
		},
		cat_mnemonic() {
			return this.$store.getters.get('cat_mnemonic');
		},
		ann_mnemonic() {
			return this.$store.getters.get('ann_mnemonic');
		}
	}
};
</script>