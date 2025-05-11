<script setup lang="ts">
import { useUserStore } from '~/utils/components/resumes'

import ExplanationContainer from '~/components/common/ExplanationContainer.vue';

const { id, title } = useUserStore
</script>

<template>
    <ExplanationContainer :id :title :code-sections="['typescript']">
        <template #explanation>
            We create an instance of the user store using <code>useUserStore</code> and type it
            with the appropriate methods and state.
        </template>

        <template #typescript>
            {{ `const userStore = useUserStore() as EppsStore<UserStore, UserState>` }}
        </template>
    </ExplanationContainer>

    <ExplanationContainer id="set-data" :code-sections="['vue']">
        <template #subtitle>Set data</template>
        <template #explanation>
            Use setData method to set or update user data.
        </template>

        <template #vue>
            <p>// Set data</p>
            <p>
                {{ `userStore.setData({ id: 1, email: 'matz@mail.com' firstname: 'Mathiew', lastname: 'Zehr', password:
                'M!!-Str0ng_P1$$w4Rd' })

                `
                }}
            </p>
            <p>// Update data</p>
            <p>
                {{ `userStore.setData({ email: 'new-email@mail.com' })`
                }}
            </p>
        </template>
    </ExplanationContainer>
</template>