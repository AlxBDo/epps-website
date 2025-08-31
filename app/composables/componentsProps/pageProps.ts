import type { PageResume } from "~/types/pages";

export function usePageProps() {
    return {
        definition: {
            type: Object as PropType<PageResume>,
            required: true
        },
        displayTitle: {
            type: Boolean,
            default: true
        }
    }
}