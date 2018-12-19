<template>
	<div>
		<div id="diler_map" class="map-widget" style="width:720px; height:388px;"></div>
		<div class="map_tooltip hide">
			<div class="inner">
				<div class="content">
					<div class="name">Армавир-Спорт</div>
					<div class="city">г.Армавир</div>
					<div class="phone">8 (928) 848-29-34</div>
					<a href="@" class="site">www.armavir-sport.ru</a>
					<div class="close"></div>
				</div>
				<div class="arrow h"></div>
				<div class="arrow v"></div>
			</div>
		</div>
	</div>
</template>

<script>
import ext from '../ext-js/diler-map.js';
export default {
	props: ['diler_map_array'],
	watch: {
		diler_map_array: function(val) {
			if (this.diler_map_array.length) {
				ext.run(this.diler_map_array);
			}
		}
	}
};
</script>