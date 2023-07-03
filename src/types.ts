
export type StructuredData = {
    [key: string]: number | string | boolean | null
}
export interface IConfig {
    facility?: number
    version?: string | number
    host?: string
    appName?: string
    procId?: string | number
    dateFormatter?: (date: Date) => string
}
