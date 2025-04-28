import type { AnyObject } from "~/types"
import type { CodeDeclarationTypes, FunctionReturn, ParameterPrototype, TypeRequired } from "~/types/components"
import { pages } from "~/utils/pages/resumes"
import { isEmpty } from "~/utils/validation"


interface InitDeclarationProps {
    properties?: ParameterPrototype[]
    props?: ParameterPrototype[]
    requiredTypes?: TypeRequired[]
    returnType?: FunctionReturn
    type: CodeDeclarationTypes
    value?: string
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

const paramsSymbols: DeclarationSymbols = {
    function: symbolsObject('(', ')'),
    type: symbolsObject('<', '>')
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


export const usePrototypeStore = (id: string) => defineStore(`${id}PrototypeStore`, () => {
    const codeSlots = ref<string[]>()
    const declarationSymbols = ref<SymbolsObject>()
    const propsString = ref<string>('')
    const requiredTypesString = ref<string>('')
    const typesToSee: Ref<string[]> = ref([])


    function addTypesToSee(type: string): string {
        const types = extractTypesFromString(type)

        if (!isEmpty(types)) {
            types.forEach(type => !typesToSee.value.includes(type) && typesToSee.value.push(type))
        }

        return type
    }

    function addTypesToSeeFromParameters(params?: ParameterPrototype[]): void {
        if (!isEmpty(params)) {
            params?.forEach((param: ParameterPrototype) => addTypesToSee(param.type))
        }
    }

    function cleanTypesToSee(types: string[]): string[] {
        return types.reduce((acc: string[], type: string) => {
            if (type.indexOf('<') >= 0) {
                type = type.split('<')[0]
            }

            if (type.indexOf('[') >= 0) {
                type = type.replace('[]', '')
            }

            type = type.trim()

            if ((pages.doc as AnyObject).types[firstCharToLowerCase(type)]) {
                acc.push(type)
            }

            return acc
        }, [])
    }

    function displayJsSlot(): boolean {
        return !!codeSlots.value?.includes('javascript')
    }

    function extractTypesFromString(str: string): string[] {
        let types: string[] = []

        if (!isEmpty(str)) {
            if (str.indexOf('|') >= 0 || str.indexOf('&') >= 0) {
                types = str.split(/[|&]/)
            } else {
                types.push(str)
            }
        }

        return cleanTypesToSee(types)
    }

    function getDeclarationSymbol(position: 'end' | 'start'): string | undefined {
        if (declarationSymbols.value && declarationSymbols.value[position]) {
            return declarationSymbols.value[position]
        }
    }

    function getEndSymbol(): string {
        return getDeclarationSymbol('end') ?? ''
    }

    function getParamsFormatted(params: string, symbols?: SymbolsObject) {
        if (symbols) {
            return `${symbols.start}${params}${symbols?.end ?? ''}`
        }

        return params
    }

    function getStartSymbol(): string {
        return getDeclarationSymbol('start') ?? ''
    }

    function hasTypesToSee(): boolean {
        return typesToSee.value.length > 0
    }

    function initDeclaration({ properties, props, requiredTypes, returnType, type, value }: InitDeclarationProps): void {
        codeSlots.value = ['typeScript']
        typesToSee.value = []

        addTypesToSeeFromParameters(properties)
        addTypesToSeeFromParameters(props)
        initProps(props)
        initRequiredType(type, requiredTypes)

        if (typesNeedJsCode.includes(type)) {
            codeSlots.value.push('javascript')
        }
        if (returnType) { addTypesToSee(returnType) }
        if (value) { addTypesToSee(value) }
    }

    function initProps(props?: ParameterPrototype[]): void {
        if (props && !isEmpty(props)) {
            const propsLength = props.length
            const rtn = propsLength > 1 ? '\r\n' : ''
            let index = 0

            propsString.value = getParamsFormatted(
                props.reduce((acc: string, curr: ParameterPrototype) => {
                    if (acc.length > 0) {
                        acc += ', ' + rtn + '   '
                    } else if (propsLength > 1) {
                        acc += rtn + '   '
                    }

                    acc += `${curr.name}: ${curr.type}`

                    addTypesToSee(curr.type)
                    index++

                    if (propsLength === index) {
                        acc += rtn
                    }

                    return acc
                }, ''),
                paramsSymbols.function
            )
        }
    }

    function initRequiredType(type: CodeDeclarationTypes, requiredTypes?: TypeRequired[]) {
        if (!isEmpty(requiredTypes) && requiredTypes) {
            declarationSymbols.value = declarationsSymbols[type]

            requiredTypesString.value = getParamsFormatted(
                requiredTypes.reduce((acc: string, curr: TypeRequired) => {
                    if (acc.length > 0) { acc += ', ' }

                    acc += curr.name
                    addTypesToSee(curr.name)

                    return acc
                }, ''),
                paramsSymbols.type
            )
        }
    }

    function propsToString(): Ref<string> {
        return propsString
    }

    function requiredTypesToString(): Ref<string> {
        return requiredTypesString
    }

    function returnTypeFormatted(returnType?: FunctionReturn) {
        if (!returnType) return ''

        addTypesToSee(returnType)

        return `: ${returnType}`
    }


    return {
        codeSlots,
        displayJsSlot,
        getEndSymbol,
        getStartSymbol,
        hasTypesToSee,
        initDeclaration,
        propsToString,
        requiredTypesToString,
        returnTypeFormatted,
        typesToSee
    }
})()