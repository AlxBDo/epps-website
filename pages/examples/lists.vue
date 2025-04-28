<script lang="ts" setup>
import type { CollectionState, CollectionStoreMethods, EppsStore } from 'epps'
import type { List } from '~/models/liste'

import { ref } from 'vue'
import { lists as definition } from '~/utils/pages/resumes'
import { useListsStore } from '~/stores/demo/lists'

import AddList from '~/components/examples/lists/demo/AddList.vue'
import GetById from '~/components/examples/lists/demo/GetById.vue'
import GetItems from '~/components/examples/lists/demo/GetItems.vue'
import Page from '~/components/common/Page.vue'
import RemoveList from '~/components/examples/lists/demo/RemoveList.vue'
import SectionSelector from '~/components/examples/common/selector/SectionSelector.vue'
import ShowLists from '~/components/examples/lists/demo/ShowLists.vue'
import StoreCreation from '~/components/examples/lists/explanation/StoreCreation.vue'
import UseStore from '~/components/examples/lists/explanation/UseStore.vue'


const activeSection = ref<'explanation' | 'demo'>('explanation')
const lists = ref<List[]>([])

function setActiveSection(section: 'explanation' | 'demo') {
    activeSection.value = section
}

function resetStore() {
    listsStore.$reset()
    lists.value = listsStore.items
}


const listsStore = useListsStore() as EppsStore<CollectionStoreMethods, CollectionState<List>>
</script>

<template>
    <Page :definition>
        <p>
            This page is an example of creating a collection store of lists. The store called <code>useListsStore</code>
            extends the <code>useCollectionStore</code> store to benefit from its state properties and methods.
        </p>
        <div id="container">
            <SectionSelector :active-section :sections="['explanation', 'demo']" @setActiveSection="setActiveSection" />

            <section v-if="activeSection === 'explanation'" id="explanation">
                <StoreCreation />
                <UseStore />
            </section>

            <section v-if="activeSection === 'demo'" id="forms">
                <button @click="resetStore">Reset Store</button>
                <ShowLists />
                <AddList />
                <RemoveList />
                <GetById />
                <GetItems />
            </section>
        </div>
    </Page>
</template>

<style scoped>
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
    max-width: 550px;
    min-width: 320px;
    width: 100%;
    margin: 2% auto;

    h3 {
        width: 100%;
        margin: 0;
    }
}
</style>