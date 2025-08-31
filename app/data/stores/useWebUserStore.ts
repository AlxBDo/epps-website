import type { FunctionPrototype, ParameterPrototype, StorePrototype, TypeRequired } from "~/types/prototype"
import type { ParentsStoresEppsOption } from "~/types/stores"
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

export const parentsStores: ParentsStoresEppsOption = [{ id: 'webUserId', name: 'useResourceIdStore' }]


export default {
    ...definition,
    actionsToExtends,
    description,
    idIsParam,
    isEppsStore,
    parentsStores,
    stateType: 'WebUserState',
    storeType: 'WebUserStore'
} as StorePrototype