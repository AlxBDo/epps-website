<script setup lang="ts">
import { useConnectedUserStore } from '~/stores/demo/connectedUser'

import DisplayResult from '~/components/examples/common/DisplayResult.vue'

import type { EppsStore } from 'epps'
import type { UserStore, UserState } from '~/stores/demo/user'


const connectedUser = useConnectedUserStore() as EppsStore<UserStore, UserState>

connectedUser.remember().then(() => {
    if (!connectedUser.id) {
        connectedUser.setData({
            id: 1,
            email: 'connecteduser@mail.com',
            firstname: 'Mathiew',
            lastname: 'Zerh',
            password: 'C4Nn€cT2D@!12'
        })
    }
})

const user = computed(() => ({
    id: connectedUser.id,
    email: connectedUser.email,
    firstname: connectedUser.firstname,
    lastname: connectedUser.lastname,
    password: connectedUser.password
}))
</script>

<template>
    <div>
        <h3>User</h3>

        <DisplayResult :result="user" />

        <UButton class="mt-4 cursor-pointer" color="neutral" icon="iconamoon:close-bold"
            @click="() => connectedUser.$reset()" variant="outline">
            Reset Store
        </UButton>
    </div>
</template>