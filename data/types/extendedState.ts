import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines the structure of the extended state returned by the extendedState function.'

export const name: string = 'ExtendedState'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('actionsToExtends', 'string[] | Ref<string[] | undefined>', false),
    createParameterPrototype('isExtended', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('isOptionApi', 'boolean | Ref<boolean | undefined>', false),
    createParameterPrototype('parentsStores', '() => Store[] | EppsStore<AnyObject, AnyObject>[]', false),
    createParameterPrototype('excludedKeys', 'string[] | Ref<string[]>', false),
    createParameterPrototype('isEncrypted', 'boolean | Ref<boolean | undefined>', false),
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