class FileUtil {
    public static fileName(): string {
        return `${new Date().getTime()}.jpg`
    }

    public static orderId(type: string): string {
        return `${type}${new Date().getTime()}`
    }
}

export default FileUtil