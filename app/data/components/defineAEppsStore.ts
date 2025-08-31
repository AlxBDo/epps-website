import type { ComponentResume } from "~/types/components"
import { description, name } from "../stores/useUserStore"


const definition: ComponentResume = { description, id: name, title: 'Define a EppsStore' }

export default definition