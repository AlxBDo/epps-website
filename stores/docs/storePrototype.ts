import { capitalize } from '~/utils/string'
import { indent } from '~/utils/docs';
import { isEmpty } from '~/utils/validation';
import { usePrototypeStore, type PrototypeState, type PrototypeStore } from './prototype';

import type { FunctionPrototype, ParameterPrototype, StorePrototype } from '~/types/prototype'
import type { StoreSyntax } from '~/types/stores';
import { defineEppsStore, extendedState, getParentStoreMethod, type EppsStore } from 'epps';
import type { TypeDeclarationState, TypeDeclarationStore } from './typesDeclaration';
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
    const { parentsStores } = extendedState(
        [useStoreTypesDeclaration(id)]
    )
    const prototype = ref<StorePrototype>()
    const storeReturn: string[] = []

    const defineStoreDefinition = computed(
        () => prototype.value?.isEppsStore
            ? `defineEppsStore<${prototype.value.storeType}, ${prototype.value.stateType}>`
            : 'defineStore'
    )
    const description = computed(() => prototype.value?.description)
    const getRequiredTypes = computed(() => {
        if (!parentsStores) { return '' }

        const [typesStores] = parentsStores()

        return getParentStoreMethod('requiredTypesToString', typesStores)()
    })


    function actionsDefinition(
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

    function extendedStateDefinition(parentsStores: string[], actionsToExtends?: string[]) {
        addStoreReturnItem('parentsStores')
        let code = `extendedState(
                parentsStores: [${parentsStores.join(", ")}]`

        if (actionsToExtends) {
            addStoreReturnItem('actionsToExtends')
            code += `,
                persist: { actionsToExtends: ['${actionsToExtends.join("', '")}']}`
        }

        code += `
            )`

        return code
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
                code += actionsDefinition(property as FunctionPrototype, indentNumber, isJs, isOptionApi)
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

    function prototypeToString(syntax: StoreSyntax = 'setup', isJs: boolean = false): string {
        if (!prototype.value) return ''

        const isOptionApi = syntax === 'optionApi'
        const indentNumber = isOptionApi ? 3 : 2
        const { actionsToExtends, idIsParam, isEppsStore, methods, name, parentsStores, state } = prototype.value

        const storeName = `${name}Store`

        let code: string = `export const use${capitalize(storeName)} = `

        if (idIsParam) {
            code += `${getRequiredTypes.value}(id: string) => `
        }

        code += `${defineStoreDefinition.value}(
    ${idIsParam ? 'id' : storeName},
    `
        if (isOptionApi) {
            code += `{
        state: () => ({`

            if (isEppsStore && parentsStores) {
                code += `
            ...${extendedStateDefinition(parentsStores, actionsToExtends)}`
            }
        } else {
            code += `() => {`

            if (isEppsStore && parentsStores) {
                code += `
        const { parentsStores${actionsToExtends ? ', actionsToExtends' : ''} } = ${extendedStateDefinition(parentsStores, actionsToExtends)}`
            }
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

        code += `   }
)`

        return code
    }

    function setPrototype(data: StorePrototype): void {
        prototype.value = data

        if (data.requiredTypes && parentsStores) {
            const [typesStore] = parentsStores()
            getParentStoreMethod('initTypes', typesStore)(data)
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
        parentsStores,
        prototypeToString,
        setPrototype,
        stateHasDescription
    }
})()