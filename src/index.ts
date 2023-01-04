import winston from 'winston'
import {IConfig, StructuredData} from "./types";


const FACILITY = 20
const VERSION = 1
const HOST = 'default'
const APP_NAME = '-'
const PROC_ID = '-'

export const levelToSyslog: { [key: string]: number } = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
}


export const formatSD = (data: StructuredData | undefined) => {
    if (!data) return '-'

    if (Object.keys(data).length === 0) return '-'

    let res = `[meta@`
    for (const key in data) {
        res += ' '
        if (typeof data[key] === 'string') {
            res += `${key}="${data[key]}"`
        } else {
            res += `${key}=${data[key]}`
        }
    }

    return res + ']'
}


export const createSyslogFormatter = (config?: IConfig) => {
    const facility = config?.facility || FACILITY
    const version = config?.version || VERSION
    const host = config?.host || HOST
    const appName = config?.appName || APP_NAME
    const procId = config?.procId || PROC_ID

    return winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
                const {timestamp, level, message, sd} = info
                const pri = (facility * 8) + levelToSyslog[level]
                const msgId = '-'

                return `<${pri}>${version} ${timestamp} ${host} ${appName} ${procId} ${msgId} ${formatSD(sd)} ${message}`
            },
        )
    )
}
