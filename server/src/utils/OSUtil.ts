import * as os from 'os';

class OSUtil {
    public static getLocalIP(): string {
        let ip: string;
        let osType: string = os.type();//系统类型
        let netInfo = os.networkInterfaces()//网络信息

        if (osType === 'Windows_NT') {
            for (let dev in netInfo) {
                //win7的网络信息中显示为本地连接，win10显示为以太网
                if (dev === '本地连接' || dev === '以太网') {
                    for (let j = 0; j < netInfo[dev].length; j++) {
                        if (netInfo[dev][j].family === 'IPv4') {
                            ip = netInfo[dev][j].address;
                            break;
                        }
                    }
                }
            }
        } else if (osType === 'Linux') {
            ip = netInfo.eth0[0].address;
        }

        return ip;
    }
}

export default OSUtil;