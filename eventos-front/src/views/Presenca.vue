<script setup>

import NavExt from "@/components/NavExt.vue";
import {ref, onMounted} from "vue";

const atividades = ref({})

onMounted(async () => {
  const resposta = await fetch('http://localhost:3100/presenca/atividades')
  atividades.value = await resposta.json()
})

</script>

<template>
  <NavExt></NavExt>
  <div class="container-sm d-flex flex-wrap gap-3 justify-content-between">
      <div class="card" style="width: 13rem;" v-for="atividade in atividades">
        <img :src="`/src/assets/snct/${atividade.imagem}`" class="card-img-bottom" alt="">
        <div class="card-body">
          <a :href="`/registrar/${atividade.id}`" class="btn btn-primary">Registrar</a>
        </div>
      </div>
  </div>
</template>

<style scoped>

</style>