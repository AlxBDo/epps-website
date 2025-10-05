<script setup lang="ts">
import { useUserStore } from '~/utils/components/resumes'
import CodeBlock from '~/components/dependencies/CodeBlock.vue';
import ExplanationContainer from '~/components/common/ExplanationContainer.vue';

const { id, title } = useUserStore

const useUserStoreDeclaration = 'const userStore = useUserStore()'
</script>

<template>
    <ExplanationContainer :id :title :code-sections="['javascript']">
        <template #explanation>
            We create an instance of the user store using <code>useUserStore</code> and type it
            with the appropriate methods and state.
        </template>

        <template #javascript>
            <CodeBlock :code="useUserStoreDeclaration" lang="javascript" />
        </template>
    </ExplanationContainer>

    <ExplanationContainer id="set-data" :code-sections="['set', 'update']">
        <template #subtitle>Set data</template>
        <template #explanation>
            Use setData method to set or update user data.
        </template>

        <template #set>
            <CodeBlock
                code="userStore.setData({ id: 1, email: 'matz@mail.com' firstname: 'Mathiew', lastname: 'Zehr', password: 'M!!-Str0ng_P1$$w4Rd' })"
                lang="javascript" />
        </template>

        <template #update>
            <CodeBlock code="userStore.setData({ email: 'new-email@mail.com' })" lang="javascript" />
        </template>
    </ExplanationContainer>
</template>