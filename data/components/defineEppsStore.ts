import type { ComponentResume } from "~/types/components"
import { description, name } from "../functions/defineEppsStore"
import { capitalize } from "vue"


const definition: ComponentResume = { description, id: name, title: capitalize(name) }

export default definition