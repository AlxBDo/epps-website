import { isEmpty } from "~/utils/validation";
import { pages } from "~/utils/pages/resumes";

import type { AnyObject } from "epps";
import type { CodeDeclarationTypes, CodeDeclarationPrototype, ParameterPrototype, TypeRequired, FunctionReturn } from "~/types/components";


interface Prototype extends CodeDeclarationPrototype {
    properties?: ParameterPrototype[]
    props?: ParameterPrototype[]
    requiredTypes?: TypeRequired[]
    returnType?: string
    value?: string
}

export const useCodeDeclarationExplanationStore = defineStore('codeDeclarationExplanantionStore', () => {
    const description = ref<string>('')
    const name = ref<string>('')
    const props = ref<string>('')
    const propsExplanation = ref<Record<string, string>>({})
    const requiredTypes = ref<string>('')
    const returnType = ref<string>('')
    const type = ref<CodeDeclarationTypes>()
    const typesToSee: Ref<string[]> = ref([])
    const value = ref<string>('')


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

    function createParameterExplanation(parameter: ParameterPrototype): void {
        if (parameter.description) {
            propsExplanation.value[parameter.name] = parameter.description
        }
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

    function hasPropsExplanation(): boolean {
        return !isEmpty(propsExplanation.value)
    }

    function hasTypesToSee(): boolean {
        return typesToSee.value.length > 0
    }

    function initDeclaration(prototype: Prototype): void {
        addTypesToSeeFromParameters(prototype.properties)
        initProps(prototype.props)
        initRequiredType(prototype.requiredTypes)

        if (prototype.returnType) { addTypesToSee(prototype.returnType) }
        if (prototype.value) { addTypesToSee(prototype.value) }
    }

    function initProps(declarationProps?: ParameterPrototype[]): void {
        if (declarationProps && !isEmpty(declarationProps)) {
            const declarationPropsLength = declarationProps.length
            const rtn = declarationPropsLength > 1 ? '\r\n' : ''
            let index = 0

            props.value = declarationProps.reduce((acc: string, curr: ParameterPrototype) => {
                if (acc.length > 0) {
                    acc += ', ' + rtn + '   '
                } else if (declarationPropsLength > 1) {
                    acc += rtn + '   '
                }

                acc += `${curr.name}: ${curr.type}`

                addTypesToSee(curr.type)
                createParameterExplanation(curr)
                index++

                if (declarationPropsLength === index) {
                    acc += rtn
                }

                return acc
            }, '')
        }
    }

    function initRequiredType(declarationRequiredTypes?: TypeRequired[]) {
        if (declarationRequiredTypes) {
            requiredTypes.value = declarationRequiredTypes.reduce((acc: string, curr: TypeRequired) => {
                if (acc.length > 0) { acc += ', ' }

                acc += curr.name
                addTypesToSee(curr.name)

                return acc
            }, '')
        }
    }

    function propsToString(): Ref<string> {
        return props
    }

    function requiredTypesToString(): Ref<string> {
        return requiredTypes
    }

    function returnTypeFormatted(returnType?: FunctionReturn) {
        if (!returnType) return ''

        return `: ${returnType}`
    }


    return {
        hasPropsExplanation,
        hasTypesToSee,
        initDeclaration,
        propsExplanation,
        propsToString,
        requiredTypesToString,
        returnTypeFormatted,
        typesToSee
    }
})