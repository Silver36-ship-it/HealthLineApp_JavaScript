class Doctor{
    constructor(name, department, contactInfo){
        this.name = name;
        this.department = department;
        this.contactInfo = contactInfo;
        this.available = true;
    }
}
class Patient{
    constructor(name,age,contactInfo,reason){
        this.name = name;
        this.age = age;
        this.contactInfo = contactInfo;
        this.reason = reason;
    }
}
class Appointment{
    constructor(patient, doctor, status = "rescheduled"){
        this.patient = patient;
        this.doctor = doctor;
        this.status = status;
    }

}
class HospitalApp{
    constructor(){
    this.doctors = [];
    this.patients = [];
    this.appointments = [];
    }
registeredDoctor(name, department, contactInfo){
    const addDoctor = new Doctor(name,department,contactInfo);    
    this.doctors.push(addDoctor);
    return `Doctor ${name} registered`;
}
registeredPatient(name,age,contactInfo,reason){
    const addPatient = new Patient(name,age,contactInfo,reason);
    this.patients.push(addPatient);
    return `Patient ${name} registered`
}
scheduledAppointment(patientName,doctorName){
    const checkPatient = this.patients.find(patient => patient.name === patientName)
    const checkDoctor = this.doctors.find(doctor => doctor.name === doctorName )
    if(!checkPatient || !checkDoctor){
        return 'No doctor or Patient with that name found'
    }
    const bookDoctor = this.appointments.find(appointment => appointment.doctor.name === doctorName)
    if(bookDoctor){
        return 'Doctor already booked'
    }
    const bookAppointment = new Appointment(checkPatient,checkDoctor)
    this.appointments.push(bookAppointment)
    checkDoctor.available = false
    return `Appointment booked between Dr ${doctorName} and patient ${patientName}`
}
callOnNextPatient(doctorName){
    let nextPatient = null
    for(let index = 0; index < this.appointments.length;index++){
        const appointment = this.appointments[index];
        if(appointment.doctor.name == doctorName && appointment.status == "rescheduled"){
            nextPatient = appointment
            break;
        }
    }
    if(!nextPatient){
        return 'No patient in queue for this doctor'
    }
    nextPatient.status = "Seen"
    nextPatient.doctor.available = "true";
    return `Calling the patient: ${nextPatient.patient.name} to see doctor: ${nextPatient.doctor.name}`
}    
modifyAppointmentStatus(patientName,doctorName,status){
    const appointment = this.appointments.find(eachElement => eachElement.patient.name == patientName && eachElement.doctor.name == doctorName); 
    if(!appointment){
        return console.log("No appointment found!")
    }
    const validStatus = ["seen", "no-show", "rescheduled"];
    if(!validStatus.includes(status)){
        return console.log("Invalid status")
    }
    appointment.status = status;
    return console.log(`Appointment with patient: ${patientName} and Dr.${doctorName} marked as ${status}`);
}
viewAllDoctors(){
 	return this.doctors.map(viewDoctors => {return `${viewDoctors.name} (${viewDoctors.department}) (${viewDoctors.contactInfo}) (${viewDoctors.available})` })
}
viewAllAppointments(){
    return this.appointments.map(viewAppointment => {return `Patient: ${viewAppointment.patient.name} Doctor: ${viewAppointment.doctor.name} Status: ${viewAppointment.status}`})
}

}   

module.exports = HospitalApp