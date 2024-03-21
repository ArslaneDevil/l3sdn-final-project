
<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h5 q-mb-md">Liste des managés</div>
      <q-list bordered separator>
        <q-item v-for="user in managedUsers" :key="user.id">
          <q-item-section> {{ user.first_name }} {{ user.name }} </q-item-section>
          <q-item-section side top>
            <q-item-label caption>Rôle: {{ roleLabels[user.role] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import usersApi from '../api/users' 

const CurrentUser = JSON.parse(sessionStorage.getItem('user'))
const users = usersApi.getUsers()

const roleLabels = {
  0: 'Worker',
  1: 'Manager',
  2: 'RH',
  3: 'Admin'
}

const managedUsers = ref([])

onMounted(() => {
  if (CurrentUser.role === 1) {
    // Manager
    managedUsers.value = users.filter((user) => user.supervisor === CurrentUser.id)
  } else if (CurrentUser.role === 2) {
    // RH
    managedUsers.value = users.filter((user) => user.role !== 2)
  }

})

// eslint-disable-next-line no-console
console.log(managedUsers.value)
</script>
