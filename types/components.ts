export interface ComponentResume {
    description?: string
    id: string
    title: string
}

export interface SlotCtn {
    name: string
    type?: SlotCtnType
}


export type SlotCtnType = 'code' | 'explanation' | 'tip'
