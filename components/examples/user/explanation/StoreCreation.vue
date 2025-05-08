<script setup lang="ts">
import { extendedState } from '~/utils/pages/resumes'
import { userStoreCreation } from '~/utils/components/resumes'

import Alert from '~/components/dependencies/Alert.vue';
import ExplanationContainer from '~/components/common/ExplanationContainer.vue';


const { id, title } = userStoreCreation

const definition = `export const useUserStore = (id?: string) => defineEppsStore<UserStore, UserState>(
    id ?? 'contact',
    () => {
        const lists = ref<List[]>()
        const password = ref<string>()

        const {
            excludedKeys,
            actionsToExtends,
            parentsStores,
            persist,
            persistedPropertiesToEncrypt
        } = extendedState(
            [useContactStore(defineStoreId(id ?? 'user', 'contact'))],
            { actionsToExtends: ['setData'] }
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
            <p>
                In addition, the Store extends the setData method also declared in the parent Store useItemStore.
                For the setData method to be extended, it must be declared in the
                extendedState.options.actionsToExtends parameter.
            </p>
        </template>

        <template #setup>
            <div>
                <pre>{{ definition }}</pre>
            </div>
        </template>

        <template #toSee>
            <div>
                <p>For more information on parent stores extended by useUserStore :</p>
                <ULink :external="true" to="https://github.com/AlxBDo/Epps/tree/main/src/stores" target="_blank">
                    Repo
                </ULink>
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