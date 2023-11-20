<template>
    <q-dialog ref="dialogRef"
        @hide="onDialogHide">

        <q-card class="q-dialog-plugin">
            <p class="text-center q-mt-sm">
                Crear
                nuevo
                Programa
            </p>
            <q-form
                @submit.prevent.stop="guardarPrograma"
                @reset.prevent.stop="limpiarFormulario">
                <q-card-section
                    class="row items-center q-col-gutter-md justify-center">
                    <q-select class="col-6"
                        square filled
                        v-model="gestion"
                        :options="gestiones"
                        option-label="descripcion"
                        label="Gestión"
                        @update:model-value="selectGestion">
                    </q-select>
                    <q-input disable
                        class="col-6"
                        label="Código" />
                    <q-input class="col-12"
                        :error-icon-size="90"
                        type="textarea"
                        v-model="descripcion"
                        label="Descripción de programa"
                        counter
                        @keyup.enter.stop
                        lazy-rules
                        :rules="[val => !!val || 'Escriba una descripción']" />
                    <q-input class="col-12"
                        v-model="metaTotal"
                        label="Meta total"
                        lazy-rules
                        :rules="[val => !!val || 'Escriba el número de la meta global']" />
                    <div v-for="index in calculoGestion.num"
                        :key="index">
                        <q-input
                            style="width: 90px;"
                            v-model="inputValores[index - 1]"
                            :label="calculoGestion.label + ' ' + index"
                            lazy-rules
                            :rules="[val => !!val || 'Escriba el periodo']" />
                    </div>
                </q-card-section>
                <q-card-actions
                    align="right">
                    <q-btn label="Guardar"
                        type="submit"
                        color="primary" />
                    <q-btn outlined
                        label="Cancelar"
                        @click="onDialogCancel" />
                </q-card-actions>
                <!-- {{ calculoGestion.num }} -->
            </q-form>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
import { useDialogPluginComponent } from 'quasar';
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';

// variables
const gestion = ref();
const gestiones = ref(null);
const descripcion = ref('');
const metaTotal = ref('');
const numInputs = ref({});
const inputValores = ref([]);


// functions
const obtenerGestiones = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/api/v1/gestiones');
        gestiones.value = data.data.map((gestion) => gestion);
        gestiones.value = gestiones.value.sort((a, b) => b.descripcion - a.descripcion);
        gestion.value = gestiones.value[0];
        localStorage.setItem('gestion', JSON.stringify(gestion.value));
    } catch (error) {
        console.error(error);
    }
};
obtenerGestiones();

const selectGestion = (value) => {
    localStorage.setItem('gestion', JSON.stringify(gestion.value));
}

const calculoGestion = computed(() => {
    if (gestion.value != null) {
        const { tipoPeriodo } = gestion.value;
        if (tipoPeriodo.codigoTipo === 'TRIMESTRAL') {
            numInputs.value = {
                num: 3,
                label: 'Trimestre'
            }
        }
        else if (tipoPeriodo.codigoTipo === 'SEMESTRAL') {
            numInputs.value = {
                num: 6,
                label: 'Semestre'
            }
        }
        else if (tipoPeriodo.codigoTipo === 'BIMESTRAL') {
            numInputs.value = {
                num: 2,
                label: 'Bimestre'
            }
        }
    }
    return numInputs.value;
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
const guardarPrograma = async () => {
    //obteniendo datos
    const programa = {
        reformulacionId: 10,
        gestionId: 2,
        codigo: 10,
        descripcion: descripcion.value,
        metaGlobalPlaneada: parseInt(metaTotal.value, 10)
    };
    // const programaMeta = {
    //     programaId: 1,
    //     codigoPeriodo: "T10",
    //     metaPlaneada: 50,

    // };
    try {
        // const respuestaPrograma = await axios.post('http://localhost:3000/api/v1/programas', programa);
        // console.log(respuestaPrograma);

        console.log("inputValores: ", inputValores.value);

        // async function main() {
        //     const respuestas = await axios.all([
        //         axios.post('http://localhost:3000/api/v1/programas'),
        //         axios.post('http://localhost:3000/api/v1/programas-meta'),
        //     ]);

        //     console.log(responses);
        // }
    } catch (error) {
        console.error(error);
    }

    onDialogOK()
}

function limpiarFormulario() {

}

</script>
<style scope>
</style>