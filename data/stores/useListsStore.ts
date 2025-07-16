import { getStoreDefinition } from "~/utils/store"


const definition = getStoreDefinition('lists')

export const { description, id, name, title } = definition

export default { ...definition, isEppsStore: false }

