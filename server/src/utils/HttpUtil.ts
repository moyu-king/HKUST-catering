class HttpUtil {
    public static resBody(status: number, message: string, data: object | [] | string): object {
        return {
            status,
            message,
            data
        }
    }
}

export default HttpUtil