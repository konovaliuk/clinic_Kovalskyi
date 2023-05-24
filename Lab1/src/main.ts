import { MySQLDAOFactory } from "./MySQLDAOFactory/MySQLDAOFactory.js";
import { Appointment } from "./Entities/Appointment.js";
import { Diagnose } from "./Entities/Diagnose.js";
//get instance of MySQLAppointmentDAO
const DAOFactory = MySQLDAOFactory.getInstance();
const AppointmentDAO = DAOFactory.GetAppointmentDAO();
//create appointment
const appointment = new Appointment({
  doctor: 1,
  patient: 1,
  date: "2023-04-13 12:56:00",
  rate: null,
});
//insert in db, if Promise will be rejected then will print error
AppointmentDAO.InsertAppointment(appointment).catch((err) => console.log(err));
/*get and print some appointments. Printed: [
  Appointment {
    id: 3,
    doctor: 1,
    patient: 1,
    date: 2023-04-13T08:56:00.000Z,
    rate: null
  }
]*/
AppointmentDAO.GetAllPatientAppointments(1)
  .then((appointments) => console.log(appointments))
  .catch((err) => console.log(err));
//get instance of MySQLDiagnoseDAO
const DiagnoseDAO = DAOFactory.GetDiagnoseDAO();
const diagnose = new Diagnose({
  appointment: 1,
  disease: 1,
  recommendations: "rest in bad",
  patient: 1,
});
DiagnoseDAO.InsertDiagnose(diagnose).catch((err) => console.log(err));
/*Try to insert diagnose with not exists disease. Will get error:
 Error: Cannot add or update a child row: a foreign key constraint fails 
 (`clinic`.`diagnose`, CONSTRAINT `diagnose_ibfk_2_` FOREIGN KEY (`disease`)
  REFERENCES `disease` (`id`) ON DELETE RESTRICT)
*/
diagnose.disease_ = 0;
DiagnoseDAO.InsertDiagnose(diagnose).catch((err) => console.log(err));
