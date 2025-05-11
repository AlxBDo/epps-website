import type { FunctionPrototype, ParameterPrototype } from "~/types/components"
import { getStoreDefinition } from "~/utils/store"


const addItemProps: ParameterPrototype[] = [
    { name: 'item', required: true, type: 'object' }
]
const addItem: FunctionPrototype = {
    description: 'Add new item to collection',
    name: 'addItem',
    props: addItemProps,
    returnType: 'void', type: 'function'
}

const getItemProps: ParameterPrototype[] = [
    {
        description: 'use any properties of the “item” object as selection criteria.',
        name: 'item',
        required: true,
        type: 'object'
    }
]
const getItem: FunctionPrototype = {
    description: 'Returns the element of the collection corresponding to the criteria passed in parameter.',
    name: 'getItem',
    props: getItemProps,
    returnType: 'object',
    type: 'function'
}

const getItemsProps: ParameterPrototype[] = [
    {
        description: 'Use any properties of the “item” object as selection criteria.',
        name: 'item',
        required: false,
        type: 'object'
    }
]
const getItems: FunctionPrototype = {
    description: 'Returns all items in the collection or those matching the criteria passed in parameter.',
    name: 'getItem',
    props: getItemsProps,
    returnType: 'object[]',
    type: 'function'
}

const removeItemProps: ParameterPrototype[] = [
    {
        description: 'Uses any properties of the “item” object to remove the corresponding item from the collection.',
        name: 'item',
        required: true,
        type: 'object'
    }
]
const removeItem: FunctionPrototype = {
    description: 'Remove an item of the collection.',
    name: 'removeItem',
    props: removeItemProps,
    returnType: 'void',
    type: 'function'
}

const setItemsProps: ParameterPrototype[] = [
    {
        description: 'Items collection',
        name: 'items',
        required: true,
        type: 'object[]'
    }
]
const setItems: FunctionPrototype = {
    description: 'Set items state property.',
    name: 'setItems',
    props: setItemsProps,
    returnType: 'void',
    type: 'function'
}

const updateItemProps: ParameterPrototype[] = [
    {
        description: 'Item (or partial item) updated',
        name: 'item',
        required: true,
        type: 'object'
    },
    {
        description: 'Item',
        name: 'oldItem',
        required: false,
        type: 'object'
    }
]
const updateItem: FunctionPrototype = {
    description: 'Update an item of the collection.',
    name: 'updateItem',
    props: updateItemProps,
    returnType: 'void',
    type: 'function'
}

const methods: FunctionPrototype[] = [
    addItem,
    getItem,
    getItems,
    removeItem,
    setItems,
    updateItem
]

const state: ParameterPrototype[] = [
    { name: 'item', required: true, type: 'array<object>' }
]

export const description = `useCollectionStore makes it easy to use object collections. 
It comes with the Epps plugin so you can extend it to your stores.`

const definition = getStoreDefinition('collection', state, methods)

export const { id, name, title, type } = definition

export default { ...definition, description }