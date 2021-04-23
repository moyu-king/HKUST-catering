class FileUtil {
    public static fileName(): string {
        return `${new Date().getTime()}.jpg`
    }
}

export default FileUtil