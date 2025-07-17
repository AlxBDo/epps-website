import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Represents useWebUserStore state.'

export const name: string = 'WebUserState'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('id', 'string', false),
    createParameterPrototype('@id', 'string', false),
    createParameterPrototype('password', 'string', false),
    createParameterPrototype('username', 'string', false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype