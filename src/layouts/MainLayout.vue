<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <span v-if="user">{{ user.first_name }} {{ user.name }}</span>
        <q-btn v-if="user" label="Déconnexion" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(JSON.parse(sessionStorage.getItem('user')))
const router = useRouter()

function logout() {
  sessionStorage.removeItem('user')
  user.value = null
  router.push({ name: 'login' })
}

// Expose logout to the template
defineExpose({
  logout
})
</script>
