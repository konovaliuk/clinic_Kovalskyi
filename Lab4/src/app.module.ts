import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeController } from "./Controllers/patient/home.js";
import { UpcomingPatientAppointmentsController } from "./Controllers/patient/upcomingPatientAppointments.js";
import { PatientCabinetController } from "./Controllers/patient/patientCabinet.js";
import { MakeAppointmentController } from "./Controllers/patient/makeAppointment.js";
import { LoginController } from "./Controllers/login.js";
import { AppointmentsPatientHistoryController } from "./Controllers/patient/appointmentsPatientHistory.js";
import { PatientAppointmentListService } from "./Services/appointmentsListService.js";
import { DiagnoseService } from "./Services/diagnoseService.js";
import { MakeAppointmentService } from "./Services/makeAppointmentService.js";
import { UserService } from "./Services/UserService.js";
import { SignUpController } from "./Controllers/signUp.js";
import { AdminCabinetController } from "./Controllers/admin/adminCabinet.js";
import { AddDoctorController } from "./Controllers/admin/addDoctor.js";
import { UpdateDoctorController } from "./Controllers/admin/updateDoctor.js";
import { BaseTransaction } from "./transactions/baseTransaction.js";
import { InsertDoctorTransaction } from "./transactions/insertDoctor.js";
@Module({
  imports: [],
  controllers: [
    HomeController,
    UpcomingPatientAppointmentsController,
    PatientCabinetController,
    MakeAppointmentController,
    LoginController,
    AppointmentsPatientHistoryController,
    SignUpController,
    AdminCabinetController,
    AddDoctorController,
    UpdateDoctorController,
  ],
  providers: [PatientAppointmentListService, DiagnoseService, MakeAppointmentService, UserService],
})
export class AppModule {}
