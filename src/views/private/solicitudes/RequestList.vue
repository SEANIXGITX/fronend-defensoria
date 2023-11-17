<template>
  <div class="q-pa-md">
    <div class="title text-h3 text-secondary">Solicitudes de {{ requestType }}</div>
    <div class="option-header">
      <div class="option-header--search">
        <q-input outlined v-model="search" label="Búsqueda " lazy-rules>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="search = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <q-btn round color="secondary" icon="add" @click="openModalNewRequest">
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          <strong>Crea Nueva Solicitud</strong>
        </q-tooltip>
      </q-btn>
    </div>
    <q-table
      class="my-sticky-header-table"
      :dense="$q.screen.lt.md"
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[50, 100]"
    >
      <template v-slot:body-cell-options="props">
        <q-td :props="props">
          <q-btn flat round color="secondary" icon="edit">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>Editar</strong>
            </q-tooltip>
          </q-btn>
          <q-btn flat round color="secondary" icon="delete">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>Eliminar</strong>
            </q-tooltip>
          </q-btn>
          <q-btn flat round color="secondary" icon="visibility">
            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
              <strong>Resumen</strong>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="modalRequest" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
    <q-card>
      <q-bar class="bg-primary text-white">
        <div class="text-weight-bold"><span>Nueva Solicitud</span></div>
        <q-space />
        <q-btn round flat icon="close" v-close-popup size="sm" class="text-white bg-secondary">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <RequestDetail
          :unitOperations="unitOperations"
          :budgetItems="budgetItems"
          :fetchBudgetItems="fetchBudgetItems"
          :measuramentUnits="measuramentUnits"
          :unitId="unitId"
          :saveRequest="saveRequest"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useRequestStore from '../../../store/Request';
import useRequestDetailStore from '../../../store/RequestDetail';
import useUserStore from '../../../store/User';
import RequestDetail from '../../../components/solicitudes/RequestDetail.vue';
import { RequestParameter } from '../../../interfaces/Request';

const route = useRoute();
const requestStore = useRequestStore();
const requestDetailStore = useRequestDetailStore();
const usetStore = useUserStore();

//variables
const search = ref('');
const modalRequest = ref(false);

const columns = [
  {
    name: 'nroSolicitud',
    required: true,
    label: 'Nro. Sol',
    field: 'nroSolicitud',
    align: 'center',
    headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;',
  },
  {
    name: 'justificacion',
    align: 'left',
    label: 'Justificacion',
    field: 'justificacion',
    sortable: true,
    headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;',
  },
  {
    name: 'requeridoPara',
    align: 'center',
    label: 'Requerido Para',
    field: 'requeridoPara',
    sortable: true,
    headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;',
  },
  {
    name: 'tipoSolicitud',
    align: 'center',
    label: 'Tipo Solicitud',
    field: 'tipoSolicitud',
    headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;',
  },
  {
    name: 'options',
    label: 'Opciones',
    align: 'center',
    headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;',
  },
];

//hooks
onMounted(async () => {
  await requestDetailStore.fetchUnitOperations(unitId.value);
  await requestDetailStore.fetchMeasuramentItems();
});

const requestsTypes = computed(() => {
  return requestStore.requestsTypes;
});

const requestType = computed(() => {
  const requestTypeId = Number(route.params.id);
  const temp = requestsTypes?.value?.find((request) => request.id === requestTypeId);
  return temp?.descripcion || '';
});

const rows = computed(() => {
  return requestStore.requestByTypeId?.map((request) => {
    return {
      ...request,
      tipoSolicitud: requestType.value,
      opciones: '',
    };
  });
});

const unitOperations = computed(() => {
  return requestDetailStore.storedUnitOperation;
});

const budgetItems = computed(() => {
  return requestDetailStore.budgetItems;
});

const measuramentUnits = computed(() => {
  return requestDetailStore.measuramentUnits;
});

const unitId = computed(() => {
  return usetStore.unidadId;
});

//functions
const openModalNewRequest = () => {
  modalRequest.value = true;
};

const fetchBudgetItems = async (idOperation: number) => {
  await requestDetailStore.fetchBudgetItems(idOperation);
};

const saveRequest = async (paramsRequest: RequestParameter) => {
  return requestStore.saveRequest(paramsRequest);
};
</script>
<style lang="scss" scoped>
.option-header {
  padding: 1rem;
  background: $grey-3;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  .q-input {
    background: #ffffff;
  }
  &--search {
    margin-right: 1rem;
    width: 100%;
  }
}
</style>
