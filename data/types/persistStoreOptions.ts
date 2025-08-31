import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Defines persisted store options. The “persist” property will automatically have the value “true” if at least one of the properties is defined.'

export const name: string = 'PersistStoreOptions'

const dbNameDescription = 'The name of the database can be “localStorage,” “sessionStorage,” or any other name to use IndexedDb.'
const excludedKeysDescription = 'List of State properties that should not persist.'
const persistDescription = 'If the value is “true,” the Epps plugin will add the properties and methods necessary for its persistence to the Store. This option does not automatically persist changes to the State and requires calling the persistState method.'
const persistedPropertiesToEncryptDescription = 'List of State properties that should encrypt.'
const watchMutationDescription = 'If the value is “true,” changes to the State will be automatically persisted.'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('dbName', 'string', false, dbNameDescription),
    createParameterPrototype('excludedKeys', 'string[]', false, excludedKeysDescription),
    createParameterPrototype('persist', 'boolean>', false, persistDescription),
    createParameterPrototype('persistedPropertiesToEncrypt', 'string[]', false, persistedPropertiesToEncryptDescription),
    createParameterPrototype('watchMutation', 'boolean>', false, watchMutationDescription),
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype