<script setup>

import {useRoute, useRouter} from "vue-router";
  import {ref, onMounted} from "vue";
  import NavExt from "@/components/NavExt.vue";

  const route = useRoute()
  const router = useRouter()
  const id = route.params.id;

  const permitido = ref(false)
  const API = import.meta.env.VITE_API_URL

  const atividade = ref({})
  const presenca = ref({nome: '', matricula:'', turma:'', atividade_id:0})

  onMounted(async () => {
    const resposta = await fetch(`${API}/presenca/atividade/`+id)
    atividade.value = await resposta.json()
  })

  async function verificarIp() {
    try{
      const resposta = await fetch(`${API}/verificiar`)
      let status = await resposta.json()
      return status.permitido
    }catch(err){
      console.log(err)
      return false
    }
  }

  async function salvar() {

    const ok = await verificarIp()
    if(!ok){
      alert('Você precisa está na Rede Wi-Fi do IFMA!')
      router.push('/')
      return
    }

    presenca.value.atividade_id = atividade.value.id
    const resposta = await fetch('http://localhost:3100/presenca/registrar', {
      method: 'post',
      body: JSON.stringify(presenca.value),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    if(resposta.ok){
      if(resposta.status === 500){
        const msg = await resposta.json()
        alert(msg.message)
      }else{
        alert('Presença registrada com sucesso!')
        router.push('/')
      }
    }else{
      const erro = await resposta.json()
      alert('ERRO: '+erro.message)
    }

  }
</script>

<template>
  <NavExt></NavExt>
  <div class="container-sm p-2 shadow">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <span class="h5">Registrar Presença</span>
        <a class="btn btn-secondary" href="/">Voltar</a>
      </div>
    </nav>
    <div class="row">
      <div class="col-sm">
        <label for="descricao">ATIVIDADE</label>
        <div class="bg-body-secondary">
          <p class="p-2">{{atividade.descricao}}</p>
        </div>
      </div>
    </div>
    <form @submit.prevent="salvar">
      <div class="row mt-3">
        <div class="col-sm-3">
          <label for="matricula">MATRÍCULA</label>
          <input v-model="presenca.matricula" type="text" class="form-control" id="matricula" required>
        </div>
        <div class="col-sm-9 ">
          <label for="nome">NOME COMPLETO</label>
          <input type="text" v-model="presenca.nome" class="form-control" id="nome" required>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-sm-6 ">
          <label for="nome">TURMA</label>
          <select class="form-select" id="turma" required  v-model="presenca.turma">
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
          </select>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-sm">
          <button class="btn btn-primary" type="submit">Registrar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>