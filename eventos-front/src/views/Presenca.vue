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

function formatarData(dataISO) {
  const data = new Date(dataISO)

  return data.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

</script>

<template>
  <NavExt></NavExt>

  <div v-if="carregando" class="d-flex justify-content-center">
    <div class="spinner-border text-success my-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-if="!carregando" class="container">
    <div class="row bg-body-secondary my-2 py-1" v-for="atividade in atividades">
      <div class="col-4">
        <img :src="atividade.imagem" class="w-100">
      </div>
      <div class="col-8">
        <p class=""><strong>{{atividade.descricao}}</strong></p>
        <p><strong>INÍCIO</strong>: {{formatarData(atividade.inicio)}} <br> <strong>FINAL</strong>: {{formatarData(atividade.final)}}</p>
        <div v-if="atividade.status === 1" class="card-body">
          <a :href="`${url}registrar/${atividade.id}`" class="btn btn-primary">Registrar</a>
        </div>

        <div v-if="atividade.status === 2" class="card-body bg-body-secondary">
          <h5 class="text-danger">Encerrado</h5>
        </div>

        <div v-if="atividade.status === 0" class="card-body">
          <h5 class="text-success">Em breve...</h5>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>