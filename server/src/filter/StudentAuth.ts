import HttpUtil from "../utils/HttpUtil";
import JWT from "../utils/JWTUtil";

const StudentAuth = (req: any, res: any, next): void => {
    if (!req.headers.authorization) {//CommonUtil.com(false, null, "未授权，请先登录!")
        res.status(401).send(HttpUtil.resBody(0, '未授权', null));
    } else {
        const token: string = req.headers.authorization.split(" ").pop();
        let result: any = JWT.verify(token);
        if (result) {
            req.currentStudentId = result.studentId;//将信息存放到 state 中
            next();
        } else {
            res.status(401).send(HttpUtil.resBody(0, "登录信息已过期", null));
        }
    }

}
export default StudentAuth;