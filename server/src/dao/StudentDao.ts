import Student from "../model/Student";

interface StudentDao {
    findByStudentId(studentId: string): Promise<Student>

    updateInfoByStudentId(studentId: string, name: string, phone: string, address: string): Promise<boolean>

    insertOnce(studentId: string, name: string, password: string, wallet: number): Promise<boolean>

    findPaymentPassByStudentId(studentId: string): Promise<string>

    findCountByStudentId(studentId: string): Promise<number>

    updatePaymentPass(studentId: string, payment_password: string): Promise<boolean>

    updateWalletById(studentId: string, price: number): Promise<boolean>

    findWalletById(studentId: string): Promise<number>
}

export default StudentDao