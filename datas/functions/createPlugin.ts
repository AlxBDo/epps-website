import type { CodeDeclarationTypes, ParameterPrototype, FunctionReturn, TypeRequired } from "~/types/components";
import { createParameterPrototype } from "~/utils/components/code-declaration";


const cryptoJsParameterDescription = (name: string) => `Alpha-numeric string defining crypto-js parameter "${name}" (see package dependencies).
Necessary for State data encryption.`

const dbNameDescription = `Name of the database used to persist State data. 
Set value to “localStorage” to use window.localStorage. 
All other values will be used to define the name of the IndexedDb ObjectStore.`

export const description: string = 'Allows you to configure the Epps plugin and add it to Pinia.'

export const name: string = 'createPlugin'

export const props: ParameterPrototype[] = [
    createParameterPrototype('dbName', 'string', true, dbNameDescription),
    createParameterPrototype('cryptIv', 'string', false, cryptoJsParameterDescription('iv')),
    createParameterPrototype('cryptKey', 'string', false, cryptoJsParameterDescription('key'))
]

export const requiredTypes: TypeRequired[] = []

export const returnType: FunctionReturn = 'PiniaPlugin'

export const type: CodeDeclarationTypes = 'function'

export default {
    name,
    description,
    props,
    requiredTypes,
    returnType,
    type
}