<template>
  <div class="auth">
    <form @submit.prevent="authUser">
      <h2>Аутентификация</h2>
      <label>Логин</label>
      <div>
      <input id="login-field" maxlength="10" required v-model="login"/>
      </div>
      <label>Пароль</label>
      <div>
      <input id="password-field" maxlength="15" required v-model="password" type="password"/>
      </div>
      <button type="submit">Войти</button>
    </form>
    <router-link id="reg" to="/register">Зарегистрироваться</router-link><br>
    <router-link id="key" to="/keyboard">Продолжить как гость</router-link>
    <div
        class="err"
        v-if="error_auth === 'error'">
      <label>Неверный логин и/или пароль</label>
    </div>
  </div>
</template>

<script>
export default {
  mounted()
  {
    this.$store.commit('initUser', null);
  },
  data(){
    return {
      login : '',
      password : '',
      error_auth: ''
    }
  },
  methods: {
    authUser: function ()
    {
      let login = this.login
      let password = this.password
      this.$nextTick(async ()=>{
        await this.$store.dispatch('httpGetUser', [login, password]);
        let res = this.$store.getters.getUser;
        if (res === null)
        {
          this.error_auth = 'error';
        }
        else
        {
          this.error_auth = '';
          await this.$router.push('/keyboard')
        }
      })
    },
  }
}
</script>

<style scoped>
.auth
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 30px;
  font-weight: bold;
  color: #2c3e50;
}

.auth input
{
  margin-bottom: 10px;
}

.auth button
{
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 12px;
  font-size: 16px;
  margin-top: 10px;
}

.auth button:active
{
  background-color: white;
}

.err label
{
  color: #ff0000;
}

#reg
{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#key
{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
