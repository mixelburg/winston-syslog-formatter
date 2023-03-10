
export type StructuredData = {
    [key: string]: number | string | boolean | null
}
export interface IConfig {
    facility?: number
    version?: number
    host?: string
    appName?: string
    procId?: string
}
