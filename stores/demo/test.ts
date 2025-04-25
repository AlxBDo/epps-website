
export interface TestStoreState {
    property: Ref<string | undefined>
}

export interface TestStore {
    setProperty: (property: string) => void
}

export const useTestStore = defineStore('testStore', () => {
    const property = ref<string>('My property !')

    return { property, setProperty: (propertyValue: string) => { property.value = propertyValue } }
})