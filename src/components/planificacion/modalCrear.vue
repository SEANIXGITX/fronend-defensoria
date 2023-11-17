<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide">

        <q-card class="q-dialog-plugin">
            <p class="text-center q-mt-sm">Crear nuevo Programa</p>
            <q-form @submit.prevent.stop="guardarPrograma" @reset.prevent.stop="limpiarFormulario">
                <q-card-section class="row items-center q-col-gutter-md justify-center">
                    <q-select ref="gestionRef" class="col-6" square filled v-model="gestion" :options="gestiones"
                        option-label="descripcion" label="Gestión" @update:model-value="selectGestion" />
                    <q-input disable class="col-6" label="Código" />
                    <q-input class="col-12" type="textarea" v-model="descripcion" label="Descripción de programa" counter
                        @keyup.enter.stop lazy-rules :rules="[val => !!val || 'Escriba una descripción']" />
                    <q-input class="col-12" @keyup.enter.stop label="Meta total" lazy-rules
                        :rules="[val => !!val || 'Escriba la meta total']" />
                    <div v-for="index in calculoGestion.num" :key="index">
                        <q-input style="width: 90px;" v-model="inputValues[index - 1]"
                            :label="calculoGestion.label + ' ' + index" :rules="[val => !!val || 'Escriba el bimestre']" />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Submit" type="submit" color="primary" />
                    <!-- <q-btn color="primary" label="Guardar" @click="onOKClick" /> -->
                    <q-btn outlined label="Cancelar" @click="onDialogCancel" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';

// variables
let storeGestion = null;
const gestion = ref();
const gestionRef = ref();
const gestiones = ref(null);
const programa = ref(null);
const programas = ref(null);
const descripcion = ref('');
const numInputs = ref({});
const inputValues = ref([]);



//hooks
onMounted(() => {
    storeGestion = localStorage.getItem('gestion');
    if (storeGestion) {
        gestion.value = JSON.parse(storeGestion);
    }
});

// functions
const obtenerGestiones = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/v1/gestiones');
        gestiones.value = data.data.map((gestion) => gestion);
    } catch (error) {
        console.error(error);
    }
};
obtenerGestiones();

const obtenerProgramas = async () => {
    try {
        const { data } = await axios.post('http://localhost:3000/api/v1/programas/listar');
        programas.value = data.data.result.map((programa) => programa);
    } catch (error) {
        console.error(error);
    }
};
obtenerProgramas();

const selectGestion = (value) => {
    localStorage.setItem('gestion', JSON.stringify(gestion.value));
}

const calculoGestion = computed(() => {
    const { descripcion, tipoPeriodo } = gestion.value;
    if (tipoPeriodo.codigoTipo === 'TRIMESTRAL') {
        numInputs.value = {
            num: 3,
            label: 'Trimestre'
        }
        return numInputs.value;
    }
    if (tipoPeriodo.codigoTipo === 'SEMESTRAL') {
        numInputs.value = {
            num: 6,
            label: 'Semestre'
        }
        return numInputs.value;
    }
    if (tipoPeriodo.codigoTipo === 'BIMESTRAL') {
        numInputs.value = {
            num: 2,
            label: 'Bimestre'
        }
        return numInputs.value;
    }

});

const props = defineProps({
    // ...your custom props
})

defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
// function onOKClick() {
//     // on OK, it is REQUIRED to
//     // call onDialogOK (with optional payload)
//     onDialogOK()
//     // or with payload: onDialogOK({ ... })
//     // ...and it will also hide the dialog automatically
// }
function guardarPrograma() {
    onDialogOK()
}


function limpiarFormulario() {

}

</script>
<style scope>
.inputPeriodo {
    width: 52px;

}
</style>