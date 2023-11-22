import { defineStore } from 'pinia';
// import axios  from "axios";
import { ApiService } from '../services/ApiService';
// import { Login } from '../interfaces/Login';
// import { User } from '../interfaces/User';
// import Menu from '../interfaces/Menu';
const apiService = new ApiService();

type State = {
  storeIndicadores: Array<any>;
  storeResponsables: Array<any>;
  storePrueba: string;
};

const usePlanificacionStore = defineStore('planificacion', {
  state: (): State => ({
    storeIndicadores: [],
    storeResponsables: [],
    storePrueba: 'qweqweqwe',
  }),
  getters: {
    indicadores: (state): Array<any> => {
      return state.storeIndicadores;
    },
    responsables: (state): Array<any> => {
      return state.storeResponsables;
    },
    prueba: (state): string => {
      return state.storePrueba;
    },
    // user: (state): User | null => {
    //   return state.storedUser;
    // },
    // menus: (state): Menu[] => {
    //   return state.menu;
    // },
    // unidadId: (state): number => {
    //   return state.storedUser?.funcionario?.unidadId || 0;
    // },
    // userIsAuth: () => false,
  },
  actions: {
    // async obtenerIndicadores() {
    //   try {
    //     const response = await axios.get('http://localhost:3000/api/v1/indicadores');
    //     this.storeIndicadores = response.data.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async obtenerIndicadores() {
      try {
        const resultado = await apiService.get('indicadores');
        if (resultado.status === 200 && Object.keys(resultado.data.data).length) {
          this.storeIndicadores = resultado.data.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerResponsables() {
      try {
        const resultado = await apiService.get('usuarios');
        if (resultado.status === 200 && Object.keys(resultado.data.data).length) {
          this.storeResponsables = resultado.data.data;
          console.log(this.storeResponsables)
        }
      } catch (error) {
        console.error(error);
      }
    },
    // async login(params: Login): Promise<boolean> {
    //   const cleanVariables = () => {
    //     this.storedUser = null;
    //     this.token = '';
    //     this.menu = [];
    //     localStorage.removeItem('storedUser');
    //     localStorage.removeItem('menus');
    //   };
    //   try {
    //     const result = await apiService.post('auth/login', params);

    //     if (result.status === 200 && Object.keys(result.data.data).length) {
    //       const { usuario, menus } = result.data.data;
    //       this.menu = menus;
    //       this.storedUser = usuario;
    //       this.token = usuario.token;
    //       localStorage.setItem('storedUser', JSON.stringify(usuario));
    //       localStorage.setItem('menus', JSON.stringify(menus));
    //       return true;
    //     } else {
    //       cleanVariables();
    //       return false;
    //     }
    //   } catch (error) {
    //     cleanVariables();
    //     return false;
    //   }
    // },
  },
});

export default usePlanificacionStore;
