import type { CodeDeclarationTypes, TypePrototype, TypeRequired } from "~/types/prototype";
import { createTypeRequired } from "~/utils/components/code-declaration";


export const description: string = 'Extented store type'

export const name: string = 'ExtendedStore'

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('StoreMethods', 'Defines the methods available in the store'),
    createTypeRequired('StateProperties', 'Defines the state properties of the store')
]

export const type: CodeDeclarationTypes = 'type'

export const value: string = 'StoreMethods & StateProperties & CustomStore'

export default {
    name,
    description,
    requiredTypes,
    type,
    value
} as TypePrototype