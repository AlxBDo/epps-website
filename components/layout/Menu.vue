<script setup lang="ts">
import { usePagesDefinitions } from '~/composables/pagesDefinitions'

import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import type { ComponentResume } from '~/types/components'
import type { PageResume } from '~/types/pages'

import UNavigationMenu from '@nuxt/ui/components/NavigationMenu.vue'
import { isEmpty } from '~/utils/validation'


const { pages } = usePagesDefinitions()

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
        const slot = parent === 'docs' ? 'docs' as const : undefined

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
        (page: string) => createItem((pages[page]?.title as string) ?? page, pages[page] as PageResume | Record<string, PageResume>, page)
    )
)


function displayChildren(parent: NavigationMenuItem) {
    return Array.isArray(parent.children)
}

function menuDescription(menu: NavigationMenuItem): string {
    const descriptionFromLabel: Record<string, string> = {
        functions: 'Functions provided with the plugin to make it easy to use',
        stores: 'Stores provided by the plugin and to be extended in your stores',
        types: 'Types and interfaces required to use the plugin with TypeScript.'
    }

    if (!menu?.description && menu.label) {
        return descriptionFromLabel[menu.label] ?? ''
    }

    return menu?.description
}

function menuLabel(menu: NavigationMenuItem): string {
    if (!menu?.description) {
        return `Epps ${menu.label}`
    }

    return menu.label as string
}
</script>

<template>
    <UDropdownMenu class="md:hidden" :items="(items as DropdownMenuItem[])">
        <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>
    <UNavigationMenu class="w-full justify-center hidden md:flex" :items="items">
        <template #docs-content="{ item }">
            <ul v-if="(item as NavigationMenuItem)?.children" class="flex flex-wrap">
                <li v-for="child in (item as NavigationMenuItem).children" :key="child.label" class="w-5/12 p-3">
                    <ULink class="text-left rounded-md transition-colors hover:bg-elevated/50" :to="child.to">
                        <p class="font-bold">
                            {{ menuLabel(child) }}
                        </p>
                        <p class="text-muted line-clamp-2 text-xs">
                            {{ menuDescription(child) }}
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