import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AdminBlogForm, type AdminBlogFormValues } from '../../components/admin/AdminBlogForm'
import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DataTable } from '../../components/dashboard/DataTable'
import { getBlogColumns } from '../../components/dashboard/tables/blogColumns'
import { Button } from '../../components/ui/button'
import { initialAdminBlogs } from '../../data/admin/blogs'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { AdminBlog } from '../../types/admin'

type FormMode = 'closed' | 'create' | 'edit'

export default function AdminBlogs() {
    const { items, create, update, remove } = useLocalCrud<AdminBlog>([...initialAdminBlogs])
    const [formMode, setFormMode] = useState<FormMode>('closed')
    const [editing, setEditing] = useState<AdminBlog | null>(null)

    const closeForm = () => {
        setFormMode('closed')
        setEditing(null)
    }

    return (
        <DashboardPage
            title="المدونة"
            description="إدارة مقالات المدونة."
            action={
                formMode === 'closed' ? (
                    <Button type="button" className="gap-2" onClick={() => setFormMode('create')}>
                        <Plus size={18} />
                        إضافة مقال
                    </Button>
                ) : null
            }
        >
            {formMode === 'create' ? (
                <AdminBlogForm
                    submitLabel="حفظ المقال"
                    onSubmit={(values: AdminBlogFormValues) => {
                        create(values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            {formMode === 'edit' && editing ? (
                <AdminBlogForm
                    initialValues={editing}
                    submitLabel="تحديث المقال"
                    onSubmit={(values) => {
                        update(editing.id, values)
                        closeForm()
                    }}
                    onCancel={closeForm}
                />
            ) : null}

            <DataTable
                data={items}
                columns={getBlogColumns({
                    onEdit: (blog) => {
                        setEditing(blog)
                        setFormMode('edit')
                    },
                    onDelete: (id) => {
                        if (remove(id, 'هل تريد حذف هذا المقال؟') && editing?.id === id) closeForm()
                    },
                })}
                getRowKey={(row) => row.id}
                emptyMessage="لا توجد مقالات."
            />
        </DashboardPage>
    )
}
