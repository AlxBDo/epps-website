<script setup lang="ts">
import { capitalize } from 'vue'
import { isEmpty } from '~/utils/validation'

import Page from '~/components/common/Page.vue'
import PageLink from '~/components/pages/PageLink.vue'
import DynamicPage from '~/components/docs/common/Page.vue'

import type { AnyObject } from '~/types'
import type { PageDefinitionTypes, PageResume } from '~/types/pages'


const { error: errorPageDefinition, pages } = usePagesDefinitions()
const allowedSections = ['docs', 'examples']
const allowedTypes = ['class', 'functions', 'stores', 'types']
let length = 0
let tempPage: AnyObject = pages
let pageDefinition: PageResume | undefined

const route = useRoute()
const [section, type, name] = route.params.slug as unknown as string[]
const allowedPath = allowedSections.includes(section as string) && (!type || allowedTypes.includes(type) || type === section)

const pageFound = (allowedPath && Array.isArray(route.params.slug))
    && route.params.slug.reduce((found: boolean, param: string) => {
        param = param.charAt(0).toLowerCase() + param.substring(1)

        if (!found && tempPage[param]) {
            tempPage = tempPage[param]
            length++
            found = length === (route.params.slug as unknown as string[]).length && !!tempPage?.path

            if (tempPage?.components) {
                pageDefinition = tempPage as PageResume
            }
        }

        return found
    }, false)

if (!pageFound && !pageDefinition) {
    if (allowedPath && !isEmpty(tempPage)) {
        const titleSectionMapping: Record<string, string> = { docs: 'documentation', examples: 'examples' }
        const typeParam = type ?? 'summary'

        pageDefinition = {
            components: Object.keys(tempPage).map((page) => tempPage[page]),
            id: `${section}-${typeParam}`,
            path: `${section}/${typeParam}`,
            title: `${capitalize(typeParam)} ${titleSectionMapping[section as string]}`,
        }
    } else {
        pageDefinition = {
            ...errorPageDefinition,
            description: "You're in the wrong place.",
            title: `${errorPageDefinition.title} Page not found...`
        }
    }
}
</script>

<template>
    <Suspense>
        <Page v-if="!pageFound && pageDefinition" :definition="pageDefinition">
            <ul v-if="!isEmpty(pageDefinition.components)">
                <li v-for="(item, index) in (Object.keys(tempPage) as string[])" :key="`page-${item}-${index}`"
                    class="mb-6">
                    <PageLink v-if="tempPage[item].path" v-bind="tempPage[item]" />

                    <template v-else-if="typeof tempPage[item] === 'object' && !isEmpty(tempPage[item])">
                        <ULink :to="`${section}/${item}`">
                            <h4>{{ item }}</h4>
                        </ULink>

                        <ul class="pl-3">
                            <li v-for="(subitem, index) in (Object.keys(tempPage[item]) as string[])"
                                :key="`page-${item}-${index}`" class="mb-6">
                                <PageLink v-if="tempPage[item][subitem].path" v-bind="tempPage[item][subitem]" />
                            </li>
                        </ul>
                    </template>
                </li>
            </ul>
            <p v-else>{{ pageDefinition.description }}</p>
        </Page>
        <DynamicPage v-else :name="(name as string)" :type="(type as PageDefinitionTypes)" />
        <template #fallback>Loading</template>
    </Suspense>
</template>