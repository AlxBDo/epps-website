<script lang="ts" setup>
import { useListsStore, type List } from '~/stores/demo/lists'
import { useEppsListsStore } from '~/stores/demo/eppsLists'
import { usePiniaListsStore } from '~/stores/demo/piniaLists'
import DisplayResult from '~/components/examples/common/DisplayResult.vue'



const listsStore = useListsStore('largeListsStore')
const eppsListsStore = useEppsListsStore('largeEppsListsStore')
const piniaListsStore = usePiniaListsStore('largePiniaListsStore')

const listsLength = ref<number>(100)
const result = ref<Record<string, number> | string>({})


function getLists(length: number): List[] {
    result.value = `Generating ${length} lists...`

    return Array.from({ length }, (val, index) => {
        const type = Math.floor(Math.random() * 3).toString()
        return { id: index + 1, name: `List n°${index}`, type } as List
    })
}

function setLength(event: Event) {
    const target = event.target as HTMLInputElement
    listsLength.value = parseInt(target.value, 10) || 0
}

function generateLists() {
    const lists = getLists(listsLength.value)

    console.log('----- PINIA LISTS STORE -----')
    const startPiniaListsStore = performance.now()
    piniaListsStore.setItems(lists)
    const endPiniaListsStore = performance.now()
    const PiniaListsStorePerf = endPiniaListsStore - startPiniaListsStore
    console.log(`Pinia Lists Store: ${PiniaListsStorePerf} ms`)

    console.log('----- EPPS LISTS STORE WITH PERSISTANCE -----')
    const startListsStore = performance.now()
    listsStore.setLists(lists)
    const endListsStore = performance.now()
    const listsStorePerf = endListsStore - startListsStore
    console.log(`Lists Store: ${listsStorePerf} ms`)

    console.log('----- EPPS LISTS STORE -----')
    eppsListsStore.getItems()
    const startEppsListsStore = performance.now()
    eppsListsStore.setItems(lists)
    const endEppsListsStore = performance.now()
    const eppsListsStorePerf = endEppsListsStore - startEppsListsStore
    console.log(`Lists Store: ${eppsListsStorePerf} ms`)

    console.log('----- PINIA LISTS STORE vs EPPS LISTS STORE -----', { PiniaListsStorePerf, eppsListsStorePerf, listsStorePerf })

    result.value = { PiniaListsStorePerf, eppsListsStorePerf, listsStorePerf }
}

function resetStores() {
    listsStore.$reset()
    eppsListsStore.$reset()
    piniaListsStore.$reset()
    result.value = {}
}
</script>

<template>
    <div>
        <h3>Performance Pinia vs Epps</h3>

        <DisplayResult no-result-text="Define lists length" :result />

        <div>
            <label for="lists-length">List length:</label>
            <input id="lists-length" class="text-right" type="number" :value="listsLength" @input="setLength" />
        </div>

        <UButton class="mt-4 cursor-pointer" color="neutral" variant="outline" @click="generateLists">
            Generate {{ listsLength }} lists
        </UButton>

        <UButton class="mt-4 cursor-pointer" color="neutral" icon="iconamoon:close-bold" variant="outline"
            @click="resetStores">
            Reset Store
        </UButton>
    </div>
</template>