import type { ComponentResume } from "~/types/components"
import { id as storeId, name, title as storeTitle } from '~/data/stores/useUserStore'
import { useStoreDescription, useStoreTitle } from "~/utils/create-resume"

const definition: ComponentResume = {
    description: useStoreDescription(name),
    id: storeId,
    title: useStoreTitle(storeTitle)
}

export const { description, id, title } = definition

export default definition