import { isEmpty } from "~/utils/validation"

import type { AnyObject } from "epps";
import type { ParameterPrototype, TypeRequired, FunctionReturn } from "~/types/prototype";


export interface TypeDeclarationState {
    requiredTypes?: string
    returnType: string
    typesToSee: string[]
}

export interface TypeDeclarationStore {
    addTypesToSee: (type: string) => Promise<string>
    addTypesToSeeFromParameters: (params?: ParameterPrototype[]) => void
    hasTypesToSee: () => boolean
    initRequiredType: (declarationRequiredTypes?: TypeRequired[]) => void
    initTypes: (types: TypesProps) => void
    requiredTypesToString: () => Ref<string>
    returnTypeFormatted: (returnType?: FunctionReturn) => string
}

export interface TypesProps {
    properties?: ParameterPrototype[]
    requiredTypes?: TypeRequired[]
    returnType: string
    value?: string
}


export const useTypeDeclarationStore = (id: string) => defineStore(
    `${id}TypeDeclarationStore`,
    () => {
        const requiredTypes = ref<string>('')
        const returnType = ref<string>('')
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
            const pagesDef = usePagesDefinitions()
            const { pages } = pagesDef

            return types.reduce((acc: string[], type: string) => {
                if (type.indexOf('<') >= 0) {
                    type = type.split('<')[0] as string
                }

                if (type.indexOf('[') >= 0) {
                    type = type.replace('[]', '')
                }

                type = type.trim()

                if ((pages.docs as AnyObject).types[firstCharToLowerCase(type)]) {
                    acc.push(type)
                }

                return acc
            }, [])
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

        function hasTypesToSee(): boolean {
            return typesToSee.value.length > 0
        }

        function initRequiredType(declarationRequiredTypes?: TypeRequired[]): void {
            if (declarationRequiredTypes) {
                requiredTypes.value = declarationRequiredTypes.reduce((acc: string, curr: TypeRequired) => {
                    if (acc.length > 0) { acc += ', ' }

                    acc += curr.name
                    addTypesToSee(curr.name)

                    return acc
                }, '')
            }
        }

        function initTypes(types: TypesProps): void {
            if (!isEmpty(types.properties)) {
                addTypesToSeeFromParameters(types.properties)
            }

            if (!isEmpty(types.requiredTypes)) {
                initRequiredType(types.requiredTypes)
            }

            if (!isEmpty(types.returnType)) {
                addTypesToSee(types.returnType)
                returnType.value = types.returnType
            }

            if (!isEmpty(types.value)) {
                addTypesToSee(types.value as string)
            }
        }

        function requiredTypesToString(): string {
            if (requiredTypes.value) {
                return `<${requiredTypes.value}>`
            }

            return ''
        }

        function returnTypeFormatted(returnType?: FunctionReturn): string {
            if (!returnType) return ''

            return `: ${returnType}`
        }


        return {
            addTypesToSee,
            addTypesToSeeFromParameters,
            hasTypesToSee,
            initRequiredType,
            initTypes,
            requiredTypes,
            requiredTypesToString,
            returnType,
            returnTypeFormatted,
            typesToSee
        }
    })()