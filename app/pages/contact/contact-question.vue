<template>
	<div id="question_form" :style="selected_tab != 'question' ? 'display:none' :''" class="page_form">
		<!--Вопрос в компанию-->
		<div class="header">Вопрос в компанию:</div>
		<table class="form_table">
			<tr>
				<!--Ваше ФИО fio-->
				<td class="name">Ваше ФИО:</td>
				<td class="value">
					<input id="q_fio" v-model="form.fio" type="text" value>
				</td>
			</tr>
			<tr>
				<!--Email email-->
				<td class="name">Email:</td>
				<td class="value">
					<input id="q_email" v-model="form.email" type="text" value>
				</td>
			</tr>
			<tr>
				<!--Телефон с кодом города phone-->
				<td class="name">Телефон с кодом города:</td>
				<td class="value">
					<input id="q_phone" v-model="form.phone" type="text" value placeholder="8 (000) 000-00-00">
				</td>
			</tr>
			<tr>
				<!--вопрос:-->
				<td class="name">вопрос:</td>
				<td class="value">
					<textarea id="q_text" v-model="form.text"></textarea>
				</td>
			</tr>
			<tr>
				<!--обязательно к заполнению-->
				<td class="name"></td>
				<td
					class="value info"
				>Все поля обязательны для заполнения. Пожалуйста, внимательно проверьте написание адреса вашей электронной почты, и при необходимости, укажите дополнительный способ связи. После отправки вашего обращения или вопроса, специалист ответит вам в кратчайшие сроки. Обращаем ваше внимание, что отдел поддержки работает с 10:00 до 18:00 часов по московскому времени, в будни.</td>
			</tr>
			<tr>
				<!--Отправить-->
				<td class="name"></td>
				<td class="value">
					<div class="btn_send transition" @click="sendForm">Отправить</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	props: ['selected_tab'],
	data() {
		return {
			form: {}
		};
	},
	methods: {
		sendForm() {
			var form = this.form;

			if (
				form.fio == '' ||
				form.email == '' ||
				form.phone == '' ||
				form.text == ''
			) {
				fn.uAlert('Все поля формы обязательны для заполнения!');
				return;
			}

			form.mode = 'addQuestionItem';
			fn.showProcess('Отправка запроса');

			this.$http
				.post(this.$store.getters.get('script_url'), form)
				.then(results => {
					fn.hideProcess();
					fn.completeProcess('Сообщение', 'Спасибо за обращение');
					this.form = {};
				});
		}
	}
};
</script>