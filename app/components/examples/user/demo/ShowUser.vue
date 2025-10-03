<script setup lang="ts">
import { useConnectedUserStore } from '~/stores/demo/connectedUser'
import DisplayResult from '~/components/examples/common/DisplayResult.vue'


const connectedUser = useConnectedUserStore()
const isloading = ref<boolean>(true)

connectedUser.remember().then(() => {
    if (!connectedUser.id) {
        connectedUser.setData({
            id: 1,
            email: 'connecteduser@mail.com',
            username: 'mathiewzerhname',
            firstname: 'Mathiew',
            lastname: 'Zerh',
            password: 'C4Nn€cT2D@!12'
        })
    }
    isloading.value = false
})

const contact = computed(() => ({
    id: connectedUser.id,
    firstname: connectedUser.firstname,
    email: connectedUser.email,
    lastname: connectedUser.lastname,
    password: connectedUser.password,
    username: connectedUser.username
}))
</script>

<template>
    <div>
        <h3>User</h3>

        <DisplayResult v-if="!isloading" :result="contact" />

        <UButton class="mt-4 cursor-pointer" color="neutral" icon="iconamoon:close-bold"
            @click="() => connectedUser.$reset()" variant="outline">
            Reset Store
        </UButton>
    </div>
</template>