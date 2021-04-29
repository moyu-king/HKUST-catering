import LoginEnum from "../enum/LoginEnum";
import Student from "../model/Student";
import RegisterEnum from "../enum/RegisterEnum";

interface StudentService {
    login(studentId: string, password: string): Promise<LoginEnum | string>

    register(studentId: string, name: string, password: string): Promise<RegisterEnum>

    updateStudentInfo(studentId: string, username: string, phone: string, address: string): Promise<boolean>

    getStudentInfo(studentId: string): Promise<Student>
}

export default StudentService