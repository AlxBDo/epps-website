import type { ComponentResume } from "~/types/components"
import { id as storeId, name, title as storeTitle } from '~/data/stores/useListsStore'
import { storeCreationDescription, storeCreationTitle } from "~/utils/create-resume"

const definition: ComponentResume = {
    description: storeCreationDescription(name),
    id: storeId,
    title: storeCreationTitle(storeTitle)
}

export const { description, id, title } = definition

export default definition