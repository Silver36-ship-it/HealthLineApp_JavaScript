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
    constructor(patient, doctor){
        this.patient = patient;
        this.doctor = doctor;
        this.status = "rescheduled";
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
    console.log(`Doctor ${name} registered`);
}
registeredPatient(name,age,contactInfo,reason){
    const addPatient = new Patient(name,age,contactInfo,reason);
    this.patients.push(addPatient);
    console.log(`Patient ${name} registered`);
}
scheduledAppointment(patientName,doctorName){
    const checkPatient = this.patients.find(patient => patient.name == patientName);
    const checkDoctor = this.doctors.find(doctor => doctor.name == doctorName);
    if(!checkPatient || !checkDoctor){
        return console.log("Doctor or Patient not found");

    } 
    const bookDoctor = this.appointments.find(doctor => doctor.name == doctorName)
    if(bookDoctor){
        return console.log("Doctor already booked");
    }
    const appointment = new Appointment(checkPatient,checkDoctor)
    this.appointments.push(appointment)
    return console.log(`Appointment booked between Dr.${doctorName} and ${patientName}`)
} 
}