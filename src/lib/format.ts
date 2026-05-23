export function formatPrice(price: number): string {
    return price.toLocaleString('ar-EG', { style: 'currency', currency: 'EGP' })
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function formatNumber(value: number): string {
    return value.toLocaleString('ar-EG')
}
