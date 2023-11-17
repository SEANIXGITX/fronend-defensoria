import { defineStore } from 'pinia';
import { ApiService } from '../services/ApiService';
import UnitOperation from '../interfaces/UnitOperation';
import { BudgetItems } from '../interfaces/BudgetItems';
import MeasuramentUnit from '../interfaces/MeasuramentUnit';
import { Notify } from 'quasar';
const apiService = new ApiService();

type State = {
  storedUnitOperation: UnitOperation[];
  storedBudgetItems: BudgetItems[];
  storedMeasurementUnits: MeasuramentUnit[];
};

const useRequestDetailStore = defineStore('solicitudDetalle', {
  state: (): State => ({
    storedUnitOperation: [],
    storedBudgetItems: [],
    storedMeasurementUnits: [],
  }),
  getters: {
    unitOerations: (state): UnitOperation[] => {
      return state.storedUnitOperation;
    },
    budgetItems: (state): BudgetItems[] => {
      return state.storedBudgetItems;
    },
    measuramentUnits: (state): MeasuramentUnit[] => {
      return state.storedMeasurementUnits;
    },
  },
  actions: {
    async fetchUnitOperations(idUnidad: number): Promise<void> {
      try {
        const result = await apiService.get(`operaciones/unidad/${idUnidad}`);
        if (result.status === 200 && Object.keys(result?.data?.data).length) {
          this.storedUnitOperation = result.data.data;
        } else {
          this.storedUnitOperation = [];
        }
      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'No se pudo obtener las operaciones de unidad, por favor intentlo mas tarde',
          color: 'negative',
        });
      }
    },
    async fetchBudgetItems(idOperacion: number): Promise<void> {
      try {
        const result = await apiService.get(`partidas/operacion/${idOperacion}`);
        if (result.status === 200 && Object.keys(result?.data?.data).length) {
          this.storedBudgetItems = result.data.data;
        } else {
          this.storedBudgetItems = [];
        }
      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'No se pudo obtener las partidas presupuestarias, por favor intentlo mas tarde',
          color: 'negative',
        });
      }
    },
    async fetchMeasuramentItems(): Promise<void> {
      try {
        const result = await apiService.get('unidades-medida');
        if (result.status === 200 && Object.keys(result?.data?.data).length) {
          this.storedMeasurementUnits = result.data.data;
        } else {
          this.storedMeasurementUnits = [];
        }
      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'No se pudo obtener las unidades de medida, por favor intentlo mas tarde',
          color: 'negative',
        });
      }
    },
  },
});

export default useRequestDetailStore;
