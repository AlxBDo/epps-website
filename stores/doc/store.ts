import { capitalize } from "vue"
import type { ParameterPrototype, TypeRequired } from "~/types/components"
import { isEmpty } from "~/utils/validation"

interface StoreState {
    definitionParameter?: ParameterPrototype
    isEppsStore: boolean,
    name: string
    requiredTypes?: TypeRequired[]
}

export const useStoreStore = (id: string) => defineStore(`${id}Store`, () => {
    const definitionParameter = ref<ParameterPrototype>()
    const isEppsStore = ref<boolean>(true)
    const name = ref<string>(id)
    const requiredTypes = ref<TypeRequired[]>([])
    const storeName = ref<string>()


    function defineStoreToString() {
        return isEppsStore.value ? 'defineEppsStore' : 'defineStore'
    }

    function definitionParameterToString() {
        return isEmpty(definitionParameter.value) ? ''
            : `('${definitionParameter.value?.name}${definitionParameter.value?.required ? '' : '?'}: ${definitionParameter.value?.type}') => `
    }

    function init(store: StoreState) {
        if (!isEmpty(store.definitionParameter)) {
            definitionParameter.value = store.definitionParameter
        }

        if (!isEmpty(store.isEppsStore)) {
            isEppsStore.value = store.isEppsStore
        }

        if (store.name !== name.value) {
            name.value = store.name
        }

        storeName.value = `use${capitalize(name.value)}Store`

        if (store.requiredTypes) {
            requiredTypes.value = store.requiredTypes
        }
    }

    function requiredTypesToString() {
        const types = !isEmpty(requiredTypes.value) && requiredTypes.value.reduce((types: string, type: TypeRequired) => {
            if (types.length > 0) {
                types += ', '
            }

            types += type.name

            return types
        }, '')
        return types ? `<${types}>` : ''
    }


    return {
        definitionParameterToString,
        defineStoreToString,
        init,
        name,
        requiredTypesToString,
        storeName,
    }
})()