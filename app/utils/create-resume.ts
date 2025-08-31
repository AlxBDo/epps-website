import type { ComponentResume } from "~/types/components"
import type { PageResume } from "~/types/pages";

export const storeCreationDescription = (name: string) => `Create a ${name} Store`
export const storeCreationId = (id: string) => `${id}-creation`
export const storeCreationTitle = (title: string) => `${title} Store creation`
export const useStoreDescription = (name: string) => `Use ${name} Store in component`
export const useStoreId = (id: string) => `${id}-usage`
export const useStoreTitle = (title: string) => `Use ${title} Store`


type CreateResumeProps = { id: string, title: string, description?: string }
type CreatePageResumeProps = CreateResumeProps & { components: ComponentResume[], path: string }

export function createResume({ id, title, description }: CreateResumeProps): ComponentResume {
    return {
        id,
        title,
        description,
    }
}

export function createPageResume({
    components,
    id,
    path,
    title,
    description
}: CreatePageResumeProps): PageResume {
    return {
        ...createResume({ id, title, description }),
        components,
        path
    }
}

export function pathFromArray(paths: string[]): string {
    return paths.join('/')

}