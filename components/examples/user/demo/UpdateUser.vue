<script setup lang="ts">
import { useConnectedUserStore } from '~/stores/demo/connectedUser'

import MethodDemoForm from '~/components/common/form/MethodDemoForm.vue'

import type { EppsStore } from 'epps'
import type { UserStore, UserState } from '~/stores/demo/user'
import type { AnyObject } from 'epps'


const connectedUser = useConnectedUserStore() as EppsStore<UserStore, UserState>
const property = ref<string>()
const value = ref<string>()

function getResult() {
    console.log('UpdateUser.vue getResult', property.value, value.value)
    if (property.value && value.value) {
        (connectedUser.$state as AnyObject)[property.value] = value.value
        property.value = undefined
        value.value = undefined
    }
    return false
}
</script>

<template>
    <MethodDemoForm :get-result title="Update user" submit-btn="Update">
        <template #inputs>
            <div>
                <USelect :items="['email', 'firstname', 'lastname', 'password']" placeholder="Select property"
                    v-model="property" />
                <UInput placeholder="New value" v-model="value" />
            </div>
        </template>
    </MethodDemoForm>
</template>