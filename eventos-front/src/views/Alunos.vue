<script setup>

import NavBar from "@/components/NavBar.vue";
import {ref} from "vue";

const carregando = ref(false);
</script>

<template>
  <NavBar></NavBar>

  <div v-if="carregando" class="d-flex justify-content-center">
    <div class="spinner-border text-success my-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="container">

  </div>
</template>

<style scoped>

</style>