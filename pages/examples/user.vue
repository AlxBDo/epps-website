<script setup lang="ts">
import { log } from '../../utils/log'
import Page from '~/components/common/Page.vue'
import { useConnectedUserStore } from '../../stores/demo/connectedUser'
import { user as definition } from '~/utils/pages/resumes'

import type { UserStore, UserState } from '../../stores/demo/user'
import type { EppsStore } from 'epps'


const connectedUser = useConnectedUserStore() as EppsStore<UserStore, UserState>

connectedUser.setData && connectedUser.setData({
    id: 1,
    email: 'connecteduser@mail.com',
    firstname: 'Mathiew',
    lastname: 'Zerh',
    password: 'C4Nn€cT2D@!12'
})

log('connectedUser', connectedUser.user)

setTimeout(() => {
    connectedUser.$reset()
    log('reset user', connectedUser.user)
}, 3000)
</script>

<template>
    <Page :definition>
        <p v-if="connectedUser.firstname">Hello {{ connectedUser.firstname }}</p>
    </Page>
</template>