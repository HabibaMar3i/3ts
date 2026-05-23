import { useCallback, useState } from 'react'

export function useLocalCrud<T extends { id: number }>(initialItems: T[]) {
    const [items, setItems] = useState(initialItems)

    const nextId = useCallback(
        () => (items.length === 0 ? 1 : Math.max(...items.map((item) => item.id)) + 1),
        [items]
    )

    const create = useCallback(
        (item: Omit<T, 'id'>) => {
            setItems((prev) => [...prev, { ...item, id: nextId() } as T])
        },
        [nextId]
    )

    const update = useCallback((id: number, patch: Partial<T>) => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)))
    }, [])

    const remove = useCallback((id: number, message = 'هل تريد حذف هذا العنصر؟') => {
        if (!window.confirm(message)) return false
        setItems((prev) => prev.filter((item) => item.id !== id))
        return true
    }, [])

    return { items, setItems, create, update, remove, nextId }
}
