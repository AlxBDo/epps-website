<script setup lang="ts">
import { eppsStoreType } from '~/utils/pages/resumes'
import { getScriptSetup } from '~/utils/docs'
import { useAEppsStore } from '~/utils/components/resumes'

import CodeBlock from '../dependencies/CodeBlock.vue'
import ExplanationContainer from '../common/ExplanationContainer.vue'


const { id, title } = useAEppsStore

function getCode(isJs: boolean = false): string {
    return getScriptSetup(getScript(isJs), isJs) + getTemplate()
}

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
<template>
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
</template>
`
}
</script>

<template>
    <ExplanationContainer :code-sections="['typescript', 'javascript']" :id :title>
        <template #explanation>
            <p>In script setup</p>
        </template>

        <template #typescript>
            <CodeBlock :code="getCode()" lang="html" />
        </template>

        <template #javascript>
            <CodeBlock :code="getCode(true)" lang="html" />
        </template>
    </ExplanationContainer>
</template>