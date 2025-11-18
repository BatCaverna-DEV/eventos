<script setup>

import NavBar from "@/components/NavBar.vue";
import {ref, onMounted} from "vue";
import {apiFetch} from "@/services/http.js";

const atividades = ref([])

async function carregarAtividades() {
  const resposta = await apiFetch("/atividade")
  atividades.value = await resposta.json()
}

onMounted(() => {
  carregarAtividades()
})

async function abrir(id){
  const resposta = await apiFetch(`/atividade/abrir/${id}`)
  if(resposta.ok){
    let msg = await resposta.json()
    alert(msg.message)
    carregarAtividades()
  }else{
    let erro = await resposta.json()
    alert(erro)
  }
}

async function fechar(id){
  const resposta = await apiFetch(`/atividade/fechar/${id}`)
  if(resposta.ok){
    let msg = await resposta.json()
    alert(msg.message)
    carregarAtividades()
  }else{
    let erro = await resposta.json()
    alert(erro)
  }
}

async function encerrar(id){
  const resposta = await apiFetch(`/atividade/encerrar/${id}`)
  if(resposta.ok){
    let msg = await resposta.json()
    alert(msg.message)
    carregarAtividades()
  }else{
    let erro = await resposta.json()
    alert(erro)
  }
}

function formatarData(dataISO) {
  const data = new Date(dataISO)

  return data.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

</script>

<template>
  <NavBar></NavBar>

  <div class="container">
    <div class="row bg-body-secondary my-2 py-1" v-for="atividade in atividades">
      <div class="col-4">
        <img :src="atividade.imagem" class="w-100">
      </div>
      <div class="col-8">
        <p class="text-success"><strong>{{atividade.descricao}}</strong></p>
        <p><strong>INÍCIO</strong>: {{formatarData(atividade.inicio)}} <br> <strong>FINAL</strong>: {{formatarData(atividade.final)}}</p>
        <button v-if="atividade.status === 0" @click="abrir(atividade.id)" class="btn btn-primary">Abrir</button>
        <button v-if="atividade.status === 1" @click="fechar(atividade.id)" class="btn btn-warning">Fechar</button>
        <button v-if="atividade.status === 1" @click="encerrar(atividade.id)" class="btn btn-danger mx-2">Encerrar</button>
        <button v-if="atividade.status === 2" class="btn btn-secondary" disabled>Encerrado...</button>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>