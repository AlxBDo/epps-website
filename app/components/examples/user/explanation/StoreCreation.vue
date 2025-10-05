<script setup lang="ts">
import { storesRepoPath } from '~/utils/constantes';
import { userStoreCreation } from '~/utils/components/resumes'

import CodeBlock from '~/components/dependencies/CodeBlock.vue'
import ExplanationContainer from '~/components/common/ExplanationContainer.vue'
import UsedEppsStoreOptionsExplanation from '../../common/UsedEppsStoreOptionsExplanation.vue'


const { id, title } = userStoreCreation

const definition = `export const useUserStore = (id?: string) => defineEppsStore<UserStore, UserState>(
    id ?? 'userStore',
    () => {
        const password = ref<string>()

        function setData(data: UserState) {
            if (data.password) { password.value = data.password; }
        }

        return { password, setData }
    },
    {
        actionsToExtends: ['setData'],
        parentsStores: [ new ParentStore('userContact', useContactStore) ], 
        persist: {
            persistedPropertiesToEncrypt: ['email', 'password'],
            watchMutation: true
        }
    }
)()`

const usedEppsStoreOptions = [
    {
        name: 'actionsToExtends',
        explanation: 'Allows the parent store action to be executed after the child store action has been executed. The arguments provided to the child store action are provided to the parent store action'
    },
    {
        name: 'parentsStores',
        explanation: 'allows you to define stores to extends'
    },
    {
        name: 'persistedPropertiesToEncrypt',
        explanation: 'Allows you to encrypt the properties listed during persistence'
    },
    {
        name: 'watchMutation',
        explanation: 'allows the state to be persisted each time one of its properties is modified'
    }
]
</script>

<template>
    <ExplanationContainer :code-sections="['setup']" :id :title>
        <template #explanation>
            <p>
                This store inherits from the useContactStore, which in turn inherits from the useItemStore.
            </p>
            <p class="text-sm">
                In addition, the Store extends the setData method also declared in the parent Store useItemStore.
            </p>
            <p class="text-sm">
                The store is also persisted every time its state is modified, thanks to the
                persist.watchMutation option, and sensitive data is encrypted thanks to the
                persist.persistedPropertiesToEncrypt option (see localStorage "connectedUser" key).
            </p>
        </template>

        <template #setup>
            <div>
                <CodeBlock :code="definition" lang="typeScript" />
            </div>
        </template>

        <template #detailedExplanations>
            <UsedEppsStoreOptionsExplanation :options="usedEppsStoreOptions" />
        </template>

        <template #toSee>
            <div>
                <p>
                    For more information on parent stores extended by useUserStore :
                    <ULink :external="true" :to="storesRepoPath" target="_blank">
                        Github repo
                    </ULink>
                </p>
            </div>
        </template>
    </ExplanationContainer>
</template>