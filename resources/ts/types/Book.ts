export type Book = {
    id?: number
    title: string
    description: string
    is_private: boolean
    user_id?: number
    cover_id?: number
    created_at?: Date
    updated_at?: Date
}