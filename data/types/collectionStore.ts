import type { CodeDeclarationTypes, InterfacePrototype, ParameterPrototype } from "~/types/prototype";
import { createParameterPrototype } from "~/utils/components/code-declaration";


export const description: string = 'Represents collectionStore methods.'

export const name: string = 'CollectionStore'

export const properties: ParameterPrototype[] = [
    createParameterPrototype('addItem', '(item: object) => void', false),
    createParameterPrototype('clear', '() => void', false),
    createParameterPrototype('getItem', '(criteria: object) => object | undefined', false),
    createParameterPrototype('getItems', '(criteria?: object) => object[]', false),
    createParameterPrototype('removeItem', '(item: object) => void', false),
    createParameterPrototype('setItems', '(item: object[]) => void', false),
    createParameterPrototype('updateItem', '(newItem: object, oldIem: object) => void', false)
]

export const type: CodeDeclarationTypes = 'interface'

export default {
    name,
    description,
    properties,
    type
} as InterfacePrototype