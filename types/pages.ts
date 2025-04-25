import type { ComponentResume } from "~/types/components";


export interface PageResume extends ComponentResume {
    components: ComponentResume[],
    path: string
}


export type PageDefinitionTypes = 'class' | 'functions' | 'types'

export type PageOfPagesResumes = Record<string, Record<string, PageResume> | PageResume>
export type PagesResumes = Record<string, PageOfPagesResumes | PageResume>