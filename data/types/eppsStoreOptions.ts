import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines the optional configuration for Epps Store.'

export const name: string = 'EppsStoreOptions'

const persistDefinition = ` {
        dbName?: string,
        excludedKeys?: string[],
        persist?: boolean,
        persistedPropertiesToEncrypt?: string[],
        watchMutation?: boolean
    }`

export const properties: ParameterPrototype[] = [
    createParameterPrototype('actionsToExtends', 'string[]', false),
    createParameterPrototype('parentsStores', 'ParentStore[]', false),
    createParameterPrototype('persist', 'persistStoreOptions', false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype