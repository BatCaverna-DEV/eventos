<script setup>

import NavBar from "@/components/NavBar.vue";
import {useRouter, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {apiFetch} from "@/services/http.js";

const router = useRouter()
const route = useRoute()

const id = route.params.id;

const presencas = ref([])
const atividade = ref({})
const turma = ref('')
const carregando = ref(true)

async function listar(){
  const resposta = await apiFetch('/presenca')
  const resposta2 = await apiFetch('/atividade/get/'+id)
  let lista = await resposta.json()
  atividade.value = await resposta2.json()
  // 1. Filtre o array de presenças
  // presencas.value = presencas.value.filter(presenca => {
  //   return presenca.atividade.id === id;
  // });
  presencas.value = lista.filter(presenca => presenca.atividade.id == id)
  carregando.value = false
}

function filtrar(){
  if(turma.value.length>0){
    return presencas.value.filter(presenca => presenca.turma === turma.value)
  }else{
    return presencas.value
  }
}

onMounted(async () => {
  await listar();
})

</script>

<template>
  <NavBar></NavBar>

  <div v-if="carregando" class="d-flex justify-content-center">
    <div class="spinner-border text-success my-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-if="!carregando" class="container">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <h4>Listas de Frequências Assinadas</h4>
        <span>
          <RouterLink class="btn btn-secondary mx-1" to="/admin">Voltar</RouterLink>
        </span>

      </div>
    </nav>

    <h5>ATIVIDADE: {{atividade.descricao}}</h5>
    <h5>Quantidade: {{presencas.length}} pessoas</h5>

    <fieldset class="row my-3 border border-1 p-2 bg-body-tertiary">
      <legend>Filtro</legend>
      <div class="col-sm-4" @change="filtrar">
        <select class="form-select" id="turmas" v-model="turma">
          <option value="1TDS - Matutino">1TDS - Matutino</option>
          <option value="1ADM - Matutino">1ADM - Matutino</option>
          <option value="2AUT - Matutino">2AUT - Matutino</option>
          <option value="2TI - Matutino">2TI - Matutino</option>
          <option value="3TI - Matutino">3TI - Matutino</option>
          <option value="3ADM - Matutino">3ADM - Matutino</option>
          <option value="1AUT - Vespertino">1AUT - Vespertino</option>
          <option value="2ADM - Vespertino">2ADM - Vespertino</option>
          <option value="3TI A - Vespertino">3TI A - Vespertino</option>
          <option value="3TI B - Vespertino">3TI B - Vespertino</option>
          <option value="ADS - Módulo IV">ADS - Módulo IV</option>
          <option value="ADS - Módulo V">ADS - Módulo V</option>
          <option value="ADM - Módulo VI">ADM - Módulo VI</option>
          <option value="Proeja">Proeja</option>
          <option value="Automação - Módulo III">Automação - Módulo III</option>
          <option value="Automação - Módulo IV">Automação - Módulo IV</option>
          <option value="Automação - Módulo IV">Partiu IF</option>
        </select>
      </div>
<!--      <div class="col-auto">-->
<!--        <button @click="filtrar" class="btn btn-secondary">Filtrar</button>-->
<!--      </div>-->

    </fieldset>

    <div class="row my-3 p-1">
      <div class="col-sm-2 fw-bolder">MATRÍCULA</div>
      <div class="col-sm-4 fw-bolder ">NOME</div>
      <div class="col-sm-3 fw-bolder ">TURMA</div>
      <div class="col-sm-3 fw-bolder ">ATIVIDADE</div>
    </div>

    <div class="row mt-1 bg-body-tertiary p-2 selecionado" v-for="presenca in filtrar()">
      <div class="col-sm-2">{{ presenca.matricula }}</div>
      <div class="col-sm-4 ">{{ presenca.nome }}</div>
      <div class="col-sm-3 ">{{ presenca.turma }}</div>
      <div class="col-sm-3 ">{{ presenca.atividade.descricao }}</div>
    </div>

  </div>
</template>

<style scoped>

</style>