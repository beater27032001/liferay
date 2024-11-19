export interface Material {
    name: string
    quantity: number
}


export interface Campaign {
    id: string
    title: string
    description: string
    startDate: string
    endDate: string
    image: string
    materials: Material[]
    donations: string[]
    participants: string[]
}