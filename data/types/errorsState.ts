import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype, TypeRequired } from "~/types/prototype";
import { createParameterPrototype, createTypeRequired } from "~/utils/components/code-declaration";


export const description: string = 'Represents errosStore state.'

export const name: string = 'ErrorsState'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('errors', 'TError[] | Error[]', true)
]

export const type: CodeDeclarationTypes = 'interface'

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('TError extends Error | Error', 'error definition')
]

export default {
    name,
    description,
    properties,
    requiredTypes,
    type
} as InterfacePrototype