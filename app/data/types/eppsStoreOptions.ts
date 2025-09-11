import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines the optional configuration for Epps Store.'

export const name: string = 'EppsStoreOptions'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('actionsToExtends', 'string[]', false),
    createParameterPrototype('actionsToRename', '{ [key: string]: string }', false),
    createParameterPrototype('parentsStores', 'ParentStore[]', false),
    createParameterPrototype('persist', 'persistStoreOptions', false),
    createParameterPrototype('propertiesToRename', '{ [key: string]: string }', false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype