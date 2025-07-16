import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines methods of a persisted store.'

export const name: string = 'PersistedStore'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('persistState', '() => void', true),
    createParameterPrototype('remember', '() => Promise<void>', true),
    createParameterPrototype('removePersistedState', '() => void', true),
    createParameterPrototype('stateIsEmpty', '() => boolean', false),
    createParameterPrototype('stopWatch', '() => void', false),
    createParameterPrototype('watch', '() => void', false),
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype