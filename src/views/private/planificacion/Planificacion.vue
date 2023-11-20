<template>
    <h3 class="text-h3">Objetivo Estratégico
        Institucional</h3>
    <div class="">
        <q-form
            class="row items-center q-col-gutter-md">
            <!-- buscador y botones -->
            <q-input outlined
                v-model="searchText"
                placeholder="Buscar..."
                dense clearable
                @clear="clearSearch"
                @keydown.enter="performSearch"
                class="col-8">
                <template v-slot:append>
                    <q-icon name="search"
                        class="cursor-pointer"
                        @click="performSearch" />
                </template>
            </q-input>
            <div
                class="col-4 q-px-sm justify-end">
                <q-btn label="crear"
                    color="primary"
                    @click="crearPrograma"></q-btn>
                <q-btn
                    label="ponderar"></q-btn>
            </div>
        </q-form>
        <!-- tabla -->
        <tablaProgramas />
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import tablaProgramas from '../../../components/planificacion/tabla.vue';
import modalCrear from '../../../components/planificacion/modalCrear.vue';

const $q = useQuasar()
const searchText = '';
const programas = ref([]);
const columns = [
    { name: 'Codigo', align: 'left', label: 'Código', field: 'codigo', sortable: true },
    { name: 'Descripcion', align: 'center', label: 'Descripción', field: 'descripcion', sortable: true },
    { name: 'Ponderacion', align: 'center', label: 'Ponderación', field: 'ponderacion', sortable: true },
    { name: 'Acciones', align: 'right', label: 'Acciónes', sortable: false },
];

const tipoGestion = ref('');

function performSearch() {
    // Implementa aquí la lógica de búsqueda
    console.log('Realizando búsqueda:', searchText.value);
}

function clearSearch() {
    searchText.value = '';
}

function crearPrograma() {
    $q.dialog({
        component: modalCrear,

        // props forwarded to your custom component
        componentProps: {
            title: 'Crear Programa',
            persistent: true
            // ...more..props...
        }
    }).onOk(() => {
        console.log('OK')
    }).onCancel(() => {
        console.log('Cancel')
    }).onDismiss(() => {
        console.log('Called on OK or Cancel')
    })
}

</script>
  
<style></style>