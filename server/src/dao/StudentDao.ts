import Student from "../model/Student";

interface StudentDao {
    findByStudentId(studentId: string): Promise<Student>

    updateInfoByStudentId(studentId: string, name: string, phone: string, address: string): Promise<boolean>

    insertOnce(studentId: string, name: string, password: string, wallet: number): Promise<boolean>
}

export default StudentDao