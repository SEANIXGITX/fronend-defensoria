<template>
  <div class="row justify-center">
    <section class="col-12">
      <div class="title text-h3 text-secondary">Solicitudes</div>
      <br />
      <div class="row justify-around q-mx-md">
        <div class="col-xs-12 col-sm-6 col-md-3" v-for="requestType in requestsTypes" :key="requestType.id">
          <q-card class="q-mb-md q-mx-md bg-primary text-white card" @click="openRequest(requestType)">
            <q-card-section>
              <div class="text-h4 text-center">{{ requestType.descripcion }} ({{ requestType.sigla }})</div>
            </q-card-section>
            <q-card-section> </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import RequestType from '../../../interfaces/RequestType';
import useRequestStore from '../../../store/Request';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const requestStore = useRequestStore();
const $q = useQuasar();

//hoooks
onMounted(async () => {
  await requestStore.fetchRequestsTypes();
});

const requestsTypes = computed(() => {
  return requestStore?.requestsTypes;
});

//methods
const openRequest = async (requestType: RequestType) => {
  const requestsLength = await requestStore.fetchRequestsByTypeId(requestType.id);

  if (requestsLength) {
    router.push({ name: 'solicitudDetalle', params: { id: requestType.id } });
  } else {
    $q.notify({
      message: 'No se tienen solicitudes para mostrar',
      type: 'info',
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
  }
};
</script>
<style lang="scss" scoped>
.header-section {
  display: flex;
  justify-content: space-between;
}
.card {
  cursor: pointer;
  font-family: Arial, sans-serif;
  height: 150px;
}
.card:hover {
  transform: scale(1.02);
}
</style>
