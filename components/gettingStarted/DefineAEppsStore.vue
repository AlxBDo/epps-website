<script setup lang="ts">
import { defineAEppsStore } from '~/utils/components/resumes'
import { defineEppsStore, extendedState } from '~/utils/pages/resumes'

import ExplanationContainer from '../common/ExplanationContainer.vue'
import Links from '../common/Links.vue'
import Store from '../examples/common/Store.vue'
import type { TypeRequired } from '~/types/components'


const { id, title } = defineAEppsStore
const typeScriptStoreDefinition = `({
        ...extendedState(
            [usePersonStore('userPersonStore')],
            { actionsToExtends: ['setData'] }
        ),
        password: ref<string>(),
        setData: (userData: User): void => {
            if(userData.password) {
                password.value = userData.password
            }
        }
})`
const javascriptScriptStoreDefinition = `({
        ...extendedState(
            [usePersonStore('userPersonStore')],
            { actionsToExtends: ['setData'] }
        ),
        password: ref(),
        setData: (userData) => {
            if(userData.password) {
                password.value = userData.password
            }
        }
})`

const typeScriptPersonStoreDefinition = `({
        firstname: ref<string>(),
        lastname: ref<string>(),
        setData: (personData: PersonState): void => {
            if(personData.firstname) {
                firstname.value = personData.firstname
            }
            if(personData.lastname) {
                lastname.value = personData.lastname
            }
        }
    })`
const javascriptScriptPersonStoreDefinition = `({
        firstname: ref(),
        lastname: ref(),
        setData: (personData) => {
            if(personData.firstname) {
                firstname.value = personData.firstname
            }
            if(personData.lastname) {
                lastname.value = personData.lastname
            }
        }
    })`

const personStoreDefinitions = {
    js: javascriptScriptPersonStoreDefinition,
    ts: typeScriptPersonStoreDefinition
}

const storeDefinitions = {
    js: javascriptScriptStoreDefinition,
    ts: typeScriptStoreDefinition
}

const personTypesDefinition = `export interface PersonState {
    firstname: string
    lastname: string
}`

const userTypesDefinition = `export interface UserState extends PersonState {
    password: string
}
export interface UserMethods {
    setData: (data: UserState) => void
}`

const personState: TypeRequired = { name: 'PersonState', description: 'State of store' }
const userState: TypeRequired = { name: 'UserState', description: 'State of store' }
const personMethods: TypeRequired = { name: 'UserMethods', description: 'Methods of store' }
</script>

<template>
    <ExplanationContainer :id :title>
        <template #explanation>
            <p>
                Let's take a Store representing a user as an example.
                This Store will extend a Store representing a person and benefit from the latter's State and methods.
                It will also extend the “setData” method, so when useStore.setData is executed,
                the personStore.setData method will also be executed.
            </p>

            <Store :is-epps-store="false" :name="'person'" :store-definitions="personStoreDefinitions">
                <template #typesDefinition>{{ personTypesDefinition }}</template>
            </Store>

            <Store :name="'user'" :store-definitions="storeDefinitions" :required-types="[userState, personMethods]">
                <template #explanation>
                    <p>
                        To define a Store that will extend the State and methods of other Stores, use the
                        defineEppsStore and extendedState functions.
                    </p>
                    <p class="text-sm mt-2">
                        To benefit from the State's persistence function, only the extendedState function is required.
                    </p>
                </template>
                <template #typesDefinition>{{ userTypesDefinition }}</template>
            </Store>
        </template>

        <template #toSee>
            <Links
                :links="{ [defineEppsStore.title]: `/${defineEppsStore.path}`, [extendedState.title]: `/${extendedState.path}` }">
            </Links>
        </template>
    </ExplanationContainer>
</template>