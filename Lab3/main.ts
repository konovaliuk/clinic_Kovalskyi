import { MySQLDAOFactory } from "./src/MySQLDAOFactory/MySQLDAOFactory.js";
import { Diagnose } from "./src/Entities/daoEntities/Diagnose.js";
import { AppDataSource } from "./src/dataSource.js";
import { User } from "./src/Entities/daoEntities/User.js";
import { UserRole } from "./src/types/roles.js";
import { Doctor } from "./src/Entities/daoEntities/Doctor.js";
//const appointmentDao = MySQLDAOFactory.getInstance().GetDoctorDAO();
//console.log(await appointmentDao.GetDoctorsByUsersIds([23]));

const appointmentDao = MySQLDAOFactory.getInstance().GetAppointmentDAO();
const appointments = await appointmentDao.GetAllPatientAppointments(2);
console.log(appointments);

const doctorDao = MySQLDAOFactory.getInstance().GetDoctorDAO();
let doctors = await doctorDao.GetDoctorByID([23]);
console.log(doctors[0]);
await doctorDao.UpdateCabinet(23, 5);
doctors = await doctorDao.GetDoctorByID([23]);
console.log(doctors[0]);

const diagnoseDao = MySQLDAOFactory.getInstance().GetDiagnoseDAO();
const diagnose = new Diagnose(61, "someDisease1", "good sleep");
await diagnoseDao.InsertDiagnose(diagnose);
let diagnoses = await diagnoseDao.getDiagnosesByAppointment(61);
console.log(diagnoses);

//transaction:

const queryRunner = AppDataSource.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();
const user = new User("dsfdsf123455555", "dfgdfg", "dfgfdfgdgf", "f3hjdkvl", UserRole.doctor);
try {
  const userDao = MySQLDAOFactory.getInstance().GetUserDAO();
  const added = await userDao.Insert(user, queryRunner);
  const doctor = new Doctor(22, true, 1000, null);
  await doctorDao.InsertDoctor(doctor, queryRunner);
  await queryRunner.commitTransaction();
} catch (err) {
  console.log(err);
  await queryRunner.rollbackTransaction();
  console.log("transaction rollback");
} finally {
  await queryRunner.release();
}
