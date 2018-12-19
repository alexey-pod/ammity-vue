<template>
	<section class="content-main">
		<div class="page_header margin_bottom">
			<h1>{{ page_item.name }}</h1>
		</div>
		<div
			v-if="page_item.text"
			class="become-box"
			style="margin-bottom:0;padding-bottom:0;"
			v-html="page_item.text"
		></div>
		<div class="page_form">
			<div class="header">Запрос на дилерство:</div>
			<table class="form_table">
				<tr>
					<!--sd_name-->
					<td class="name">название организации:</td>
					<td class="value">
						<input id="sd_name" v-model="form.name" type="text">
					</td>
				</tr>
				<tr>
					<!--sd_fio-->
					<td class="name">Контактное лицо:</td>
					<td class="value">
						<input id="sd_fio" v-model="form.fio" type="text">
					</td>
				</tr>
				<tr>
					<!--sd_city-->
					<td class="name">город:</td>
					<td class="value">
						<input id="sd_city" v-model="form.city" type="text">
					</td>
				</tr>
				<tr>
					<!--sd_phone-->
					<td class="name">телефон:</td>
					<td class="value">
						<input id="sd_phone" v-model="form.phone" type="text" placeholder="8 (000) 000-00-00">
					</td>
				</tr>
				<tr>
					<!--sd_email-->
					<td class="name">E-mail:</td>
					<td class="value">
						<input id="sd_email" v-model="form.email" type="text">
					</td>
				</tr>
				<tr>
					<!--sd_site-->
					<td class="name">WEB-сайт:</td>
					<td class="value">
						<input id="sd_site" v-model="form.site" type="text">
					</td>
				</tr>
				<tr>
					<!--sd_note-->
					<td class="name">Примечание:</td>
					<td class="value">
						<textarea id="sd_note" v-model="form.note" class="type-text" cols="50" rows="4"></textarea>
					</td>
				</tr>
				<tr>
					<!--Отправить-->
					<td class="name"></td>
					<td class="value">
						<div class="btn_send transition" @click="sendForm">отправить запрос</div>
					</td>
				</tr>
			</table>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			page_item: {},
			form: {}
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
						mnemonic: 'cooperation'
					}
				})
				.then(results => {
					results = results.data;
					this.page_item = results.page_item;

					this.$store.commit('set', {
						type: 'page_item',
						items: results.page_item
					});
				});
		},
		sendForm() {
			var form = this.form;

			if (!form.name) {
				fn.uAlert('НАЗВАНИЕ ОРГАНИЗАЦИИ - не заполнено');
				return;
			}
			if (!form.fio) {
				fn.uAlert('КОНТАКТНОЕ ЛИЦО - не заполнено');
				return;
			}
			if (!form.city) {
				fn.uAlert('ГОРОД - не заполнено');
				return;
			}
			if (!form.phone) {
				fn.uAlert('ТЕЛЕФОН - не заполнено');
				return;
			}
			if (!form.email) {
				fn.uAlert('E-MAIL - не заполнено');
				return;
			}
			if (!fn.isEmail(form.email)) {
				fn.uAlert('E-MAIL - заполнено неверно');
				return;
			}

			form.mode = 'addDealerRequestItem';
			fn.showProcess('Отправка запроса');

			this.$http
				.post(this.$store.getters.get('script_url'), form)
				.then(results => {
					fn.hideProcess();
					fn.completeProcess(
						'Сообщение',
						'Спасибо ваше письмо принято.</br>Вскоре с Вами свяжется наш представитель.'
					);
					this.form = {};
				});
		}
	}
};
</script>



