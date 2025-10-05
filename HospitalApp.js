class Doctor{
    constructor(name, department, contactInfo){
        this.name = name;
        this.department = department;
        this.contactInfo = contactInfo;
        this.available = true;
    }
}
class Patient{
    constructor(name,age,contactInfo,reason,priority = "not emergency"){
        this.name = name;
        this.age = age;
        this.contactInfo = contactInfo;
        this.reason = reason;
        this.priority = priority.toLowerCase();
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
    this.queues = {};
    }
registeredDoctor(name, department, contactInfo){
    const addDoctor = new Doctor(name,department,contactInfo);    
    this.doctors.push(addDoctor);
    this.queues[name] = [];
    return `Doctor ${name} registered`;
}
registeredPatient(name,age,contactInfo,reason,priority){
    const addPatient = new Patient(name,age,contactInfo,reason,priority);
    this.patients.push(addPatient);
    return `Patient ${name} registered`
}
scheduleAppointment(patientName,doctorName){
    const checkPatient = this.patients.find(patient => patient.name === patientName)
    const checkDoctor = this.doctors.find(doctor => doctor.name === doctorName )
    if(!checkPatient || !checkDoctor){
        return 'No doctor or Patient with that name found'
    }
    const bookDoctor = this.appointments.find(appointment => appointment.doctor.name === doctorName)
    if(bookDoctor){
        return 'Doctor already booked'
    }
    const bookAppointment = new Appointment(checkPatient,checkDoctor, "rescheduled")
    if(checkPatient.priority === "emergency"){
        this.queues[doctorName].unshift(bookAppointment)
    }
    else{
        this.queues[doctorName].push(bookAppointment);
    }
    
    this.appointments.push(bookAppointment)
    checkDoctor.available = false
    return `Appointment booked between Dr ${doctorName} and patient ${patientName}`
}
callOnNextPatient(doctorName){
    const queue = this.queues[doctorName];
    if(!queue || queue.length == 0){
        return `No patient in queue for Dr. ${doctorName}`
    }
    const nextPatient = queue.shift();
    nextPatient.status = "seen";
    nextPatient.doctor.available = true;
    return `Calling the patient: ${nextPatient.patient.name} to see doctor: ${doctorName}`
}    
modifyAppointmentStatus(patientName,doctorName,status){
    const appointment = this.appointments.find(eachElement => eachElement.patient.name == patientName && eachElement.doctor.name == doctorName); 
    if(!appointment){
        return "No appointment found!"
    }
    const validStatus = ["seen", "no-show", "rescheduled"];
    if(!validStatus.includes(status.toLowerCase())){
        return "Invalid status"
    }
    appointment.status = status.toLowerCase();
    return `Appointment with patient: ${patientName} and Dr.${doctorName} marked as ${status}`;
}
viewAllDoctors(){
 	return this.doctors.map(viewDoctors => {return `${viewDoctors.name} (${viewDoctors.department}) (${viewDoctors.contactInfo}) (${viewDoctors.available})` })
}
viewAllAppointments(){
    return this.appointments.map(viewAppointment => {return `Patient: ${viewAppointment.patient.name} Doctor: ${viewAppointment.doctor.name} Status: ${viewAppointment.status}`})
}

}   

module.exports = HospitalApp