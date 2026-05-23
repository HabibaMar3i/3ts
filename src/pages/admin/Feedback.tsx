import { DashboardPage } from '../../components/dashboard/DashboardPage'
import { DashboardStatCards } from '../../components/dashboard/DashboardStatCards'
import { DataTable } from '../../components/dashboard/DataTable'
import { getFeedbackColumns } from '../../components/dashboard/tables/feedbackColumns'
import { initialAdminFeedback } from '../../data/admin/feedback'
import { useLocalCrud } from '../../hooks/useLocalCrud'
import type { AdminFeedback } from '../../types/admin'

export default function AdminFeedback() {
    const { items, remove } = useLocalCrud<AdminFeedback>([...initialAdminFeedback])
    const newCount = items.filter((item) => item.status === 'new').length

    return (
        <DashboardPage title="التعليقات" description="مراجعة تعليقات وآراء العملاء.">
            <DashboardStatCards
                columns={3}
                stats={[
                    { label: 'إجمالي التعليقات', value: String(items.length) },
                    { label: 'جديد', value: String(newCount) },
                    {
                        label: 'تمت المراجعة',
                        value: String(items.filter((item) => item.status === 'reviewed').length),
                    },
                ]}
            />

            <div className="mt-8">
                <DataTable
                    data={items}
                    columns={getFeedbackColumns({
                        onDelete: (id) => remove(id, 'هل تريد حذف هذا التعليق؟'),
                    })}
                    getRowKey={(row) => row.id}
                    emptyMessage="لا توجد تعليقات."
                    minWidth="900px"
                />
            </div>
        </DashboardPage>
    )
}
