import inquirer from "inquirer";
import { registerComplaint } from "../services/complaintService.js";

export async function handleRegisterComplaint() {
    console.log("\n");
    console.log("========================================================");
    console.log("              REGISTER COMPLAINT");
    console.log("========================================================");

    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "passengerName",
            message: "Passenger Name:",
            validate: (value) =>
                value.trim() !== "" || "Passenger name is required."
        },
        {
            type: "input",
            name: "phone",
            message: "Phone Number:"
        },
        {
            type: "input",
            name: "trainNumber",
            message: "Train Number:"
        },
        {
            type: "input",
            name: "pnr",
            message: "PNR:"
        },
        {
            type: "input",
            name: "coachNumber",
            message: "Coach Number:"
        },
        {
            type: "input",
            name: "seatNumber",
            message: "Seat Number:"
        },
        {
            type: "input",
            name: "journeyDate",
            message: "Journey Date (YYYY-MM-DD):"
        },
        {
            type: "input",
            name: "description",
            message: "Complaint Description:",
            validate: (value) =>
                value.trim() !== "" || "Complaint description is required."
        }
    ]);

    const complaintId = registerComplaint(answers);

    console.log("\n");
    console.log("========================================================");
    console.log("          COMPLAINT ACKNOWLEDGEMENT");
    console.log("========================================================");

    console.log(`Complaint ID : ${complaintId}`);
    console.log("Status       : REGISTERED");

    console.log("\n✓ Complaint successfully registered.");

    console.log("========================================================");
}