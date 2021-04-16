import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as path from "path";
import userRouter from "./router/stuRoter";
import adminRouter from "./router/adminRouter";

const app = express();

//引入cors，解决跨域问题
app.use(cors());

console.log(path.join(__dirname, './upload'));
//开放静态资源
app.use('/static/', express.static(path.join(__dirname, './upload/')));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(userRouter).use(adminRouter)

app.listen(3000, () => console.log('server run in http://127.0.0.1:3000'));
