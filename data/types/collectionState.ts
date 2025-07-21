import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype, TypeRequired } from "~/types/prototype";
import { createParameterPrototype, createTypeRequired } from "~/utils/components/code-declaration";


export const description: string = 'Represents collectionStore state.'

export const name: string = 'CollectionState'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('item', 'object[]', true)
]

export const type: CodeDeclarationTypes = 'interface'

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('T', 'item definition')
]

export default {
    name,
    description,
    properties,
    requiredTypes,
    type
} as InterfacePrototype