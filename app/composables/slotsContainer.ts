import type { SlotCtn } from "~/types/components"
import { isEmpty } from "~/utils/validation"

export interface UseSlotsContainerOptions {
    displayByDefault: number
    numberDisplay: number
    groups: string[]
}

const defaultOptions: UseSlotsContainerOptions = {
    displayByDefault: 0,
    numberDisplay: 1,
    groups: [],
}

export function useSlotsContainer(slots: SlotCtn[], options?: Partial<UseSlotsContainerOptions>) {
    const { displayByDefault, numberDisplay, groups } = { ...defaultOptions, ...(options ?? {}) }

    if (numberDisplay > 1 && numberDisplay !== slots.length && isEmpty(groups)) {
        throw new Error(
            `The number of slots (${slots.length}) is different from the number of slots to display (${numberDisplay}).`
        )
    }

    const slotsNames = slots.map((slot) => slot.name)

    const selections = isEmpty(groups) ? slotsNames : groups

    const selectedSlot = ref<number>(displayByDefault ?? 0)

    function display(index: number): boolean {
        const selected = selectedSlot.value * numberDisplay
        return index >= selected && index < (selected + numberDisplay)
    }

    function setSelectedSlot(index: number): void {
        selectedSlot.value = index
    }

    return {
        display,
        displayByDefault,
        groups,
        numberDisplay,
        setSelectedSlot,
        slots,
        slotsNames,
        selections,
        selectedSlot
    }
}