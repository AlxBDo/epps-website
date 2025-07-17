import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Represents useWebUserStore methods.'

export const name: string = 'WebUserStore'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('setData', '(WebUserState) => void', false),
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype