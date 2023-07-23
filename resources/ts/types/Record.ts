export type Record = {
    id?: number
    recorded_at: string
    images?: Image[]
    recipes?: Recipe[]
}

export type Image = {
    url: string
}

export type Recipe = {
    id?: number
    name: string
    detail: string
    record_id?: number
}