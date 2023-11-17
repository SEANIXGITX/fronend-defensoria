<template>
  <main>
    <div class="login-container">
      <q-form @submit="login">
        <div class="login-image">
          <img src="../../assets/logo-def.png" alt="" />
        </div>
        <div class="form-group">
          <label for="username">Usuario:</label>
          <q-input
            filled
            v-model="userName"
            label="Nombre de Usuario*"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Introduzca el nombre de usuario']"
          />
        </div>
        <div class="form-group">
          <label for="username">Password:</label>
          <q-input
            label="Password*"
            v-model="password"
            filled
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Introduzca el Password']"
          >
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </div>
        <div class="form-group">
          <button>Iniciar Sesión</button>
        </div>
      </q-form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useUserStore from '../../store/User';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { Login } from '../../interfaces/Login';

const router = useRouter();
const userStore = useUserStore();
const $q = useQuasar();

//variables
const userName = ref('');
const password = ref('');
const isPwd = ref(true);

//functions
const login = async () => {
  if (!userName.value || !password.value) {
    message('Se debe introducir el usuario y password', 'error');
    return;
  }
  const login: Login = {
    usuario: userName.value,
    clave: password.value,
  };
  const isLogged = await userStore.login(login);
  if (isLogged) {
    message('Bienvenido!!', 'positive');
    router.push('/home');
  } else {
    message('El usuario o contraseña son incorrectos', 'negative');
  }
};

const message = (message: string, type: string) => {
  $q.notify({
    message,
    type,
    actions: [
      {
        icon: 'close',
        color: 'white',
        round: true,
        handler: () => {
          /* ... */
        },
      },
    ],
  });
};
</script>
<style lang="scss" scoped>
main {
  height: 100vh;
  max-width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary;
  .login-container {
    max-width: 400px;
    height: 500px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .form-group {
      margin: 10px 0;
      width: 350px;
      label {
        display: block;
        font-weight: bold;
        color: $primary;
      }
      button {
        margin-top: 1rem;
        width: 100%;
        padding: 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background: $secondary;
        color: #ffffff;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .login-image {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
}
</style>
