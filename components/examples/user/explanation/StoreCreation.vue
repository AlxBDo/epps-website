<script setup lang="ts">
import { extendedState } from '~/utils/pages/resumes'
import { userStoreCreation } from '~/utils/components/resumes'

import Alert from '~/components/dependencies/Alert.vue';
import ExplanationContainer from '~/components/common/ExplanationContainer.vue';


const { id, title } = userStoreCreation

const definition = `export const useUserStore = (id?: string) => defineEppsStore<UserStore, UserState>(
    id ?? 'user',
    () => {
        const password = ref<string>()

        const {
            excludedKeys,
            actionsToExtends,
            parentsStores,
            persist,
            persistedPropertiesToEncrypt
        } = extendedState(
            [useContactStore(defineStoreId(id, 'contact'))],
            { 
                actionsToExtends: ['setData'], 
                persist: {
                    persistedPropertiesToEncrypt: ref(['email', 'password']),
                    watchMutation: ref(true)
                }
            }
        )


        function setData(data: UserState) {
            if (data.lists) { lists.value = data.lists; }
            if (data.password) { password.value = data.password; }
        }

        return {
            actionsToExtends,
            excludedKeys,
            lists,
            parentsStores,
            password,
            persist,
            persistedPropertiesToEncrypt,
            setData
        }
    }
)()`
</script>

<template>
    <ExplanationContainer :code-sections="['setup']" :id :tip-sections="['store-creation-tip']" :title>
        <template #explanation>
            <p>
                This store inherits from the useContactStore, which in turn inherits from the useItemStore.
            </p>
            <p class="text-sm">
                In addition, the Store extends the setData method also declared in the parent Store useItemStore.
                For the setData method to be extended, it must be declared in the
                extendedState.options.actionsToExtends parameter.
            </p>
            <p class="text-sm">
                The store is also persisted every time its state is modified, thanks to the
                extendedState.options.watchMutation option, and sensitive data is encrypted thanks to the
                extendedState.options.persist.persistedPropertiesToEncrypt option (see localStorage "connectedUser"
                key).
            </p>
        </template>

        <template #setup>
            <div>
                <pre>{{ definition }}</pre>
            </div>
        </template>

        <template #toSee>
            <div>
                <p>
                    For more information on parent stores extended by useUserStore :
                    <ULink :external="true" to="https://github.com/AlxBDo/Epps/tree/main/src/stores" target="_blank">
                        Repo
                    </ULink>
                </p>
            </div>
        </template>

        <template #store-creation-tip>
            <Alert type="tip">
                <template #description>
                    <p>
                        Uses the <code>extendedState</code> function to obtain default and required state properties
                        for the plugin.
                    </p>
                    <ULink class="text-yellow-50" :to="`/${extendedState.path}`">
                        See <code>extendedState</code> function documentation
                    </ULink>
                </template>
            </Alert>
        </template>
    </ExplanationContainer>
</template>