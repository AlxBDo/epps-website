import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Represents the identifiers of a resource extracted from a database or API.'

export const name: string = 'ResourceId'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('id', 'number | string', false),
    createParameterPrototype('@id', 'string', false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype