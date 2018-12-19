<template>
	<div>
		<select v-if="input_array" v-model="select" :disabled="input_array_length == 0">
			<option value="0">выбор...</option>
			<option v-for="item in input_array" :key="item.id" :value="item.id">{{ item.name }}</option>
		</select>
	</div>
</template>

<script>
export default {
	props: ['input_array', 'output_array', 'output_id', 'mode', 'config'],
	data() {
		return {
			select: 0
		};
	},
	computed: {
		input_array_length: function() {
			if (this.input_array) {
				return this.input_array.length;
			}
			return 0;
		}
	},
	watch: {
		select: function(val) {
			this.$emit('update:output_id', val);
			this.$emit('update:output_array', []);
			this.change(val);
		},
		input_array: function() {
			this.select = 0;
		},
		output_id: function(val) {
			if (val == 0) {
				this.$emit('update:output_array', []);
			}
			return val;
		}
	},
	methods: {
		change(cat_id) {
			if (cat_id == 0) {
				this.$emit('update:output_array', []);
			}
			if (!this.config || !this.config.mode) {
				return;
			}
			var url = this.$store.getters.get('script_url');

			var params = {};
			params.cache = true;

			for (let key in this.config) {
				if (key != 'select_id') {
					params[key] = this.config[key];
				} else {
					params[this.config[key]] = cat_id;
				}
			}
			this.$http.post(url, params).then(results => {
				results = results.data;
				this.$emit('update:output_array', results);
			});
		}
	}
};
</script>