<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 100px" class="row items-center">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <h1>Pokedex</h1>
          <img src="../assets/pokeball.svg" alt="pokeball" width="60" />
        </q-toolbar-title>
        <div>by Geometricat</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    return {};
  },
});
</script>
<style lang="sass">

.q-toolbar
  padding: 0 40px

.q-toolbar__title
  h1
    font-size: 35px
    padding: 0
    line-height: 1.5rem
    margin-right: 20px
</style>
