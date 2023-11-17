import { defineStore } from 'pinia';
import { ApiService } from '../services/ApiService';
import RequestType from '../interfaces/RequestType';
import { Request, RequestParameter } from '../interfaces/Request';
import { Notify } from 'quasar';
const apiService = new ApiService();

type State = {
  storedRequestsTypes: RequestType[] | null;
  storedRequest: Request[] | null;
};

const useRequestStore = defineStore('solicitud', {
  state: (): State => ({
    storedRequestsTypes: JSON.parse(localStorage.getItem('requestType') || 'null') as RequestType[],
    storedRequest: JSON.parse(localStorage.getItem('request') || 'null') as Request[],
  }),
  getters: {
    requestsTypes: (state): RequestType[] | null => {
      return state.storedRequestsTypes;
    },
    requestByTypeId: (state): Request[] | null => {
      return state.storedRequest;
    },
  },
  actions: {
    async fetchRequestsTypes(): Promise<void> {
      try {
        const result = await apiService.get('tipos-solicitud');
        if (result.status === 200 && Object.keys(result?.data?.data).length) {
          this.storedRequestsTypes = result.data.data;
          localStorage.setItem('requestType', JSON.stringify(result.data.data));
        } else {
          this.storedRequestsTypes = null;
          localStorage.removeItem('requestType');
        }
      } catch (error) {
        console.error(error);
        this.storedRequestsTypes = null;
        localStorage.removeItem('requestType');
        Notify.create({
          message: 'No se pudo obtener los tiopos de solicitud, por favor intentelo mas tarde',
          color: 'negative',
        });
      }
    },
    /**
     * this function get requests by requestTypeId and return the numbers of records fetched
     * @param idTipoSolicitud
     * @returns
     */
    async fetchRequestsByTypeId(idTipoSolicitud: number): Promise<number> {
      try {
        const result = await apiService.post(`solicitudes/listar/${idTipoSolicitud}`, {});
        if (result.status === 200 && Object.keys(result?.data?.data?.result).length) {
          const { result: resultRequest } = result.data.data;
          this.storedRequest = resultRequest;
          localStorage.setItem('request', JSON.stringify(resultRequest));
          return resultRequest.length;
        }
        this.storedRequest = null;
        localStorage.removeItem('request');
        return 0;
      } catch (error) {
        this.storedRequest = null;
        localStorage.removeItem('request');
        Notify.create({
          message: 'No se pudo obtener las solicitudes, por favor intentlo mas tarde',
          color: 'negative',
        });
        return 0;
      }
    },
    async saveRequest(params: RequestParameter): Promise<boolean> {
      try {
        const result = await apiService.post('solicitudes', params);
        if (result.status === 201) {
          const { message } = result.data;
          Notify.create({
            message,
            color: 'positive',
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error(error);
        Notify.create({
          message: 'No se pudo guardar la solicitud, por favor intentlo mas tarde',
          color: 'negative',
        });
        return false;
      }
    },
  },
});

export default useRequestStore;
