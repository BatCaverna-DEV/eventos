<script setup>

import NavBar from "@/components/NavBar.vue";
import {useRouter, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {apiFetch} from "@/services/http.js";

const router = useRouter()
const route = useRoute()

const id = route.params.id;

const presencas = ref([])

async function listar(){
  const resposta = await apiFetch('/presenca')
  let lista = await resposta.json()
  // 1. Filtre o array de presenças
  // presencas.value = presencas.value.filter(presenca => {
  //   return presenca.atividade.id === id;
  // });
  presencas.value = lista.filter(presenca => presenca.atividade.id == id)
}

onMounted(async () => {
  await listar();
})

</script>

<template>
  <NavBar></NavBar>
  <div class="container">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <h4>Listas de Frequências Assinadas</h4>
        <span>
          <RouterLink class="btn btn-secondary mx-1" to="/admin">Voltar</RouterLink>
        </span>

      </div>
    </nav>

    <h5>Quantidade: {{presencas.length}} pessoas</h5>

    <div class="row my-3 p-1">
      <div class="col-sm-2 fw-bolder">MATRÍCULA</div>
      <div class="col-sm-4 fw-bolder ">NOME</div>
      <div class="col-sm-3 fw-bolder ">TURMA</div>
      <div class="col-sm-3 fw-bolder ">ATIVIDADE</div>
    </div>

    <div class="row mt-1 bg-body-tertiary p-2 selecionado" v-for="presenca in presencas">
      <div class="col-sm-2">{{ presenca.matricula }}</div>
      <div class="col-sm-4 ">{{ presenca.nome }}</div>
      <div class="col-sm-3 ">{{ presenca.turma }}</div>
      <div class="col-sm-3 ">{{ presenca.atividade.descricao }}</div>
    </div>

  </div>
</template>

<style scoped>

</style>