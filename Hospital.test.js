const HospitalApp = require('../src/HospitalApp')
const newHospitalApp = new HospitalApp()
describe("Test for registered patient", () =>{
    test("Test for the registered patient function", () =>{
    result = newHospitalApp.registeredPatient("frey","21","rey ojota","free care")
    expect(result).toBe("Patient frey registered")
    })
    test("Test for the registered doctor function",() =>{
        expect(newHospitalApp.registeredDoctor("Silver", 90, "Ojota")).toBe("Doctor Silver registered")
    })
    test("Test that a doctor cant be booked twice",() =>{
        newHospitalApp.scheduledAppointment("frey","Silver")
        result = newHospitalApp.scheduledAppointment("frey","Silver")
        expect(result).toBe("Doctor already booked")
    })
    test("Test that an appoitment can be scheduled",() =>{
        newHospitalApp.registeredPatient("Gray","21","rey ojota","free care")
        newHospitalApp.registeredDoctor("marget", 90, "Ojota")
        result = newHospitalApp.scheduledAppointment("Gray", "marget")
        expect(result).toBe("Appointment booked between Dr marget and patient Gray")
    })
    test("Test that no unknown name gets an appointment",() =>{
        newHospitalApp.registeredPatient("Gray","21","rey ojota","free care")
        newHospitalApp.registeredDoctor("marget", 90, "Ojota")
        result = newHospitalApp.scheduledAppointment("Gray", "john")
        expect(result).toBe("No doctor or Patient with that name found")
    })
})
