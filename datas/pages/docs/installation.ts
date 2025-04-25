import { configurePlugin, installPlugin } from "~/utils/components/resumes";
import { installation as installationPath } from "../paths"


export const components = [configurePlugin, installPlugin]

export const description = 'Install Epps package and configure the plugin'

export const id = 'install'

export const path = installationPath

export const title = 'Installation'

export default {
    components,
    description,
    id,
    path,
    title
}