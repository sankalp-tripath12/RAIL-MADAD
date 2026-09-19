import inquirer from "inquirer";

import {
    registerComplaint,
    getComplaintById,
    getComplaintHistory,
    updateComplaintStatus
} from "../services/complaintService.js";

export async function handleRegisterComplaint() {
    console.log("\n");
    console.log("========================================================");
    console.log("              REGISTER COMPLAINT");
    console.log("========================================================");

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "passengerName",
            message: "Passenger Name:"
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
            message: "Complaint Description:"
        }
    ]);

    const complaintId = registerComplaint(answer);

    console.log("\n");
    console.log("========================================================");
    console.log("          COMPLAINT ACKNOWLEDGEMENT");
    console.log("========================================================");
    console.log(`Complaint ID : ${complaintId}`);
    console.log("Status       : REGISTERED");
    console.log("\n✓ Complaint successfully registered.");
    console.log("========================================================");
}

async function askComplaintId() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "complaintId",
            message: "Enter Complaint ID:"
        }
    ]);

    return answer.complaintId.trim();
}

export async function handleViewComplaint() {
    console.log("\n");
    console.log("========================================================");
    console.log("                VIEW COMPLAINT");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log("\n========================================================");
    console.log("              COMPLAINT DETAILS");
    console.log("========================================================");

    console.log(`Complaint ID   : ${complaint.complaint_id}`);
    console.log(`Passenger Name : ${complaint.passenger_name}`);
    console.log(`Phone          : ${complaint.phone}`);
    console.log(`Train Number   : ${complaint.train_number}`);
    console.log(`PNR            : ${complaint.pnr}`);
    console.log(`Coach Number   : ${complaint.coach_number}`);
    console.log(`Seat Number    : ${complaint.seat_number}`);
    console.log(`Journey Date   : ${complaint.journey_date}`);
    console.log(`Description    : ${complaint.description}`);
    console.log(`Category       : ${complaint.category || "Not analyzed"}`);
    console.log(`Priority       : ${complaint.priority || "Not analyzed"}`);
    console.log(`Department     : ${complaint.department || "Not routed"}`);
    console.log(`Sentiment      : ${complaint.sentiment || "Not analyzed"}`);
    console.log(`Status         : ${complaint.status}`);
    console.log(`Created At     : ${complaint.created_at}`);
    console.log(`Updated At     : ${complaint.updated_at}`);

    console.log("========================================================");
}

export async function handleTrackComplaint() {
    console.log("\n");
    console.log("========================================================");
    console.log("                TRACK COMPLAINT");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    const history = getComplaintHistory(complaintId);

    console.log(`\nComplaint ID : ${complaint.complaint_id}`);
    console.log(`Current Status: ${complaint.status}`);

    console.log("\n---------------- STATUS TIMELINE ----------------");

    history.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.new_status}`);
        console.log(`   Time     : ${item.timestamp}`);
        console.log(`   Remarks  : ${item.remarks || "-"}`);
        console.log(`   Updated By: ${item.updated_by}`);
    });

    console.log("\n========================================================");
}

export async function handleUpdateComplaintStatus() {
    console.log("\n");
    console.log("========================================================");
    console.log("           UPDATE COMPLAINT STATUS");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log(`\nCurrent Status: ${complaint.status}`);

    const answer = await inquirer.prompt([
        {
            type: "select",
            name: "status",
            message: "Select New Status:",
            choices: [
                "REGISTERED",
                "AI_ANALYZED",
                "ROUTED",
                "ASSIGNED",
                "UNDER_INVESTIGATION",
                "ACTION_TAKEN",
                "RESOLVED",
                "CLOSED",
                "REOPENED"
            ]
        },
        {
            type: "input",
            name: "remarks",
            message: "Enter Remarks:"
        }
    ]);

    const updatedComplaint = updateComplaintStatus(
        complaintId,
        answer.status,
        answer.remarks || "Status updated",
        "CLI"
    );

    console.log("\n========================================================");
    console.log("             STATUS UPDATED");
    console.log("========================================================");
    console.log(`Complaint ID : ${updatedComplaint.complaint_id}`);
    console.log(`Old Status   : ${complaint.status}`);
    console.log(`New Status   : ${updatedComplaint.status}`);
    console.log(`Remarks      : ${updatedComplaint.official_remarks}`);
    console.log("========================================================");
}

export async function handleStatusHistory() {
    console.log("\n");
    console.log("========================================================");
    console.log("                STATUS HISTORY");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    const history = getComplaintHistory(complaintId);

    console.log(`\nComplaint ID : ${complaintId}`);

    if (history.length === 0) {
        console.log("\nNo status history available.");
        return;
    }

    history.forEach((item, index) => {
        console.log("\n--------------------------------------------------------");
        console.log(`History #${index + 1}`);
        console.log(`Old Status  : ${item.old_status || "-"}`);
        console.log(`New Status  : ${item.new_status}`);
        console.log(`Remarks     : ${item.remarks || "-"}`);
        console.log(`Updated By  : ${item.updated_by}`);
        console.log(`Timestamp   : ${item.timestamp}`);
    });

    console.log("========================================================");
}
