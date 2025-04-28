import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/components";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines the structure of a persisted state.'

export const name: string = 'PersistedState'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('excludedKeys', 'string[] | Ref<string[] | undefined>', false),
    createParameterPrototype('isEncrypted', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('isLoading', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('persist', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('persistedPropertiesToEncrypt', 'string[] | Ref<string[] | undefined>', false),
    createParameterPrototype('watchMutation', 'boolean | Ref<boolean | undefined>', false),
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype