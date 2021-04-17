class HttpUtil {
    public static resBody(status: number, message: string, data: object): object {
        return {
            status,
            message,
            data
        }
    }
}

export default HttpUtil