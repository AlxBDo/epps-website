import { isEmpty } from '~/utils/validation';

import type { FunctionPrototype, ParameterPrototype, StorePrototype } from '~/types/components'
import type { StoreSyntax } from '~/types/stores';
import { usePrototypeStore, type PrototypeState, type PrototypeStore } from './prototype';
import type { EppsStore } from 'epps';
import { indent } from '~/utils/docs';


export const useStorePrototype = (id: string) => defineStore(`${id}StorePrototype`, () => {
    const prototype = ref<StorePrototype>()


    const description = computed(() => prototype.value?.description)


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
            if (!isState) {
                const prototypeStore = usePrototypeStore(property.name) as EppsStore<PrototypeStore, PrototypeState>
                prototypeStore.initDeclaration(property as FunctionPrototype, indentNumber)

                code += indent('', indentNumber)

                if (!isOptionApi) {
                    code += 'function '
                }

                code += property.name

                if (isOptionApi) {
                    code += ': '
                }

                if (!isJs) {
                    code += prototypeStore.requiredTypes
                }

                code += prototypeStore.propsToString()

                if (isOptionApi) {
                    code += ' => '
                } else {
                    code += ': '
                }

                code += `${prototypeStore.returnType}
`
            } else {
                if (!isOptionApi) {
                    code += indent(`const ${property.name} = ref`, indentNumber)

                    if (!isJs) {
                        code += `<${property.type}>`
                    }

                    code += '()'
                } else {
                    code += `${property.name} : ${property.type}`
                }
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
        const { id, idIsParam, methods, state } = prototype.value

        let code: string = `export const ${id} = `

        if (idIsParam) {
            code += `(id: string) => `
        }

        code += `defineStore(
    ${idIsParam ? 'id' : id},
    `
        if (isOptionApi) {
            code += `{
        state: () => ({
            `
        } else {
            code += `() => {
`
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
        }

        code += `   }
)`

        return code
    }

    function setPrototype(data: StorePrototype): void {
        prototype.value = data
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
})()