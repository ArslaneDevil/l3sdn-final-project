<template>
  <h1>indexPage</h1>
</template>

<script setup>
import { ref} from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import usersApi from '../api/users' // Ensure the path is correct

const username = ref('')
const password = ref('')
const $q = useQuasar()
const router = useRouter()

const onSubmit = async () => {
  const users = usersApi.getUsers() // Assuming getUsers is correctly imported and returns the users list
  const user = users.find(
    (user) => user.username === username.value && user.password === password.value
  )

  if (user) {
    // Success login logic here
    sessionStorage.setItem('user', JSON.stringify(user))
    
    // eslint-disable-next-line no-console
    console.log(user.username)
    
    $q.notify({
      color: 'green-5',
      textColor: 'white',
      icon: 'warning',
      message: 'valid credentials'
    })
    await router.push({ name: 'dashboard'})

  } else {
    // Failure login logic here
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Invalid credentials'
    })
  }
}
</script>
