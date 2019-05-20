<template>
	<section class="mt-5">
		<b-container>
			<b-row class="justify-content-center">
				<b-col cols="12" md="8" lg="4">
					<h3 class="mb-4">Welcome EG</h3>
					<b-form @submit.prevent="login">
						<b-form-group>
							<b-form-input placeholder="Login" v-model="form.email" />
						</b-form-group>

						<b-form-group>
							<b-form-input placeholder="Password" v-model="form.password" />
						</b-form-group>

						<b-form-group>
							<div class="invalid-feedback d-block" v-if="errors.email">
								{{ errors.email }}
							</div>
						</b-form-group>
						
						<b-form-group>
							<b-button type="submit" class="btn-success btn-block">Login in</b-button>
						</b-form-group>
					</b-form>
				
				</b-col>

			</b-row>
		</b-container>
	</section>
</template>

<script>
export default {
	middleware: ['noGuest'],
	
	data() {
		return {
			form: {
				email: '',
				password: '',
				remember_me: false
			}
		}
	},

	methods: {
		async login() {                
			await this.$auth.login({ data: this.form }).then(res => {
				this.$router.push({ name: 'dashboard' })
			});
		},
	},
}
</script>

<style scoped lang="sass">
.test 
	background: #ccc
</style>