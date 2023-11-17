import { defineStore } from 'pinia';
import { ApiService } from '../services/ApiService';
import { Login } from '../interfaces/Login';
import { User } from '../interfaces/User';
import Menu from '../interfaces/Menu';
const apiService = new ApiService();

type State = {
  token: string;
  menu: Menu[];
  storedUser: User | null;
};

const useUserStore = defineStore('user', {
  state: (): State => ({
    token: '',
    menu: JSON.parse(localStorage.getItem('menus') || 'null') as Menu[],
    storedUser: JSON.parse(localStorage.getItem('storedUser') || 'null') as User,
  }),
  getters: {
    user: (state): User | null => {
      return state.storedUser;
    },
    menus: (state): Menu[] => {
      return state.menu;
    },
    unidadId: (state): number => {
      return state.storedUser?.funcionario?.unidadId || 0;
    },
    userIsAuth: () => false,
  },
  actions: {
    async login(params: Login): Promise<boolean> {
      const cleanVariables = () => {
        this.storedUser = null;
        this.token = '';
        this.menu = [];
        localStorage.removeItem('storedUser');
        localStorage.removeItem('menus');
      };
      try {
        const result = await apiService.post('auth/login', params);

        if (result.status === 200 && Object.keys(result.data.data).length) {
          const { usuario, menus } = result.data.data;
          this.menu = menus;
          this.storedUser = usuario;
          this.token = usuario.token;
          localStorage.setItem('storedUser', JSON.stringify(usuario));
          localStorage.setItem('menus', JSON.stringify(menus));
          return true;
        } else {
          cleanVariables();
          return false;
        }
      } catch (error) {
        cleanVariables();
        return false;
      }
    },
  },
});

export default useUserStore;
