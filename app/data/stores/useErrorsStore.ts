import type { FunctionPrototype, ParameterPrototype, StorePrototype, TypeRequired } from "~/types/prototype"
import type { ParentsStoresEppsOption } from "~/types/stores"
import { createTypeRequired } from "~/utils/components/code-declaration"
import { getStoreDefinition } from "~/utils/store"


const addErrorProps: ParameterPrototype[] = [
    { name: 'error', required: true, type: 'TError | Error' }
]
const addError: FunctionPrototype = {
    description: 'Add an error',
    name: 'addError',
    props: addErrorProps,
    returnType: 'void',
    type: 'function'
}

const clearErrors: FunctionPrototype = {
    description: 'Remove all errors',
    name: 'clearErrors',
    returnType: 'void',
    type: 'function'
}

const getErrorProps: ParameterPrototype[] = [
    { name: 'criteria', required: true, type: 'Partial<TError | Error>' }
]
const getError: FunctionPrototype = {
    description: 'Get an error',
    name: 'getError',
    props: getErrorProps,
    returnType: 'TError | Error',
    type: 'function'
}

const getErrors: FunctionPrototype = {
    description: 'Get errors',
    name: 'getErrors',
    props: getErrorProps,
    returnType: 'TError[] | Error',
    type: 'function'
}

const hasErrorProps: ParameterPrototype[] = [
    { description: 'Minimum level of errors to be identified', name: 'level', required: true, type: 'number' }
]
const hasError: FunctionPrototype = {
    description: 'Indicates the presence of errors with a level equal to or greater than that of the parameter',
    name: 'hasError',
    props: hasErrorProps,
    returnType: 'boolean',
    type: 'function'
}

const removeError: FunctionPrototype = {
    description: 'Deletes the errors(s) corresponding to the criterion.',
    name: 'removeError',
    props: getErrorProps,
    returnType: 'TError | Error',
    type: 'function'
}


const methods: FunctionPrototype[] = [
    addError,
    clearErrors,
    getError,
    getErrors,
    hasError,
    removeError
]

const state: ParameterPrototype[] = [
    { name: 'errors', required: false, type: 'TErrors[] | Errors[]' }
]

export const description = `useErrorsStore represents a collection of errors and the basic actions 
for selecting or deleting them. 

You can customize the error type by creating an interface extending Error and passing it as a parameter 
to useErrorStore (example: useErrorStore<FormError>(‘formsError’) ).`

const definition = getStoreDefinition('errors', state, methods)

export const { id, name, title, type } = definition

export const idIsParam = true

export const isEppsStore = true

export const parentsStores: ParentsStoresEppsOption = [{ id: 'errorCollection', name: 'useCollectionStore' }]

export const requiredTypes: TypeRequired[] = [
    createTypeRequired('TError | Error', 'Optional - custom error type')
]


export default {
    ...definition,
    description,
    idIsParam,
    isEppsStore,
    parentsStores,
    requiredTypes,
    stateType: 'ErrorsState',
    storeType: 'ErrorsStore'
} as StorePrototype