<script lang="ts" setup>
import { useListsStore, type List } from '~/stores/demo/lists'
import { useEppsListsStore } from '~/stores/demo/eppsLists'
import { usePiniaListsStore } from '~/stores/demo/piniaLists'
import type { Store } from 'pinia'
import type { AnyObject } from 'epps'


const listsStore = useListsStore('largeListsStore')
const eppsListsStore = useEppsListsStore('largeEppsListsStore')
const piniaListsStore = usePiniaListsStore('largePiniaListsStore')

const eppsResultStore = useEppsListsStore('eppsResultStore')
const generateListsStoreResult = useEppsListsStore('generateListsResultsStore')
const listsStoreResult = useEppsListsStore('listsResultsStore')
const piniaListsStoreResult = useEppsListsStore('piniaResultsStore')

const listsLength = ref<number>(100)
const result = ref<Record<string, number | string>>({})


function createResult(text: string, store: AnyObject) {
    return { id: store.items.length + 1, text }
}

function generateListItems(listItemsNumber: number) {
    return Array.from({ length: listItemsNumber }, (val, index) => {
        return `Item n°${index}`
    })
}

function getLists(length: number): List[] {
    const startGenerateLists = performance.now()
    const lists = Array.from({ length }, (val, index) => {
        const type = Math.floor(Math.random() * 3).toString()
        return {
            id: index + 1,
            items: generateListItems(Math.floor(Math.random() * 20) + 1),
            name: `List n°${index}`,
            type
        } as List
    })
    const endGenerateLists = performance.now()
    generateListsStoreResult.addItem(
        createResult(`${length} lists generated in ${endGenerateLists - startGenerateLists} ms`, generateListsStoreResult)
    )
    return lists
}

function setLength(event: Event) {
    const target = event.target as HTMLInputElement
    listsLength.value = parseInt(target.value, 10) || 0
}

function generateLists() {
    resetStores()
    const lists = getLists(listsLength.value)

    console.log('----- PINIA LISTS STORE -----')
    const startSetPiniaListsStore = performance.now()
    piniaListsStore.setItems(lists)
    const endSetPiniaListsStore = performance.now()
    const setPiniaListsStorePerf = endSetPiniaListsStore - startSetPiniaListsStore

    piniaListsStoreResult.addItem(
        createResult(`- setLists duration : ${setPiniaListsStorePerf} ms`, piniaListsStoreResult)
    )
    console.log(`Pinia Store - setLists duration : ${setPiniaListsStorePerf} ms`)
    const startGetPiniaListsStore = performance.now()
    piniaListsStore.getItems({ type: '1' })
    const endGetPiniaListsStore = performance.now()
    const getPiniaListsStorePerf = endGetPiniaListsStore - startGetPiniaListsStore
    piniaListsStoreResult.addItem(
        createResult(`- getLists duration : ${getPiniaListsStorePerf} ms`, piniaListsStoreResult)
    )

    let getListsStorePerf: string | number = 'N/A'
    let setListsStorePerf: string | number = 'N/A'
    if (listsLength.value <= 100000) {
        console.log('----- EPPS LISTS STORE WITH PERSISTANCE -----')
        const startSetListsStore = performance.now()
        listsStore.setLists(lists)
        const endSetListsStore = performance.now()
        setListsStorePerf = endSetListsStore - startSetListsStore
        listsStoreResult.addItem(
            createResult(`- setLists duration : ${setListsStorePerf} ms`, listsStoreResult)
        )
        console.log(`Lists Store: ${setListsStorePerf} ms`)
        const startGetListsStore = performance.now()
        piniaListsStore.getItems({ type: '1' })
        const endGetListsStore = performance.now()
        getListsStorePerf = endGetListsStore - startGetListsStore
        listsStoreResult.addItem(
            createResult(`- getLists duration : ${getListsStorePerf} ms`, listsStoreResult)
        )
    }

    console.log('----- EPPS LISTS STORE -----')
    eppsListsStore.getItems()
    const startSetEppsListsStore = performance.now()
    eppsListsStore.setItems(lists)
    const endSetEppsListsStore = performance.now()
    const setEppsListsStorePerf = endSetEppsListsStore - startSetEppsListsStore
    eppsResultStore.addItem(
        createResult(`- setLists duration : ${setEppsListsStorePerf} ms`, eppsResultStore)
    )
    console.log(`Lists Store: ${setEppsListsStorePerf} ms`)
    const startGetEppsListsStore = performance.now()
    piniaListsStore.getItems({ type: '1' })
    const endGetEppsListsStore = performance.now()
    const getEppsListsStorePerf = endGetEppsListsStore - startGetEppsListsStore
    eppsResultStore.addItem(
        createResult(`- getLists duration : ${getEppsListsStorePerf} ms`, eppsResultStore)
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
}

function resetStores() {
    listsStore.$reset()
    eppsListsStore.$reset()
    piniaListsStore.$reset()
    result.value = {}
    eppsResultStore.clear()
    generateListsStoreResult.clear()
    listsStoreResult.clear()
    piniaListsStoreResult.clear()
}
</script>

<template>
    <div>
        <h3>Measure the performance of stores enhanced by the Epps plugin</h3>

        <div>
            <p>Define the number of lists to generate and compare the performance of Epps and Pinia stores.</p>
            <div class="text-sm">
                <p>Example of generated list:</p>
                <pre>{ id: 1, items: ['item1', 'item2', ...], name: 'List n°0', type: '0' }</pre>
            </div>
        </div>

        <section class="my-8">
            <div>
                <label for="lists-length">Number of lists to generate:</label>
                <input id="lists-length" class="text-right" type="number" :value="listsLength" @input="setLength" />
            </div>

            <div class="flex align-middle">
                <UButton class="mt-4 mr-2 cursor-pointer" color="neutral" variant="outline" @click="generateLists">
                    Generate {{ listsLength }} lists
                </UButton>

                <UButton class="mt-4 cursor-pointer" color="neutral" icon="iconamoon:close-bold" variant="outline"
                    @click="resetStores">
                    Reset Store
                </UButton>
            </div>
        </section>

        <section class="flex w-full justify-center flex-wrap lg:justify-between align-top">
            <div class="p-0 w-full" v-if="generateListsStoreResult.items.length">
                <p v-for="list of generateListsStoreResult.items" :key="`result-pinia-p-${list.id}`" class="text-sm">
                    {{ list.text }}
                </p>
            </div>

            <div class="lg:flex-1 md:flex-2 w-full p-2 dark:text-yellow-200 text-yellow-500">
                <h4>Pinia Store</h4>
                <template v-if="piniaListsStoreResult.items.length">
                    <p v-for="list of piniaListsStoreResult.items" :key="`result-pinia-p-${list.id}`" class="text-sm">
                        {{ list.text }}
                    </p>
                </template>
                <p v-else>Waiting for lists</p>
            </div>

            <div class="lg:flex-1 md:flex-2 w-full p-2 dark:text-lime-200 text-lime-500">
                <h4>Epps Store</h4>
                <template v-if="eppsResultStore.items.length">
                    <p v-for="list of eppsResultStore.items" :key="`result-epps-p-${list.id}`" class="text-sm">
                        {{ list.text }}
                    </p>
                </template>
                <p v-else>Waiting for lists</p>
            </div>

            <div class="lg:flex-1 md:flex-2 w-full p-2 dark:text-blue-200 text-blue-500">
                <h4>Epps Store with persistance</h4>
                <template v-if="listsStoreResult.items.length">
                    <p v-for="list of listsStoreResult.items" :key="`result-persisted-p-${list.id}`" class="text-sm">
                        {{ list.text }}
                    </p>
                </template>
                <p v-else-if="listsLength > 100000">Too many lists for a persistent store</p>
                <p v-else>Waiting for lists</p>
            </div>
        </section>
    </div>
</template>