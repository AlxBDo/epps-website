<script lang="ts" setup>
import AddList from '~/components/examples/lists/demo/AddList.vue'
import GetById from '~/components/examples/lists/demo/GetById.vue'
import GetItems from '~/components/examples/lists/demo/GetItems.vue'
import RemoveList from '~/components/examples/lists/demo/RemoveList.vue'
import ShowLists from '~/components/examples/lists/demo/ShowLists.vue'
import StoreCreation from '~/components/examples/lists/explanation/StoreCreation.vue'
import StorePage from '~/components/examples/common/StorePage.vue'
import UseStore from '~/components/examples/lists/explanation/UseStore.vue'

const { lists: definition } = await usePagesDefinitions()
</script>

<template>
    <StorePage :definition>
        <template #pageExplanation>
            <p>
                This page is an example of creating a collection store of lists. The store called
                <code>useListsStore</code> extends the <code>useCollectionStore</code> store to
                benefit from its state properties and methods.
            </p>
            <p class="text-sm mt-2">
                useCollectionStore is supplied with the epps plugin.
            </p>
        </template>

        <template #storeExplanation>
            <StoreCreation />
            <UseStore />
        </template>

        <template #demo>
            <ShowLists />
            <div id="forms">
                <AddList />
                <RemoveList />
                <GetById />
                <GetItems />
            </div>
        </template>
    </StorePage>
</template>

<style scoped>
#demo {
    position: relative;

    button {
        position: absolute;
        right: 15px;
        top: -15px;
    }
}

#forms {
    display: flex;
    justify-content: space-between;
    margin: auto;
    flex-wrap: wrap;

    div:first-of-type {
        width: 90%;
    }
}

#forms :deep(form) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 350px;
    min-width: 320px;
    width: 100%;
    margin: 2% auto;

    h4 {
        width: 100%;
        margin: 0 0 10px;
    }
}
</style>