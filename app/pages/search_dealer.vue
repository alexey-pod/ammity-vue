<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<diler-map :diler_map_array="diler_map_array"></diler-map>
		<div class="become-box" style="margin-bottom:0;padding-bottom:0;">
			<div v-if="page_item.text" v-html="page_item.text"></div>
			<div class="select_city">
				<div class="list">
					<div
						v-for="item in alphabet_array"
						:key="item.id"
						class="item"
						:class="{'selected': letter==item, 'disabled': !diler_array[item]}"
						@click="setLetter(item);"
					>{{ item }}</div>
				</div>
				<div
					:class="{'show_all show': letter!='', 'show_all': letter==''}"
					@click="setLetter('');"
				>показать весь список</div>
			</div>
			<table id="d_table" class="diler_list">
				<tbody v-for="diler_item_letter in diler_array" :key="diler_item_letter.id">
					<tr
						class="letter"
						:style="diler_item_letter[0].index_letter == letter || letter == '' ? '' : 'display:none'"
					>
						<td colspan="4">{{ diler_item_letter[0].index_letter }}</td>
					</tr>
					<tr
						v-for="diler_item in diler_item_letter"
						:key="diler_item.id"
						class="diler"
						:style="diler_item_letter[0].index_letter == letter || letter == '' ? '' : 'display:none'"
					>
						<td class="city">{{ diler_item.city }}</td>
						<td class="name">{{ diler_item.name }}</td>
						<td class="site">
							<a
								v-if="diler_item.website1"
								:href="diler_item.website1_url"
								target="_blank"
							>{{ diler_item.website1 }}</a>
							<span v-if="diler_item.website2">
								<br>
								<a :href="diler_item.website2_url" target="_blank">{{ diler_item.website2 }}</a>
							</span>
						</td>
						<td class="phone">
							<span v-if="diler_item.tel1">{{ diler_item.tel1 }}</span>
							<span v-if="diler_item.tel2">
								<br>
								{{ diler_item.tel2 }}
							</span>
						</td>
					</tr>
					<tr
						class="rasp"
						:style="diler_item_letter[0].index_letter == letter || letter == '' ? '' : 'display:none'"
					>
						<td colspan="4"></td>
					</tr>
				</tbody>
			</table>
			<br>
			<br>
			<br>
		</div>
	</section>
</template>

<script>
import diler_map from '../components/diler-map';
export default {
	components: { 'diler-map': diler_map },
	data() {
		return {
			page_item: '',
			diler_array: '',
			diler_map_array: '',
			alphabet_array: [
				'А',
				'Б',
				'В',
				'Г',
				'Д',
				'Е',
				'Ж',
				'З',
				'И',
				'К',
				'Л',
				'М',
				'Н',
				'О',
				'П',
				'Р',
				'С',
				'Т',
				'У',
				'Ф',
				'Х',
				'Ц',
				'Ч',
				'Ш',
				'Э',
				'Ю',
				'Я'
			],
			letter: ''
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
			var url = '/app/respondents/pages.php';
			this.$http
				.get(url, {
					params: {
						mnemonic: 'search_dealer'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;
					this.diler_array = results.diler_array;
					this.diler_map_array = results.diler_map_array;
					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
					setTimeout(function() {
						$('table tr:nth-child(2n)').addClass('bg');
					}, 100);
				});
		},
		setLetter(letter) {
			if (!this.diler_array[letter] && letter != '') {
				return;
			}
			this.letter = letter;
		}
	}
};
</script>
