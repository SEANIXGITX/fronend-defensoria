<template>
    <q-table class="q-mt-md" flat bordered  :pagination="paginacion" :rows="programas"
      :columns="columns" row-key="id">
      <template v-slot:body-cell-Acciones="props">
        <q-td :props="props" class="text-center">
          <q-btn flat dense round style="color: #48c9b0" icon="print" class="q-ml-sm" size="sm"
            @click="imprimirFila(props.row)"></q-btn>
          <q-btn flat dense round style="color: #1a5276" icon="edit" class="q-ml-sm" size="sm"
            @click="editatFila(props.row)"></q-btn>
          <q-btn flat dense round style="color: #85c1e9" icon="visibility" class="q-ml-sm" size="sm"
            @click="verFila(props.row)"></q-btn>
        </q-td>
      </template>
    </q-table>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from 'axios';
  const programas = ref([]);
  const paginacion = ref(null)
  const columns = [
    { name: 'Codigo', align: 'left', label: 'Código', field: 'codigo', sortable: true, headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;', },
    { name: 'Descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true, headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;', },
    { name: 'Ponderacion', align: 'center', label: 'Ponderación', field: 'ponderacion', sortable: true, headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;', },
    { name: 'Acciones', align: 'right', label: 'Acciónes', sortable: false, headerStyle: 'background-color: #127f8b !important;color: #ffffff; font-weight: 700;', },
  ];
  
  const obtenerProgramas = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/v1/programas/listar');
      programas.value = data.data.result.map((programa) => programa);
      paginacion.value = data.data.pagination;
    } catch (error) {
      console.error(error);
    }
  };
  obtenerProgramas();
  </script>
  
  <style></style>