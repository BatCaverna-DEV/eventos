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

        <div>
          <img :src="`${atividade.imagem}`" class="card-img-bottom p-1" alt="">

          <div v-if="atividade.status === 1" class="card-body text-center">
            <a :href="`${url}registrar/${atividade.id}`" class="btn btn-primary">Registrar</a>
          </div>

          <div v-if="atividade.status === 2" class="card-body bg-body-secondary">
            <h5 class="text-center text-danger">Encerrado</h5>
          </div>

          <div v-if="atividade.status === 0" class="card-body">
            <h5 class="text-center text-success">Em breve...</h5>
          </div>

        </div>

      </div>

  </div>
</template>

<style scoped>

</style>