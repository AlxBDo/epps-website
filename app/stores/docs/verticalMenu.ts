import { defineEppsStore, ParentStore, useCollectionStore, type CollectionState, type CollectionStoreMethods } from "epps";
import type { ComponentResume } from "~/types/components";

export interface VerticalMenuStore extends Omit<CollectionStoreMethods, 'addItem' | 'setItems'> {
    addItem: (item: string) => void
    setItems: (items: ComponentResume[]) => void
}

interface VerticalMenuItem {
    id: string
    label: string
    to: string
}

function createItem(item: string): VerticalMenuItem {
    return { id: item, label: item, to: `#${item.toLowerCase()}` }
}

export const useVerticalMenuStore = defineEppsStore<VerticalMenuStore, CollectionState<VerticalMenuItem>>(
    'verticalMenuStore',
    () => ({
        beforeAddItem(args: string[] | object[]): void {
            if (typeof args[0] === 'string') {
                args[0] = createItem(args[0])
            }
        },
        beforeSetItems(params: Array<ComponentResume[] | VerticalMenuItem[]>): void {
            const items = params[0]

            if (Array.isArray(items)) {
                params[0] = (items as ComponentResume[]).map((item) => ({ label: item.title, to: `#${item.id}` })) as VerticalMenuItem[]
            }
        }
    }),
    {
        actionFlows: { addItem: { before: 'beforeAddItem' }, setItems: { before: 'beforeSetItems' } },
        parentsStores: [new ParentStore('verticalMenuItem', useCollectionStore)]
    }
)