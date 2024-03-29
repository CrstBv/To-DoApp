export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-Mx",{
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}