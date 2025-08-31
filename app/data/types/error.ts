import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Represents an error.'

export const name: string = 'Error'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('id', 'string', true),
    createParameterPrototype('level', 'number', false),
    createParameterPrototype('message', 'string', true)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype