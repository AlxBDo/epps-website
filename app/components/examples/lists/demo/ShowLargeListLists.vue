<script lang="ts" setup>
import { useListsStore, type List } from '~/stores/demo/lists'
import { useEppsListsStore } from '~/stores/demo/eppsLists'
import { usePiniaListsStore } from '~/stores/demo/piniaLists'
import DisplayResult from '~/components/examples/common/DisplayResult.vue'
import { isEmpty } from '~/utils/validation'


const listsStore = useListsStore('largeListsStore')
const eppsListsStore = useEppsListsStore('largeEppsListsStore')
const piniaListsStore = usePiniaListsStore('largePiniaListsStore')
const resultsStore = useEppsListsStore('resultsStore')

const currentProcess = ref<string>()
const isLoading = ref<boolean>(false)
const listsLength = ref<number>(100)
const result = ref<Record<string, number | string>>({})


function createResult(text: string) {
    return { id: resultsStore.items.length + 1, text }
}

function getLists(length: number): List[] {
    resultsStore.addItem(
        createResult(`Generating ${length} lists...`)
    )
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
    resultsStore.clear()
    isLoading.value = true
    const lists = getLists(listsLength.value)

    console.log('----- PINIA LISTS STORE -----')
    resultsStore.addItem(
        createResult(`Setting Pinia store with ${listsLength.value} lists...`)
    )
    const startSetPiniaListsStore = performance.now()
    piniaListsStore.setItems(lists)
    const endSetPiniaListsStore = performance.now()
    const setPiniaListsStorePerf = endSetPiniaListsStore - startSetPiniaListsStore

    resultsStore.addItem(
        createResult(`Pinia Store - set duration : ${setPiniaListsStorePerf} ms`)
    )
    console.log(`Pinia Store - set duration : ${setPiniaListsStorePerf} ms`)
    const startGetPiniaListsStore = performance.now()
    piniaListsStore.getItems({ type: '1' })
    const endGetPiniaListsStore = performance.now()
    const getPiniaListsStorePerf = endGetPiniaListsStore - startGetPiniaListsStore
    resultsStore.addItem(
        createResult(`Pinia Store - get duration : ${getPiniaListsStorePerf} ms`)
    )

    let getListsStorePerf: string | number = 'N/A'
    let setListsStorePerf: string | number = 'N/A'
    if (listsLength.value > 100000) {
        console.log('----- EPPS LISTS STORE WITH PERSISTANCE -----')
        resultsStore.addItem(
            createResult(`Setting persisted Epps store with ${listsLength.value} lists...`)
        )
        const startSetListsStore = performance.now()
        listsStore.setLists(lists)
        const endSetListsStore = performance.now()
        setListsStorePerf = endSetListsStore - startSetListsStore
        resultsStore.addItem(
            createResult(`Persisted Epps Store - set duration : ${setListsStorePerf} ms`)
        )
        console.log(`Lists Store: ${setListsStorePerf} ms`)
        const startGetListsStore = performance.now()
        piniaListsStore.getItems({ type: '1' })
        const endGetListsStore = performance.now()
        getListsStorePerf = endGetListsStore - startGetListsStore
        resultsStore.addItem(
            createResult(`Persisted Epps Store - get duration : ${getListsStorePerf} ms`)
        )
    }

    console.log('----- EPPS LISTS STORE -----')
    eppsListsStore.getItems()
    resultsStore.addItem(
        createResult(`Setting not persisted Epps store with ${listsLength.value} lists...`)
    )
    const startSetEppsListsStore = performance.now()
    eppsListsStore.setItems(lists)
    const endSetEppsListsStore = performance.now()
    const setEppsListsStorePerf = endSetEppsListsStore - startSetEppsListsStore
    resultsStore.addItem(
        createResult(`Epps Store - set duration : ${setEppsListsStorePerf} ms`)
    )
    console.log(`Lists Store: ${setEppsListsStorePerf} ms`)
    const startGetEppsListsStore = performance.now()
    piniaListsStore.getItems({ type: '1' })
    const endGetEppsListsStore = performance.now()
    const getEppsListsStorePerf = endGetEppsListsStore - startGetEppsListsStore
    resultsStore.addItem(
        createResult(`Epps Store - get duration : ${getEppsListsStorePerf} ms`)
    )

    console.log('----- PINIA LISTS STORE vs EPPS LISTS STORE -----', { setPiniaListsStorePerf, setEppsListsStorePerf, setListsStorePerf })

    result.value = {
        setPiniaListsStorePerf,
        getPiniaListsStorePerf,
        setEppsListsStorePerf,
        getEppsListsStorePerf,
        setListsStorePerf,
        getListsStorePerf
    }
    isLoading.value = false
}

function resetStores() {
    listsStore.$reset()
    eppsListsStore.$reset()
    piniaListsStore.$reset()
    result.value = {}
    resultsStore.clear()
}
</script>

<template>
    <div>
        <h3>Performance Pinia vs Epps</h3>

        <div>
            <label for="lists-length">List length:</label>
            <input id="lists-length" class="text-right" type="number" :value="listsLength" @input="setLength" />
        </div>

        <div>
            <UButton class="mt-4 cursor-pointer" color="neutral" :loading="isLoading" variant="outline"
                @click="generateLists">
                Generate {{ listsLength }} lists
            </UButton>

            <UButton class="mt-4 cursor-pointer" color="neutral" :loading="isLoading" icon="iconamoon:close-bold"
                variant="outline" @click="resetStores">
                Reset Store
            </UButton>
        </div>

        <div v-if="resultsStore.items.length">
            <p v-for="list of resultsStore.items" :key="`result-p-${list.id}`">
                {{ list.text }}
            </p>
        </div>
        <p v-else>Waiting for lists</p>
    </div>
</template>