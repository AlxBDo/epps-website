import { getStoreDefinition } from "~/utils/store"


const definition = getStoreDefinition('user')

export const { description, id, name, title } = definition

export default definition

