<template>

	<div class="uk-section">

		<div class="uk-container uk-container-small">

			<div class="uk-flex-center" uk-grid>

				<form class="uk-form-large uk-width-1-2@s" v-form="{form, submit}">

					<fieldset class="uk-fieldset">

						<legend class="uk-legend">Login</legend>

						<form-text v-model="form.email" name="email" placeholder="john.doe@provider.com"/>

						<form-password v-model="form.password" name="password" placeholder="Password"/>

						<div class="uk-margin uk-text-center">
							<form-submit :form="form" class="uk-width-1-1"/>
						</div>

					</fieldset>

				</form>
			</div>

		</div>

	</div>

</template>


<script>

    import Vue from "vue";

    export default {

        data(){

            return {

                form: new Form({
                    email: '',
                    password: '',
                }),
            }
        },

        methods: {

            submit()
            {
                this.form.submit('/login')
                    .then(({data}) => {
                        this.$store.commit('auth/login', {user: data});
                        this.$router.push({name: 'home'});
                    })
                    .catch(() => {})
            }

        }

    };

</script>