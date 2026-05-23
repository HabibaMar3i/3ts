import type { AdminBlog } from '../../types/admin'

export const initialAdminBlogs: AdminBlog[] = [
    {
        id: 1,
        title: 'أفضل ألعاب تعليمية للأطفال',
        author: 'فريق 3TS',
        category: 'تعليم',
        publishedAt: '2026-05-10',
        status: 'published',
    },
    {
        id: 2,
        title: 'كيف تختار لعبة مناسبة لطفلك',
        author: 'فريق 3TS',
        category: 'نصائح',
        publishedAt: '2026-05-18',
        status: 'published',
    },
    {
        id: 3,
        title: 'أحدث اتجاهات ألعاب 2026',
        author: 'محمود حسن',
        category: 'أخبار',
        publishedAt: '2026-05-22',
        status: 'draft',
    },
]
