<script setup lang="ts">
import { user as definition } from '~/utils/pages/resumes'

import ShowUser from '~/components/examples/user/demo/ShowUser.vue'
import StoreCreation from '~/components/examples/user/explanation/StoreCreation.vue'
import StorePage from '~/components/examples/common/StorePage.vue'
import UseStore from '~/components/examples/user/explanation/UseStore.vue'
</script>

<template>
    <StorePage :definition>
        <template #pageExplanation>
            <p>
                This page is an example of how to create a store representing a user. The store called
                <code>useUserStore</code> and uses deep inheritance to benefit from the state and methods
                of several parent stores.
            </p>
        </template>

        <template #storeExplanation>
            <StoreCreation />
            <UseStore />
        </template>

        <template #demo>
            <ShowUser />
            <div id="forms">
            </div>
        </template>
    </StorePage>
</template>