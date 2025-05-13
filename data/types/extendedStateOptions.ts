import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/components";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines the optional configuration for the "extendedState" function.'

export const name: string = 'ExtendedStateOptions'

const persistDefinition = ` {
        excludedKeys?: string[] | Ref<string[]>;
        isEncrypted?: boolean | Ref<boolean>;
        persist?: boolean | Ref<boolean>;
        persistedPropertiesToEncrypt?: string[] | Ref<string[]>;
        watchMutation?: boolean | Ref<boolean>;
    }`

export const properties: ParameterPrototype[] = [
    createParameterPrototype('actionsToExtends', 'string[] | Ref<string[] | undefined>', false),
    createParameterPrototype('isExtended', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('isOptionApi', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('persist', persistDefinition, false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype