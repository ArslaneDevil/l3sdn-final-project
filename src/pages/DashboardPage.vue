<template>
  <q-page padding>
    <div>Tableau de bord de l'utilisateur</div>
    <div>Nom d'utilisateur : {{ CurrentUser.username }}</div>
    <div v-if="CurrentUser.role !== Role.RH ">
      mon manager : {{ manager.first_name + ' ' + manager.name }}
    </div>
    <div v-if="CurrentUser.role === Role.RH || CurrentUser.role === Role.manager">Nombre de managés : {{ managedCount }}</div>
    <!-- Ajoutez ici le reste de votre tableau de bord -->
    <q-btn label="Voir les managés" color="primary" @click="goToManagedList" />
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import usersApi from '../api/users'

const CurrentUser = JSON.parse(sessionStorage.getItem('user'))
const users = usersApi.getUsers()
const router = useRouter()

const Role = {
  worker: 0,
  manager: 1,
  RH: 2,
  admin: 3
}

const manager = ref({})
const managedCount = ref(0)
const goToManagedList = () => {
  router.push({ name: 'managedList' })
}


onMounted(() => {
  manager.value = users.find(user => CurrentUser.supervisor === user.id)

  if (CurrentUser.role === Role.manager) {
    // Pour un manager, compter tous les utilisateurs dont il est le superviseur
    managedCount.value = users.filter(user => user.supervisor === CurrentUser.id).length
  } else if (CurrentUser.role === Role.RH) {
    // Pour RH, compter tous les travailleurs sauf les RH
    managedCount.value = users.filter(user => user.role !== Role.RH).length
  }})
</script>
