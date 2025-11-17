<script setup>

import NavExt from "@/components/NavExt.vue";
import {ref, onMounted} from "vue";

const atividades = ref({})
const API = import.meta.env.VITE_API_URL
const url = import.meta.env.BASE_URL
let carregando = ref(true)

onMounted(async () => {
  const resposta = await fetch(`${API}/presenca/atividades`)
  atividades.value = await resposta.json()
  carregando.value = false
})

</script>

<template>
  <NavExt></NavExt>

  <div v-if="carregando" class="d-flex justify-content-center">
    <div class="spinner-border text-success my-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>


  <div v-if="!carregando" class="container-sm d-flex flex-wrap gap-3 justify-content-between">
      <div class="card" style="width: 13rem;" v-for="atividade in atividades">
        <img :src="`${atividade.imagem}`" class="card-img-bottom" alt="">
        <div class="card-body">
          <a :href="`${url}registrar/${atividade.id}`" class="btn btn-primary">Registrar</a>
        </div>
      </div>
  </div>
</template>

<style scoped>

</style>