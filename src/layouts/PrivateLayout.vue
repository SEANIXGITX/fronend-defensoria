<template>
  <q-layout view="hHh Lpr lff" style="height: 100vh" container class="shadow-2 rounded-borders">
    <q-header elevated>
      <Toolbar :toogleDraw="toogleDraw" :drawer="drawer" />
    </q-header>
    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="500" bordered>
      <q-scroll-area class="fit bg-secondary text-white text-weight-bold">
        <q-list>
          <template v-for="menuItem in menuList" :key="menuItem.label">
            <router-link :to="menuItem.url" class="menu">
              <q-item clickable :active="menuItem.nombre === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icono" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.nombre }}
                </q-item-section>
              </q-item>
            </router-link>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import useUserStore from '../store/User';
import Toolbar from '../components/common/Toolbar.vue';

const userStore = useUserStore();

//variables
const drawer = ref(false);

//hooks

const menuList = computed(() => {
  return userStore.menus;
});

const toogleDraw = () => {
  drawer.value = !drawer.value;
};
</script>
<style lang="scss" scoped>
.menu {
  text-decoration: none;
  color: #ffffff;
}
</style>
