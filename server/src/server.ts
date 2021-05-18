import * as express from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
import * as path from "path"
import userRouter from "./router/studentRouter"
import adminRouter from "./router/adminRouter"
import ConstantUtil from "./utils/ConstantUtil"
import {oderSocket} from "./socket/OderSocket";

const app = express()
//引入cors，解决跨域问题
app.use(cors());

//启动websocket服务
oderSocket()

//开放静态资源
app.use('/static/', express.static(path.join(__dirname, './upload/')));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/app', userRouter).use('/HKUST', adminRouter)

app.listen(ConstantUtil.port, () => console.log(`http server running in http://127.0.0.1:${ConstantUtil.port}`));
