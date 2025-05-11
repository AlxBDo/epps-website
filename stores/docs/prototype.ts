import type { CodeDeclarationTypes, FunctionReturn, ParameterPrototype, TypeRequired } from "~/types/components"
import type { PropsDeclarationState, PropsDeclarationStore } from "./propsDeclaration";
import type { TypeDeclarationState, TypeDeclarationStore } from "./typesDeclaration";

import { defineEppsStore, extendedState, getParentStoreMethod } from "epps";
import { usePropsDeclarationStore } from "./propsDeclaration";
import { useTypeDeclarationStore } from "./typesDeclaration";


interface InitDeclarationProps {
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
    getEndSymbol: () => string
    getParamsFormatted: (params: string, symbols?: SymbolsObject) => string
    getStartSymbol: () => string
    initDeclaration: ({ properties, props, requiredTypes, returnType, type, value }: InitDeclarationProps) => void
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
    const declarationSymbols = ref<SymbolsObject>()
    const { parentsStores } = extendedState([useTypeDeclarationStore(id), usePropsDeclarationStore(id)])


    function displayJsSlot(): boolean {
        return !!codeSlots.value?.includes('javascript')
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

    function initDeclaration({ properties, props, requiredTypes, returnType, type, value }: InitDeclarationProps): void {
        codeSlots.value = ['typeScript']
        declarationSymbols.value = declarationsSymbols[type]
        const ps = parentsStores && parentsStores()

        getParentStoreMethod('addTypesToSeeFromParameters', 0, ps)(properties)
        getParentStoreMethod('initProps', 1, ps)(props, (prop: ParameterPrototype) => getParentStoreMethod('addTypesToSeeFromParameters', 0)(prop))
        getParentStoreMethod('initRequiredType', 0, ps)(requiredTypes)

        if (typesNeedJsCode.includes(type)) {
            codeSlots.value.push('javascript')
        }
        if (returnType) { getParentStoreMethod('addTypesToSee', 0, ps)(returnType) }
        if (value) { getParentStoreMethod('addTypesToSee', 0, ps)(value) }
    }


    return {
        codeSlots,
        displayJsSlot,
        getEndSymbol,
        getStartSymbol,
        initDeclaration,
        parentsStores
    }
})()