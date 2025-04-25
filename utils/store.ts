import { capitalize } from "vue"
import type { Item } from "../models/item"


export function getStoreDefinition(name: string, description?: string) {
    const title = capitalize(name)

    return {
        id: `use${title}Store`,
        name,
        title,
        description: description ?? `Store for ${name}`
    }
}

export const itemState: Item = {
    '@id': undefined,
    id: undefined
}