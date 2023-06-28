export type Book = {
    id?: number
    title: string
    description: string
    is_private: boolean
    is_favorite?: boolean
    created_at?: Date
    updated_at?: Date
    created_by?: string
    user_icon?: string
}

export type User = {
    id: number
    name: string
    email: string
    email_verified_at?: Date
    password: string
    icon_path: string
    created_at: Date
    updated_at: Date
}