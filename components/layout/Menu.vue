<script setup lang="ts">
import UNavigationMenu from '@nuxt/ui/components/NavigationMenu.vue'
import { pages } from '~/utils/pages/resumes'

import type { NavigationMenuItem } from '@nuxt/ui'
import type { ComponentResume } from '~/types/components'
import type { PageResume } from '~/types/pages'

function createChildren(children: ComponentResume[], path: string): NavigationMenuItem[] {
    return children.map((child) => {
        return {
            label: child.title,
            to: `/${path}?#${child.id}`,
        }
    })
}

function createItem(label: string, item: PageResume | Record<string, PageResume>, parent?: string): NavigationMenuItem {
    if (item?.path) {
        const { components, description, title } = item as PageResume
        return {
            children: createChildren(components as ComponentResume[], item.path as string),
            description,
            label: title,
            to: `/${item.path === '/' ? '' : item.path}`,
        }
    } else {
        const children = item as Record<string, PageResume>
        const to = parent ?? undefined
        const slot = parent === 'doc' ? 'docs' as const : undefined

        return {
            children: Object.keys(children).map((key: string) => createItem(key, children[key], parent ? `/${parent}/${key}` : key)),
            label,
            slot,
            to
        }
    }
}

const items = ref<NavigationMenuItem[]>(
    Object.keys(pages).map(
        (page: string) => createItem(page, pages[page] as PageResume | Record<string, PageResume>, page)
    )
)


function displayChildren(parent: NavigationMenuItem) {
    return Array.isArray(parent.children) && parent.label !== parent.children[0].label
}
</script>

<template>
    <UNavigationMenu class="w-full justify-center" :items="items">
        <template #docs-content="{ item }">
            <ul v-if="(item as NavigationMenuItem)?.children" class="flex flex-wrap">
                <li v-for="child in (item as NavigationMenuItem).children" :key="child.label" class="w-5/12 p-3">
                    <ULink class="text-left rounded-md transition-colors hover:bg-elevated/50" :to="child.to">
                        <p class="font-bold">
                            {{ child.label }}
                        </p>
                        <p class="text-muted line-clamp-2 text-xs">
                            {{ child.description }}
                        </p>
                    </ULink>
                    <ul v-if="displayChildren((child as NavigationMenuItem))" class="my-1 ml-3 mr-0 p-0">
                        <li v-for="c in (child as NavigationMenuItem).children" :key="c.label" class="m-0 mt-1 p-0">
                            <ULink :to="c.to">
                                <p class="font-bold text-xs text-left m-0 p-0">
                                    {{ c.label }}
                                </p>
                            </ULink>
                        </li>
                    </ul>
                </li>
            </ul>
        </template>
    </UNavigationMenu>
</template>