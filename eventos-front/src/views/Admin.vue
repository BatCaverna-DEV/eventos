<script setup>

import NavBar from "@/components/NavBar.vue";
import {ref, onMounted} from "vue";
import {apiFetch} from "@/services/http.js";
import {getUser} from "@/services/user.js";

const atividades = ref([])
let processando = ref(false)
let carregando = ref(true)

const playload = getUser()
const user = ref({nome: playload.nome})

async function carregarAtividades() {
  const resposta = await apiFetch("/atividade")
  atividades.value = await resposta.json()
  carregando.value = false
}

onMounted(() => {
  carregarAtividades()
})

async function abrir(id){
  processando.value = true
  const resposta = await apiFetch(`/atividade/abrir/${id}`)
  if(resposta.ok){
    let msg = await resposta.json()
    await carregarAtividades()
    processando.value = false
    alert(msg.message)
  }else{
    let erro = await resposta.json()
    processando.value = false
    alert(erro)
  }
}

async function fechar(id){
  processando.value = true
  const resposta = await apiFetch(`/atividade/fechar/${id}`)
  if(resposta.ok){
    let msg = await resposta.json()
    await carregarAtividades()
    processando.value = false
    alert(msg.message)
  }else{
    let erro = await resposta.json()
    processando.value = false
    alert(erro)
  }
}

async function encerrar(id){
  processando.value = true
  const resposta = await apiFetch(`/atividade/encerrar/${id}`)
  if(resposta.ok){
    let msg = await resposta.json()
    await carregarAtividades()
    processando.value = false
    alert(msg.message)
  }else{
    let erro = await resposta.json()
    processando.value = false
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

  <div v-if="carregando" class="d-flex justify-content-center">
    <div class="spinner-border text-success my-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-if="!carregando" class="container">
    <h4 class="my-3 bg-body-secondary p-3">Bem Vindo(a) {{user.nome}}</h4>
    <div class="row bg-body-secondary my-2 py-1" v-for="atividade in atividades">
      <div class="col-4">
        <img :src="atividade.imagem" class="w-100">
      </div>
      <div class="col-8">
        <p class="text-success"><strong>{{atividade.descricao}}</strong></p>
        <p><strong>INÍCIO</strong>: {{formatarData(atividade.inicio)}} <br> <strong>FINAL</strong>: {{formatarData(atividade.final)}}</p>
        <div v-if="!processando">
          <button v-if="atividade.status === 0" @click="abrir(atividade.id)" class="btn btn-primary">Abrir</button>
          <button v-if="atividade.status === 1" @click="fechar(atividade.id)" class="btn btn-warning">Fechar</button>
          <button v-if="atividade.status === 1" @click="encerrar(atividade.id)" class="btn btn-danger mx-2">Encerrar</button>
          <button v-if="atividade.status === 2" class="btn btn-secondary" disabled>Encerrado...</button>
        </div>
        <h5 class="text-danger" v-if="processando">Processando...</h5>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>