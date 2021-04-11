export function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function unixToString(unixCode) {
    const d = new Date(unixCode).getDate()
    const m = new Date(unixCode).getMonth() + 1
    const y = new Date(unixCode).getFullYear()

    return [d, m, y].join('.')
}
