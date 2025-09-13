<script setup lang="ts">
import { defineAEppsStore } from '~/utils/components/resumes'

import ExplanationContainer from '../common/ExplanationContainer.vue'
import Links from '../common/Links.vue'
import Store from '../examples/common/Store.vue'
import type { ParameterPrototype, TypeRequired } from '~/types/prototype'

const { defineEppsStore, eppsStoreOptions, parentStore, persistStoreOptions } = usePagesDefinitions()
const { id, title } = defineAEppsStore

const eppsDefinition = `{
        actionsToExtends: ['setData'],
        parentsStores: [ new ParentStore('userPersonStore', usePersonStore) ]
    }`

const typeScriptStoreDefinition = `({
        password: ref<string>(),
        setData: (userData: User): void => {
            if(userData.password) {
                password.value = userData.password
            }
        },
        user: computed(() => ({ ...getEppsStore<UserMethods, UserState>().person, password: password.value }))
    })`
const javascriptScriptStoreDefinition = `({
        password: ref(),
        setData: (userData) => {
            if(userData.password) {
                password.value = userData.password
            }
        },
        user: computed(() => ({ ...getEppsStore().person, password: password.value }))
    })`

const typeScriptPersonStoreDefinition = `({
        firstname: ref<string>(),
        lastname: ref<string>(),
        person: computed(() => ({ firstname: firstname.value, lastname: lastname.value })),
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
        person: computed(() => ({ firstname: firstname.value, lastname: lastname.value })),
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

const personStoreDefParams: ParameterPrototype = { name: 'storeId', type: 'string', required: true }

const storeDefinitions = {
    js: javascriptScriptStoreDefinition,
    ts: typeScriptStoreDefinition
}

const personTypesDefinition = `export interface PersonState {
    firstname: string
    lastname: string
    person: { firstname: string, lastname: string }
}

`

const userTypesDefinition = `export interface UserState extends PersonState {
    password: string
}

export interface UserMethods {
    setData: (data: UserState) => void
    user: { firstname: string, lastname: string, password: string }
}

`

const userState: TypeRequired = { name: 'UserState', description: 'State of store' }
const personMethods: TypeRequired = { name: 'UserMethods', description: 'Methods of store' }
</script>

<template>
    <ExplanationContainer :code-sections="['userStore', 'personStore']" :id :title>
        <template #explanation>
            <p>
                Let's take a Store representing a user as an example.
                This Store will extend a Store representing a person and benefit from the latter's State and methods.
                It will also extend the “setData” method, so when useStore.setData is executed,
                the personStore.setData method will also be executed.
            </p>
        </template>

        <template #userStore>
            <Store :name="'user'" :epps-definition :store-definitions="storeDefinitions"
                :required-types="[userState, personMethods]" :types-definition="userTypesDefinition">
                <template #explanation>
                    <p class="text-sm">
                        To define a Store that will extend the State and methods of other Stores, use the
                        defineEppsStore function and ParentStore class.
                    </p>
                    <p class="text-sm">
                        To access the methods and properties of parent stores, or those extended by
                        the plugin, use the getEppsStore function.
                    </p>
                </template>
            </Store>
        </template>

        <template #personStore>
            <Store :definition-parameter="personStoreDefParams" :is-epps-store="false" :name="'person'"
                :store-definitions="personStoreDefinitions" :types-definition="personTypesDefinition">
            </Store>
        </template>

        <template #toSee>
            <Links :links="{
                defineEppsStore: `/${defineEppsStore.path}`,
                EppsStoreOptions: `/${eppsStoreOptions?.path}`,
                ParentStore: `/${parentStore?.path}`,
                PeristStoreOptions: `/${persistStoreOptions?.path}`
            }"></Links>
        </template>
    </ExplanationContainer>
</template>