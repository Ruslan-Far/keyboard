<template>
  <div class="register">
    <h2>Регистрация</h2>
    <form @submit.prevent="regUser">
      <label>Логин</label>
      <div>
        <input id="login" maxlength="10" v-model="login" required>
      </div>
      <label for="password">Пароль</label>
      <div>
        <input id="password" type="password" maxlength="15" v-model="password" required>
      </div>
      <div>
        <button type="submit">Зарегистрироваться</button>
      </div>
    </form>
    <router-link id="auth" to="/">Аутентификация</router-link>
    <div
        class="err"
        v-if="error_reg === 'error'">
      <label>Данный логин уже существует!</label>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      login : '',
      password : '',
      error_reg: ''
    }
  },
  methods: {
    regUser: function ()
    {
      let login = this.login
      let password = this.password
      this.$nextTick(async ()=> {
        await this.$store.dispatch('httpPostUser', [login, password]);
        let res = this.$store.getters.getUser;
        if (res === null)
        {
          this.error_reg = 'error';
        }
        else
        {
          this.error_reg = '';
          await this.$router.push('/keyboard')
        }
      })
    },
  }
}
</script>


<style scoped>
.register {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 30px;
  font-weight: bold;
  color: #2c3e50;
}

.register input
{
  margin-bottom: 10px;
}

.register button
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

.register button:active
{
  background-color: white;
}

.err label
{
  color: #ff0000;
}

#auth
{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
