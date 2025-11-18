<script setup>

</script>

<template>
  <nav class="navbar bg-success">
    <div class="container-fluid">
      <a class="navbar-brand text-white">SNCT - Controle de Frequência</a>
      <div class="dropdown">
        <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Usuário
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <RouterLink to="/logout" class="dropdown-item">Sair</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>