import type { CodeDeclarationTypes, FunctionReturn, ParameterPrototype, TypeRequired } from "~/types/components"
import type { PropsDeclarationState, PropsDeclarationStore } from "./propsDeclaration";
import type { TypeDeclarationState, TypeDeclarationStore } from "./typesDeclaration";

import { defineEppsStore, extendedState, getParentStoreMethod } from "epps";
import { usePropsDeclarationStore } from "./propsDeclaration";
import { useTypeDeclarationStore } from "./typesDeclaration";
import { isEmpty } from "~/utils/validation";


interface InitDeclarationProps {
    description?: string
    name: string
    properties?: ParameterPrototype[]
    props?: ParameterPrototype[]
    requiredTypes?: TypeRequired[]
    returnType?: FunctionReturn
    type: CodeDeclarationTypes
    value?: string
}

export interface PrototypeState extends PropsDeclarationState, TypeDeclarationState {
    codeSlots: string[]
    declarationSymbols: SymbolsObject
}

export interface PrototypeStore extends PropsDeclarationStore, TypeDeclarationStore {
    displayJsSlot: () => boolean
    getDeclarationSymbol: (position: 'end' | 'start') => string | undefined
    getCode: (lang?: 'javascript' | 'typeScript') => string
    getEndSymbol: () => string
    getParamsFormatted: (params: string, symbols?: SymbolsObject) => string
    getStartSymbol: () => string
    initDeclaration: ({ properties, props, requiredTypes, returnType, type, value }: InitDeclarationProps, indent?: number) => void
}

type DeclarationSymbols = Record<string, SymbolsObject>

type SymbolsObject = {
    start: string,
    end?: string
}


const declarationsSymbols: DeclarationSymbols = {
    array: symbolsObject('= [', ']'),
    class: symbolsObject('{', '}'),
    interface: symbolsObject('{', '}'),
    type: symbolsObject('=')
}

const typesNeedJsCode = [
    'array',
    'class',
    'function',
    'object'
]


function symbolsObject(start: string, end?: string) {
    return { start, end }
}


export const usePrototypeStore = (id: string) => defineEppsStore<PrototypeStore, PrototypeState>(`${id}PrototypeStore`, () => {
    const codeSlots = ref<string[]>()
    const declaration = ref<InitDeclarationProps>()
    const declarationSymbols = ref<SymbolsObject>()
    const { parentsStores } = extendedState([useTypeDeclarationStore(id), usePropsDeclarationStore(id)])


    function displayJsSlot(): boolean {
        return !!codeSlots.value?.includes('javascript')
    }

    function getCode(lang: 'javascript' | 'typeScript' = 'typeScript'): string {
        let code: string = ''

        if (declaration.value) {
            const ps = parentsStores && parentsStores()
            const { name, properties, returnType, type, value } = declaration.value

            code = `${type} ${name}`

            if (lang === 'typeScript') {
                code += getParentStoreMethod('requiredTypesToString', 0, ps)()
            }

            if (type === 'function') {
                code += getParentStoreMethod('propsToString', 1, ps)()
            }

            code += `${getParentStoreMethod('returnTypeFormatted', 0, ps)(returnType)} ${getStartSymbol()} `

            if (!isEmpty(properties)) {
                if (type !== 'interface') {
                    code += `
                        `
                }

                properties?.forEach((property: ParameterPrototype) => {
                    code += `
    ${property.name + (property.required ? '' : '?')}: ${property.type}`
                })

                code += `
`
            }

            if (value) { code += value }

            code += getEndSymbol()
        }

        return code
    }

    function getDeclarationSymbol(position: 'end' | 'start'): string | undefined {
        if (declarationSymbols.value && declarationSymbols.value[position]) {
            return declarationSymbols.value[position]
        }
    }

    function getEndSymbol(): string {
        return getDeclarationSymbol('end') ?? ''
    }

    function getStartSymbol(): string {
        return getDeclarationSymbol('start') ?? ''
    }

    function initDeclaration(
        {
            description,
            name,
            properties,
            props,
            requiredTypes,
            returnType,
            type,
            value
        }: InitDeclarationProps,
        indent: number = 0
    ): void {
        declaration.value = { description, name, properties, props, requiredTypes, returnType, type, value }
        codeSlots.value = ['typeScript']
        declarationSymbols.value = declarationsSymbols[type]

        const ps = parentsStores && parentsStores()

        if (!Array.isArray(ps)) {
            throw new Error('Prototype store requires TypeDeclarationStore and PropsDeclarationStore as parents')
        }

        const typesStore = ps[0]
        const propsStore = ps[1]

        getParentStoreMethod('addTypesToSeeFromParameters', typesStore)(properties)
        getParentStoreMethod('initProps', propsStore)(
            props,
            (prop: ParameterPrototype) => getParentStoreMethod('addTypesToSeeFromParameters', typesStore)(prop),
            indent
        )
        getParentStoreMethod('initTypes', typesStore)(declaration.value)

        if (typesNeedJsCode.includes(type)) {
            codeSlots.value.push('javascript')
        }
        if (returnType) { getParentStoreMethod('addTypesToSee', typesStore)(returnType) }
        if (value) { getParentStoreMethod('addTypesToSee', typesStore)(value) }
    }


    return {
        codeSlots,
        displayJsSlot,
        getCode,
        getEndSymbol,
        getStartSymbol,
        initDeclaration,
        parentsStores
    }
})()