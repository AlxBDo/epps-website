import type { ComponentResume } from "~/types/components"
import { description, name } from "../stores/useUserStore"


const definition: ComponentResume = { description, id: `use-${name}`, title: 'Use a EppsStore in a component' }

export default definition