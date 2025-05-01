<script setup lang="ts">
import { eppsStoreType } from '~/utils/pages/resumes'
import { useAEppsStore } from '~/utils/components/resumes'

import ExplanationContainer from '../common/ExplanationContainer.vue'
import Links from '../common/Links.vue'
import Store from '../examples/common/Store.vue'
import type { TypeRequired } from '~/types/components'


const { id, title } = useAEppsStore

function getScript(isJs: boolean = false): string {
    const asEppsStore = ' as EppsStore<UserStore, UserState>'

    const commonBottom = `

userStore.setData({
    firstname: 'Mathiew',
    lastname: 'Zerh',
    password: 'MZ@€tr0201'
})

const { firstname, lastname, password } = userStore`

    const commonTop = `// '~/components/User.vue'
import { useUserStore } from '~/stores/userStore.ts'
`

    const importType = `import type { EppsStore } from 'epps'
`
    const useStore = `
const userStore = useUserStore()`

    return commonTop + (isJs ? '' : importType) + useStore + (isJs ? '' : asEppsStore) + commonBottom
}

function getTemplate() {
    return `
    <div>
        <h2>User</h2>

        <p>
            <span>Firstname:</span> {{ firstname }}
        </p>
        <p>
            <span>Lastname:</span> {{ lastname }}
        </p>
        <p>
            <span>Password:</span> {{ password }}
        </p>
    </div>
    `
}
</script>

<template>
    <ExplanationContainer :code-sections="['typescript', 'javascript']" :id :title>
        <template #explanation>
            <p>In script setup</p>
        </template>

        <template #typescript>
            <pre>{{ getScript() }}</pre>
        </template>

        <template #javascript>
            <pre>{{ getScript(true) }}</pre>
        </template>
    </ExplanationContainer>
    <ExplanationContainer :code-sections="['template']" id="template-example">
        <template #explanation>
            <p>In template</p>
        </template>

        <template #template>
            <pre>{{ getTemplate() }}</pre>
        </template>

        <template #toSee>
            <ULink class="text-sm" inactive-class="underline" :to="eppsStoreType?.path">
                {{ eppsStoreType?.name }}
            </ULink>
        </template>
    </ExplanationContainer>
</template>