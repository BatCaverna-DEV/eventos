<script setup>

  import {getUser} from "@/services/user.js";
  const user = getUser();

</script>

<template>
  <nav class="navbar bg-success">
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#">SNCT - Presenca</a>
      <span v-if="!user">
        <RouterLink to="/login" class="btn btn-outline-light">Login</RouterLink>
      </span>
      <span v-if="user">
        <RouterLink to="/admin" class="btn btn-outline-light">Área Logada</RouterLink>
      </span>
    </div>
  </nav>
</template>

<style scoped>

</style>