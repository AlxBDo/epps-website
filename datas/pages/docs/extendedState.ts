import { extendedState as extendedStateComponent } from "~/utils/components/resumes"
import extendedStateDefinition from "~/datas/components/extendedState"
import { extendedState as extendedStatePath } from "../paths";


export const components = [extendedStateComponent]

export const { description, id, title } = extendedStateDefinition

export const path = extendedStatePath

export default {
    components,
    description,
    id,
    path,
    title
}