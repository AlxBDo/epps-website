import type { FunctionPrototype, ParameterPrototype, StorePrototype } from "~/types/prototype"
import { getStoreDefinition } from "~/utils/store"


const dataProps: ParameterPrototype[] = [
    { name: 'data', required: true, type: 'ResourceId' }
]
const setData: FunctionPrototype = {
    description: 'Set or update state properties: id and @id',
    name: 'setData',
    props: dataProps,
    returnType: 'void',
    type: 'function'
}

const methods: FunctionPrototype[] = [
    setData
]

const state: ParameterPrototype[] = [
    { name: 'id', required: false, type: 'string | number' },
    { name: '@id', required: false, type: 'string' }
]

export const description = `UseResourceIdStore to benefit from the id and @id properties, as well as the setData method. 
This store is useful for creating stores representing resources extracted from a database or API.`

const definition = getStoreDefinition('resourceId', state, methods)

export const { id, name, title, type } = definition

export default { ...definition, description, isEppsStore: false } as StorePrototype