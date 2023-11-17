<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" @click="toogle" />
    <q-toolbar-title> SAGDP </q-toolbar-title>
    <q-btn flat round dense icon="notifications_active">
      <q-badge floating color="red">1</q-badge>
    </q-btn>
    <q-btn flat round dense icon="notifications_none">
      <q-badge floating color="red">2</q-badge>
    </q-btn>
    <q-btn flat round dense icon="account_circle"> </q-btn>
  </q-toolbar>
</template>
<script setup lang="ts">
const props = defineProps({
  toogleDraw: {
    type: Function,
    default: () => {},
  },
  drawer: {
    type: Boolean,
  },
});

const toogle = () => {
  props.toogleDraw(!props.drawer)
};
</script>
