export type Record = {
    id?: number
    book_id: number
    recorded_at: string
    created_at?: string
    updated_at?: string
    images?: Image[] | File[]
    recipes?: Recipe[]
}

type Image = {
    id: number
    path: string
    record_id: number
}

export type Recipe = {
    id?: number
    name: string
    detail: string
    record_id?: number
}