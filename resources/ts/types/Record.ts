export type Record = {
    id: number
    book_id: number
    recorded_at: Date
    created_at: Date
    updated_at: Date
    images?: Image[]
    recipes?: Recipe[]
}

type Image = {
    id: number
    path: string
    record_id: number
}

type Recipe = {
    id: number
    name: string
    detail: string
    record_id: number
}