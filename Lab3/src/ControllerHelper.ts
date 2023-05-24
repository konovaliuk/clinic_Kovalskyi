import { Command } from "./Commands/ICommand.js";
import {
  HomeCommand,
  LoginCommand,
  SignUpCommand,
  RedirectLoginCommand,
  RenderPatientCabinetCommand,
  AppointmentsPatientHistoryCommand,
  DetailPatientAppointmentCommand,
  SetRateCommand,
  UpcomingPatientAppointmentsCommand,
  ChooseSpecialisationCommand,
  ListDoctorsCommand,
  RenderScheduleCommand,
  RedirectMakeAppointmentCommand,
  MakeAppointmentCommand,
  ErrorCommand,
} from "./Commands/exportAll.js";
type controllerHelperMap = Map<string | undefined, Command>;
const commands: controllerHelperMap = new Map<string | undefined, Command>();

commands.set("", new HomeCommand());
commands.set("redirect-login-form", new RedirectLoginCommand());
commands.set("login", new LoginCommand());
commands.set("patientCabinet", new RenderPatientCabinetCommand());
commands.set("patientAppointmentsHistory", new AppointmentsPatientHistoryCommand());
commands.set("detailPatientAppointment", new DetailPatientAppointmentCommand());
commands.set("setRate", new SetRateCommand());
commands.set("upcomingPatientAppointments", new UpcomingPatientAppointmentsCommand());
commands.set("chooseSpecialisation", new ChooseSpecialisationCommand());
commands.set("listDoctors", new ListDoctorsCommand());
commands.set("redirectSchedule", new RenderScheduleCommand());
commands.set("redirectMakeAppointment", new RedirectMakeAppointmentCommand());
commands.set("makeAppointment", new MakeAppointmentCommand());

export class ControllerHelper {
  private constructor(commands: controllerHelperMap) {
    this.commands = commands;
  }
  private static instance: ControllerHelper;
  private commands: controllerHelperMap;
  public static getInstance(): ControllerHelper {
    if (!ControllerHelper.instance) {
      ControllerHelper.instance = new ControllerHelper(commands);
    }
    return ControllerHelper.instance;
  }
  getCommand(command: string | undefined): Command {
    const command_ = commands.get(command);
    return command_ ? command_ : new ErrorCommand();
  }
}
