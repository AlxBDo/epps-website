<script setup lang="ts">
import ShowUser from '~/components/examples/user/demo/ShowUser.vue'
import StoreCreation from '~/components/examples/user/explanation/StoreCreation.vue'
import StorePage from '~/components/examples/common/StorePage.vue'
import UpdateUser from '~/components/examples/user/demo/UpdateUser.vue'
import UseStore from '~/components/examples/user/explanation/UseStore.vue'

const { user: definition } = await usePagesDefinitions()
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
                <UpdateUser />
            </div>
        </template>
    </StorePage>
</template>

<style scoped>
#forms :deep(form) {
    div {
        display: inline-block;
        margin: auto 5px;
    }
}
</style>