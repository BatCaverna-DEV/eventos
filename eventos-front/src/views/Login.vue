<script setup>

import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {apiFetch} from "@/services/http.js";
import {setToken} from '@/services/auth.js'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const loading = ref(false)
const erro = ref('')

async function login() {
  erro.value = ''
  loading.value = true
  try{

    const resposta = await apiFetch('/usuario/login', {
      method: 'POST',
      body: {username: username.value, password: password.value},
    })

    const token = await resposta.json()
    if(resposta.ok){
      setToken(token.value)
      const redirectTo = (route.query.redirect ?? '/admin');
      router.replace(redirectTo);
    }else{
      erro.value = token.message
    }

  }catch(err){
    erro.value = err.message || 'Falha no login!'
  }finally{
    loading.value = false
  }
}

</script>

<template>

  <nav class="navbar bg-success ">
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#">SNCT - Controle de Frequência</a>
    </div>
  </nav>

  <div class="card col-md-3 mx-auto m-1">
    <div class="card-body">
      <h4 class="text-center my-3">Acesso ao Sistema</h4>
      <form @submit.prevent="login">
        <div class="row">
          <div class="col-sm">
            <label for="username">USUÁRIO</label>
            <input v-model="username" type="text" id="username" class="form-control">
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-sm">
            <label for="password">PASSWORD</label>
            <input v-model="password" type="password" id="password" class="form-control">
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-sm">
            <button class="btn btn-success w-100">Entrar</button>
          </div>
        </div>

      </form>
      <p class="mt-3 text-center">
        <a class="" href="/">Voltar</a>
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>