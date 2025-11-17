<script setup>

import {useRoute, useRouter} from "vue-router";
  import {ref, onMounted} from "vue";
  import NavExt from "@/components/NavExt.vue";

  const route = useRoute()
  const router = useRouter()
  const id = route.params.id;

  const permitido = ref(false)
  const API = import.meta.env.VITE_API_URL
  let carregando = ref(true)
  let erro = ref(false)
  let mensagem = ref('')

  const atividade = ref({})
  const presenca = ref({nome: '', matricula:'', turma:'', atividade_id:0})

  onMounted(async () => {
    const resposta = await fetch(`${API}/presenca/atividade/`+id)
    atividade.value = await resposta.json()
    carregando.value = false
  })

  async function verificarIp() {
    try{
      const resposta = await fetch(`${API}/verificar`)
      let status = await resposta.json()
      return status.permitido
    }catch(err){
      console.log(err)
      return false
    }
  }

  async function salvar() {
    carregando.value = true
    erro.value = false
    const ok = await verificarIp()
    if(!ok){
      alert('Você precisa está na Rede Wi-Fi do IFMA!')
      router.push('/')
      return
    }

    presenca.value.atividade_id = atividade.value.id
    const resposta = await fetch(`${API}/presenca/registrar`, {
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
        carregando.value = false
        erro.value = true
        mensagem.value = msg.message
      }else{
        alert('Presença registrada com sucesso!')
        router.push('/')
      }
    }else{
      const error = await resposta.json()
      carregando.value = false
      erro.value = true
      mensagem.value = error.message
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
  <NavExt></NavExt>
  <div class="container-sm p-2 shadow">
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <span class="h5">Registrar Presença</span>
        <RouterLink to="/" class="btn btn-secondary">Voltar</RouterLink>
      </div>
    </nav>

    <div v-if="carregando" class="d-flex justify-content-center">
      <div class="spinner-border text-success my-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="erro" class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>ATENÇÃO: </strong> {{ mensagem }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

     <div v-if="!carregando" class="row">
      <div class="col-sm">
        <label for="descricao">ATIVIDADE</label>
        <div class="bg-body-secondary">
          <p class="p-2">{{atividade.descricao}}</p>
        </div>
      </div>
    </div>

    <div v-if="!carregando" class="row">
      <div class="col-sm-3">
        <label for="descricao">INÍCIO</label>
        <div class="bg-body-secondary">
          <input :value="formatarData(atividade.inicio)" type="text" class="form-control" disabled>
        </div>
      </div>
      <div class="col-sm-3">
        <label for="descricao">FIM</label>
        <div class="bg-body-secondary">
          <input :value="formatarData(atividade.final)" type="text" class="form-control" disabled>
        </div>
      </div>
    </div>

    <form v-if="!carregando" class="mt-3" @submit.prevent="salvar">
      <h5 class="bg-body-secondary p-2">Dados do Aluno</h5>
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
            <option value="ADS - Módulo IV">ADS - Módulo IV</option>
            <option value="ADS - Módulo V">ADS - Módulo V</option>
            <option value="ADM - Módulo VI">ADM - Módulo VI</option>
            <option value="Proeja">Proeja</option>
            <option value="Automação - Módulo III">Automação - Módulo III</option>
            <option value="Automação - Módulo IV">Automação - Módulo IV</option>
            <option value="Automação - Módulo IV">Partiu IF</option>
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