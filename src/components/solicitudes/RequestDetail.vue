<template>
  <div class="title text-h6 text-secondary">Detalle de la solicitud</div>
  <q-form class="q-gutter-md" @submit.prevent="saveRequestDetail">
    <div class="row justify-center">
      <div class="col-12">
        <div class="row justify-around">
          <div class="col-xs-12 col-sm-6 col-md-3">
            <q-input
              v-model="requestDetail.goal"
              filled
              label="Objetivo"
              lazy-rules
              class="q-mb-md q-mx-md"
              :rules="[(val) => (val && val.length > 0) || 'Introduzca un objetivo']"
            >
              <template v-slot:append>
                <q-icon name="close" @click="requestDetail.goal = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-input
              v-model="requestDetail.justification"
              filled
              label="Justificación"
              lazy-rules
              class="q-mb-md q-mx-md"
              :rules="[(val) => (val && val.length > 0) || 'Introduzca una justificación']"
            >
              <template v-slot:append>
                <q-icon name="close" @click="requestDetail.justification = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3">
            <q-input
              filled
              v-model="requestDetail.requiredForDate"
              label="Requerido para"
              mask="date"
              :rules="['date']"
              class="q-mb-md q-mx-md"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="requestDetail.requiredForDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 q-mb-md separator">
            <q-separator inset />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              filled
              v-model="requestDetail.operation"
              :options="optionsOperation"
              label="Operación"
              stack-label
              outlined
              class="q-mb-md q-mx-md"
              @update:model-value="handleOperation"
              :rules="[(val) => (val && Object.keys(val).length > 0) || 'Seleccione la operación']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-grey"> No hay opciones para listar </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-select
              filled
              v-model="requestDetail.budgetItem"
              :options="optionsUnit"
              label="Partidas"
              stack-label
              outlined
              class="q-mb-md q-mx-md"
              :hint="!optionsUnit.length ? 'Disable' : ''"
              :disable="!optionsUnit.length"
              :rules="[(val) => (val && Object.keys(val).length > 0) || 'Seleccione una partidas']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-grey"> No hay opciones para listar </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <q-input
              v-model="requestDetail.amount"
              filled
              label="Cantidad"
              lazy-rules
              class="q-mb-md q-mx-md"
              :rules="[(val) => val > 0 || 'Introduzca una cantidad']"
              type="number"
            >
              <template v-slot:append>
                <q-icon name="close" @click="requestDetail.amount = 0" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <q-select
              filled
              v-model="requestDetail.unitMeasurement"
              :options="optionsMeasurament"
              label="Unidad de Medida"
              stack-label
              outlined
              class="q-mb-md q-mx-md"
              :rules="[(val) => (val && Object.keys(val).length > 0) || 'Seleccione una unidad de medida']"
            />
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <q-input
              v-model="requestDetail.unitPrice"
              filled
              label="Precio Unitario"
              lazy-rules
              class="q-mb-md q-mx-md"
              :rules="[(val) => val > 0 || 'Introduzca un precio unitario']"
              type="number"
            >
              <template v-slot:append>
                <q-icon name="close" @click="requestDetail.unitPrice = 0" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-input
              v-model="requestDetail.description"
              type="textarea"
              filled
              label="Descripción"
              lazy-rules
              class="q-mb-md q-mx-md"
            >
              <template v-slot:append>
                <q-icon name="close" @click="requestDetail.description = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </div>
          <div class="footer">
            <q-btn label="Guardar" type="submit" color="secondary" />
          </div>
        </div>
      </div>
    </div>
  </q-form>
  <div class="q-pa-md" v-if="showStepper">
    <q-stepper v-model="stepRequestDetail" ref="stepper" color="primary" animated>
      <q-step :name="1" title="Especificación Técnica" icon="settings" :done="stepRequestDetail > 1">
        ESpecificacion Tecnica
      </q-step>

      <q-step :name="2" title="Cotizaciones" caption="Optional" icon="create_new_folder" :done="stepRequestDetail > 2">
        Cotizaciones
      </q-step>

      <q-step :name="3" title="Proveedor" icon="assignment"> Proveedor </q-step>

      <q-step :name="4" title="Doc. Proponente" icon="add_comment"> Documento Proponente </q-step>
      <q-step :name="5" title="Conformidad" icon="add_comment"> Conformidad </q-step>
      <q-step :name="6" title="Pago" icon="add_comment"> PAgo </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="$refs.stepper.next()"
            color="primary"
            :label="stepRequestDetail === 6 ? 'Finalizar' : 'Continuar'"
          />
          <q-btn
            v-if="stepRequestDetail > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Atrás"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref } from 'vue';
import UnitOperation from '../../interfaces/UnitOperation';
import { BudgetItems } from '../../interfaces/BudgetItems';
import MeasuramentUnit from '../../interfaces/MeasuramentUnit';
import { formatDate } from '../../utils/DateUtil';
import { RequestParameter } from '../../interfaces/Request';

const props = defineProps({
  unitOperations: {
    type: Array<UnitOperation>,
    default: () => [],
  },
  budgetItems: {
    type: Array<BudgetItems>,
    default: () => [],
  },
  measuramentUnits: {
    type: Array<MeasuramentUnit>,
    default: () => [],
  },
  fetchBudgetItems: {
    type: Function,
    default: () => ({}),
  },
  unitId: {
    type: Number,
    default: 0,
  },
  saveRequest: {
    type: Function,
    default: () => ({}),
  },
});

const stepRequestDetail = ref(1);
const showStepper = ref(false);

const requestDetail = reactive({
  goal: '',
  justification: '',
  requiredForDate: formatDate(new Date()),
  operation: { label: '', value: 0 },
  budgetItem: { label: '', value: 0 },
  description: '',
  amount: 0,
  unitMeasurement: { label: '', value: 0 },
  unitPrice: 0,
});

//hooks
const optionsOperation = computed(() => {
  return props.unitOperations.map((unit) => {
    return {
      label: `${unit.codigo} ${unit.descripcion}`,
      value: unit.idOperacion,
    };
  });
});

const optionsUnit = computed(() => {
  return (
    props.budgetItems.map((item) => {
      const { partida } = item;
      return {
        label: `${partida.codigo} ${partida.descripcion}`,
        value: item.idPresupuesto,
      };
    }) || []
  );
});

const optionsMeasurament = computed(() => {
  return props.measuramentUnits.map((item) => {
    return {
      label: item.descripcion,
      value: item.idUnidadMedida,
    };
  });
});

//methods
const handleOperation = () => {
  props.fetchBudgetItems(requestDetail.operation.value);
};

const saveRequestDetail = async () => {
  //TODO: compleate with true values and with the correct validation
  const requestParameter: RequestParameter = {
    gestionId: 2,
    procesoId: 1,
    tipoSolicitudId: 1, //props.unitId,
    unidadId: requestDetail.unitMeasurement.value,
    usuarioId: 4,
    objetoContratacion: requestDetail.goal,
    justificacion: requestDetail.justification,
    requeridoPara: '2023-11-16T04:00:00.000Z', //requestDetail.requiredForDate,
  };
  const result = await props.saveRequest(requestParameter);
  showStepper.value = result;
};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 0 1rem;
  position: relative;
  text-align: end;
}
.separator {
  position: relative;
  top: -10px;
}
</style>
