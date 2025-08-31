import { pluginName } from "./constantes";

interface IStyleOptions {
    bgColor: string;
    color?: string;
    icon?: string;
}

const style = (bgColor: string, color: string = 'white') =>
    `background-color: ${bgColor}; color: ${color}; padding: 1px; margin-right: 5px; font-size: 12px`


export function log(message: string, args?: any | any[], styleOptions?: IStyleOptions) {
    const logStyle = styleOptions ? style(styleOptions.bgColor, styleOptions.color) : style('#ffec73', 'green')
    const icon = styleOptions?.icon ?? '🍍⚡'

    message = ` [${icon} ${pluginName} plugin] - ${message} `

    console.log(
        '%c%s',
        logStyle,
        message,
        args
    )
}

export function logError(message: string, args?: any | any[]) {
    log(message, args, { bgColor: '#ffa653', color: 'white', icon: '🍍⚠️' })
}