class FormatUtil {
    public static dateFormat(time: string | number): string {
        const date: Date = new Date(time)
        const year: number = date.getFullYear()
        let month: number | string = date.getMonth() + 1
        let day: number | string = date.getDate()
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + month
        return `${year}-${month}-${day}`
    }
}

export default FormatUtil