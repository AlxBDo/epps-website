import type { AnyObject, CollectionState, Comparison } from "epps"

function getItemCriteria(item: AnyObject) {
    return item.id ? { id: item.id } : { '@id': item['@id'] }
}

export const usePiniaListsStore = (id?: string) => defineStore(id ?? 'collectionStore', {
    state: (): CollectionState<AnyObject> => ({
        items: []
    }),

    actions: {
        addItem(item: AnyObject) {
            let foundedItem: AnyObject | undefined

            if (item.id || item['@id']) {
                foundedItem = this.getItem(
                    getItemCriteria(item)
                )

                if (foundedItem) {
                    this.updateItem(item, foundedItem)
                    return
                }
            }

            this.items.push(item)
        },

        clear() {
            this.items = []
        },

        getItem(criteria: Partial<AnyObject>): AnyObject | undefined {
            return arrayObjectFindBy<AnyObject>(
                this.items as AnyObject[],
                criteria
            )
        },

        getItems(criteria?: Partial<AnyObject>,): AnyObject[] {
            if (!criteria) {
                return this.items
            }

            return arrayObjectFindAllBy<AnyObject>(
                this.items as AnyObject[],
                criteria,
                true
            )
        },

        removeItem(item: AnyObject) {
            this.items = this.items.filter((i: AnyObject) => i.id !== item.id)
        },

        setItems<T>(items: T[]) {
            if (Array.isArray(items)) {
                this.items = items as AnyObject[]
            }
        },

        updateItem(updatedItem: AnyObject, oldItem?: AnyObject) {
            if (!oldItem) {
                oldItem = this.getItem(getItemCriteria(updatedItem))
            }

            if (oldItem) {
                Object.assign(oldItem, updatedItem)
            }
        }
    }
})()