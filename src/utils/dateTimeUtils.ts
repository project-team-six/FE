export const dateTimeUtils = (dateTime: Date): string => {
    return dateTime.toISOString().split("T")[0];
};
