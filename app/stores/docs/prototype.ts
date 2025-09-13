import type { CodeDeclarationState, CodeDeclarationStore } from "./codeDeclarationExplanation";
import type { CodeDeclarationTypes, FunctionPrototype, FunctionReturn, ParameterPrototype, TypeRequired } from "~/types/prototype"

import { defineEppsStore, getEppsStore, ParentStore, type EppsStore } from "epps";
import { isEmpty } from "~/utils/validation";
import { useCodeDeclarationExplanationStore } from "./codeDeclarationExplanation";


interface InitDeclarationProps {
    constructorProps?: ParameterPrototype[]
    description?: string
    methods?: FunctionPrototype[]
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

type SymbolsObject = { start: string, end?: string }


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


    function displayJsSlot(): boolean {
        return !!codeSlots.value?.includes('javascript')
    }

    function getCode(lang: 'javascript' | 'typeScript' = 'typeScript'): string {
        let code: string = ''

        if (declaration.value) {
            const codeDeclarationStore = getEppsStore<CodeDeclarationStore, CodeDeclarationState>(`${id}PrototypeStore`)
            const { methods, name, properties, returnType, type, value } = declaration.value

            code = `${type} ${name}`

            if (lang === 'typeScript') {
                code += codeDeclarationStore?.requiredTypesToString()
            }

            if (type === 'function') {
                code += codeDeclarationStore?.propsToString()
            }

            code += `${codeDeclarationStore?.returnTypeFormatted(returnType)} ${getStartSymbol()} `

            if (type === 'class') {
                code += `
    constructor${codeDeclarationStore?.propsToString()}: void`
            }

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

            if (!isEmpty(methods)) {
                code += methods?.reduce((acc: string, curr: FunctionPrototype) => {
                    const prototypeStore = usePrototypeStore(curr.name) as EppsStore<PrototypeStore, PrototypeState>
                    prototypeStore.initDeclaration(curr as FunctionPrototype)
                    prototypeStore.initProps((curr as FunctionPrototype).props, undefined, 2)

                    acc += `

${indent(curr.name, 1)}`
                    if (lang === 'typeScript') {
                        acc += prototypeStore.requiredTypesToString()
                    }

                    acc += `${prototypeStore.propsToString()}: ${(curr as FunctionPrototype)?.returnType}`
                    return acc
                }, '')

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
            constructorProps,
            description,
            methods,
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
        declaration.value = {
            constructorProps,
            description,
            methods,
            name,
            properties,
            props,
            requiredTypes,
            returnType,
            type,
            value
        }
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
        initDeclaration
    }
},
    {
        actionsToExtends: ['initDeclaration'],
        parentsStores: [new ParentStore('prototype', useCodeDeclarationExplanationStore)]
    }
)()