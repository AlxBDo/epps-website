import type { FunctionPrototype, ParameterPrototype, StorePrototype, TypeRequired } from "~/types/prototype"
import { createTypeRequired } from "~/utils/components/code-declaration"
import { getStoreDefinition } from "~/utils/store"


const dataProps: ParameterPrototype[] = [
    { name: 'data', required: true, type: 'WebUserState' }
]
const setData: FunctionPrototype = {
    description: 'Set or update state properties: id, @id, password and username',
    name: 'setData',
    props: dataProps,
    returnType: 'void',
    type: 'function'
}

const methods: FunctionPrototype[] = [
    setData
]

const state: ParameterPrototype[] = [
    { name: 'password', required: false, type: 'string' },
    { name: 'username', required: false, type: 'string' }
]

export const actionsToExtends: string[] = ['setData']

export const description = `useWebUserStore represents a web user and has the properties username and password as 
well as id and @id (inherited from useResourceIdStore).`

const definition = getStoreDefinition('webUser', state, methods)

export const { id, name, title, type } = definition

export const idIsParam = true

export const isEppsStore = true

export const parentsStores: string[] = ['useResourceIdStore(id)']

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('WebUserStore', 'Defines the methods available in the store'),
    createTypeRequired('WebUserState', 'Defines the state properties of the store')
]


export default {
    ...definition,
    actionsToExtends,
    description,
    idIsParam,
    isEppsStore,
    parentsStores,
    requiredTypes
} as StorePrototype