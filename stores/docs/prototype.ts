import type { CodeDeclarationState, CodeDeclarationStore } from "./codeDeclarationExplanation";
import type { CodeDeclarationTypes, FunctionReturn, ParameterPrototype, TypeRequired } from "~/types/components"

import { defineEppsStore, extendedState, getParentStoreMethod } from "epps";
import { useCodeDeclarationExplanationStore } from "./codeDeclarationExplanation";
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

export interface PrototypeState extends CodeDeclarationState {
    codeSlots: string[]
    declarationSymbols: SymbolsObject
}

export interface PrototypeStore extends CodeDeclarationStore {
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
    const { parentsStores } = extendedState(
        [useCodeDeclarationExplanationStore(id)],
        { actionsToExtends: ['initDeclaration'] }
    )


    function displayJsSlot(): boolean {
        return !!codeSlots.value?.includes('javascript')
    }

    function getCode(lang: 'javascript' | 'typeScript' = 'typeScript'): string {
        let code: string = ''

        if (declaration.value) {
            const ps = parentsStores && parentsStores()

            if (!Array.isArray(ps)) {
                throw new Error('Prototype store requires CodeDeclarationExplanationStore as parent')
            }

            const codeDeclarationStore = ps[0]
            const { name, properties, returnType, type, value } = declaration.value

            code = `${type} ${name}`

            if (lang === 'typeScript') {
                code += getParentStoreMethod('requiredTypesToString', codeDeclarationStore)()
            }

            if (type === 'function') {
                code += getParentStoreMethod('propsToString', codeDeclarationStore)()
            }

            code += `${getParentStoreMethod('returnTypeFormatted', codeDeclarationStore)(returnType)} ${getStartSymbol()} `

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

        if (typesNeedJsCode.includes(type)) {
            codeSlots.value.push('javascript')
        }
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