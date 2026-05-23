export type UserRole = 'customer' | 'admin' | 'vendor'
export type UserStatus = 'active' | 'blocked'
export type VendorAccountStatus = 'active' | 'pending' | 'suspended'
export type BlogStatus = 'draft' | 'published'
export type FeedbackStatus = 'new' | 'reviewed'

export interface AdminUser {
    id: number
    name: string
    email: string
    role: UserRole
    status: UserStatus
    joinedAt: string
}

export interface AdminVendor {
    id: number
    storeName: string
    owner: string
    email: string
    productsCount: number
    status: VendorAccountStatus
}

export interface AdminBlog {
    id: number
    title: string
    author: string
    category: string
    publishedAt: string
    status: BlogStatus
}

export interface AdminFeedback {
    id: number
    user: string
    rating: number
    comment: string
    date: string
    status: FeedbackStatus
}
