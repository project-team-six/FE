export function datetimeUtils(datetime: Date): string{
    return datetime.toISOString().split("T")[0];
}