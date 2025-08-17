import type { CodeDeclarationTypes, TypePrototype, TypeRequired } from "~/types/prototype";
import { createTypeRequired } from "~/utils/components/code-declaration";


export const description: string = 'Extented and persisted store type'

export const name: string = 'EppsStore'

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('StoreMethods', 'Defines methods available in the store'),
    createTypeRequired('StateProperties', 'Defines state properties of the store')
]

export const type: CodeDeclarationTypes = 'type'

export const value: string = 'ExtendedStore<TStore, TState> & PersistedState & PersistedStore'

export default {
    name,
    description,
    requiredTypes,
    type,
    value
} as TypePrototype