import { capitalize } from '~/utils/string'
import { indent } from '~/utils/docs';
import { isEmpty } from '~/utils/validation';
import { usePrototypeStore, type PrototypeState, type PrototypeStore } from './prototype';
import type { FunctionPrototype, ParameterPrototype, StorePrototype } from '~/types/prototype'
import type { ParentsStoresEppsOption, ParentStoreEppsOption, StoreSyntax } from '~/types/stores';
import { defineEppsStore, getEppsStore, ParentStore, type EppsStore } from 'epps';
import type { TypeDeclarationState, TypeDeclarationStore, TypesProps } from './typesDeclaration';
import { useStoreTypesDeclaration } from './storeTypesDeclaration';


export interface StorePrototypeState extends TypeDeclarationState {
    defineStoreDefinition: string
    description: string
    prototype: StorePrototype
}

export interface StorePrototypeStore extends TypeDeclarationStore {
    methodsHasDescription: () => boolean
    prototypeToString: (syntax?: StoreSyntax, isJs?: boolean) => string
    setPrototype: (data: StorePrototype) => void
    stateHasDescription: () => boolean
}


export const useStorePrototype = (id: string) => defineEppsStore<StorePrototypeStore, StorePrototypeState>(`${id}StorePrototype`, () => {
    const prototype = ref<StorePrototype>()
    const storeReturn: string[] = []

    const defineStoreDefinition = computed(
        () => prototype.value?.isEppsStore
            ? `defineEppsStore<${prototype.value.storeType}, ${prototype.value.stateType}>`
            : 'defineStore'
    )
    const description = computed(() => prototype.value?.description)
    const getRequiredTypes = computed(() => {
        return getTypesStore()?.requiredTypesToString()
    })


    function actionDefinition(
        property: FunctionPrototype,
        indentNumber: number,
        isJs: boolean,
        isOptionApi: boolean
    ): string {
        let code: string = ''
        const prototypeStore = usePrototypeStore(property.name) as EppsStore<PrototypeStore, PrototypeState>
        prototypeStore.initDeclaration(property as FunctionPrototype, indentNumber)
        prototypeStore.initProps((property as FunctionPrototype).props, undefined, isOptionApi ? 3 : 2)

        code += indent('', indentNumber)

        if (!isOptionApi) {
            code += 'function '
        }

        code += property.name

        if (isOptionApi) {
            code += ': '
        }

        if (!isJs) {
            code += prototypeStore.requiredTypesToString()
        }

        code += prototypeStore.propsToString()

        if (isOptionApi) {
            code += ' => '
        } else {
            code += ': '
        }

        code += `${(property as FunctionPrototype)?.returnType}
`
        return code
    }

    function addStoreReturnItem(item: string): void {
        if (!storeReturn.includes(item)) {
            storeReturn.push(item)
        }
    }

    function eppsDefinition(
        parentsStores: ParentsStoresEppsOption,
        actionsToExtends?: string[],
        persist?: { persist?: boolean, watchMutation?: boolean }
    ) {
        addStoreReturnItem('parentsStores')
        let code = `const epps = new Epps({`

        if (actionsToExtends) {
            addStoreReturnItem('actionsToExtends')
            code += `
    actionsToExtends: ['${actionsToExtends.join("', '")}'],`
        }

        code += `
    parentsStores: ${parentsStoresDefinition(parentsStores)}`

        if (persist) {
            let persistDef: string | undefined

            if (persist?.persist) {
                persistDef = 'persist: true'
            }

            if (persist.watchMutation) {
                if (persistDef) {
                    persistDef += ', '
                }
                persistDef += 'watchMutation: true '
            }
            code += `,
    persist: { ${persistDef} }`
        }

        code += `
})

`

        return code
    }

    function getTypesStore() {
        return getEppsStore<TypeDeclarationStore, TypeDeclarationState>(`${id}StorePrototype`)
    }

    function listProperties(
        properties: Array<ParameterPrototype | FunctionPrototype>,
        syntax: StoreSyntax = 'setup',
        isJs: boolean = false,
        isState: boolean = false,
        indentNumber: number = 3
    ): string {
        if (isEmpty(properties)) return ''

        let code: string = ''
        const isOptionApi = syntax === 'optionApi'

        properties.forEach(property => {
            addStoreReturnItem(property.name)
            if (isState) {
                code += stateDefinition(property as ParameterPrototype, indentNumber, isJs, isOptionApi)
            } else {
                code += actionDefinition(property as FunctionPrototype, indentNumber, isJs, isOptionApi)
            }
        })

        return code
    }

    function methodsHasDescription(): boolean {
        if (!prototype.value) return false

        const { methods } = prototype.value
        return !isEmpty(methods)
            && !!(methods as FunctionPrototype[]).find(property => property?.description)
    }

    function parentStoreDefinition(parentStore: ParentStoreEppsOption) {
        return `new ParentStore('${parentStore.id}', ${parentStore.name})`
    }

    function parentsStoresDefinition(parentsStores: ParentsStoresEppsOption) {
        const separator = parentsStores.length < 3 ? ' ' : `
        `
        const parentsStoresString = parentsStores.reduce((acc: string, curr: ParentStoreEppsOption) => {
            if (acc !== '') { acc += ',' + separator }

            acc += parentStoreDefinition(curr)

            return acc
        }, '')

        return `[${separator}${parentsStoresString}${separator}]`
    }

    function prototypeToString(syntax: StoreSyntax = 'setup', isJs: boolean = false): string {
        if (!prototype.value) return ''

        const isOptionApi = syntax === 'optionApi'
        const indentNumber = isOptionApi ? 3 : 2
        const { actionsToExtends, idIsParam, isEppsStore, methods, name, parentsStores, state } = prototype.value

        const storeName = `${name}Store`

        let code: string = isEppsStore ? eppsDefinition(parentsStores as ParentsStoresEppsOption, actionsToExtends) : ''

        code += `export const use${capitalize(storeName)} = `

        if (idIsParam) {
            code += `${getRequiredTypes.value}(id: string) => `
        }

        code += `${defineStoreDefinition.value}(
    ${idIsParam ? 'id' : storeName},
    `
        if (isOptionApi) {
            code += `{
        state: () => ({`
        } else {
            code += `() => {`
        }

        code += listProperties(state, syntax, isJs, true, indentNumber)

        if (isOptionApi) {
            code += `
        }),
        
        actions: {
`
        } else {
            code += `

`
        }

        if (methods) {
            code += listProperties(methods, syntax, isJs, false, indentNumber)
        }

        if (isOptionApi) {
            code += `       }
`
        } else {
            code += `
${indent('return ', indentNumber)} {${storeReturn.sort((a, b) => a > b ? 1 : -1).reduce(
                (acc: string, curr: string) => acc + (acc.length > 0 ? ',' : '') + `
${indent(curr, (indentNumber + 1))}`,
                ''
            )}
${indent('}', indentNumber)}
`
        }

        code += `   }`

        if (isEppsStore) {
            code += `, 
    epps`
        }

        code += `
)`

        return code
    }

    function setPrototype(data: StorePrototype): void {
        prototype.value = data

        if (data.requiredTypes) {
            getTypesStore()?.initTypes(data as unknown as TypesProps)
        }
    }

    function stateDefinition(
        property: ParameterPrototype,
        indentNumber: number,
        isJs: boolean,
        isOptionApi: boolean
    ): string {
        let code: string = ''
        if (!isOptionApi) {
            code += `
${indent(`const ${property.name} = ref`, indentNumber)}`

            if (!isJs) {
                code += `<${property.type}>`
            }

            code += '()'
        } else {
            code += `
${indent(property.name, indentNumber)} : ${property.type}`
        }
        return code
    }

    function stateHasDescription(): boolean {
        if (!prototype.value) return false

        const { state } = prototype.value
        return !!state.find(property => property?.description)
    }


    return {
        description,
        methodsHasDescription,
        prototype,
        prototypeToString,
        setPrototype,
        stateHasDescription
    }
}, { parentsStores: [new ParentStore('prototype', useStoreTypesDeclaration)] })()