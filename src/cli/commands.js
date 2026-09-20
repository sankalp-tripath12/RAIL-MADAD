import inquirer from "inquirer";

import {
    registerComplaint,
    getComplaintById,
    getComplaintHistory,
    updateComplaintStatus,
    analyzeComplaintCategory
} from "../services/complaintService.js";

export async function handleRegisterComplaint() {
    console.log("\n========================================================");
    console.log("              📝 REGISTER COMPLAINT");
    console.log("========================================================");

    const answers = await inquirer.prompt([
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
            message: "Journey Date:"
        },
        {
            type: "input",
            name: "description",
            message: "Complaint Description:"
        },
        {
            type: "select",
            name: "mediaType",
            message: "Media Type:",
            choices: [
                "none",
                "image",
                "video",
                "audio"
            ]
        },
        {
            type: "input",
            name: "mediaPath",
            message: "Media File Path:",
            when: (answers) => answers.mediaType !== "none"
        }
    ]);

    const complaintId = registerComplaint(answers);

    console.log("\n========================================================");
    console.log("        ✅ COMPLAINT REGISTERED SUCCESSFULLY");
    console.log("========================================================");
    console.log(`Complaint ID: ${complaintId}`);
    console.log("========================================================\n");
}

export async function handleAnalyzeComplaint() {
    console.log("\n========================================================");
    console.log("              🤖 AI COMPLAINT ANALYSIS");
    console.log("========================================================");

    const { complaintId } = await inquirer.prompt([
        {
            type: "input",
            name: "complaintId",
            message: "Enter Complaint ID:"
        }
    ]);

    const result = analyzeComplaintCategory(complaintId.trim());

    if (!result) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log("\n--------------------------------------------------------");
    console.log("AI ANALYSIS RESULT");
    console.log("--------------------------------------------------------");
    console.log(`Complaint ID : ${result.complaintId}`);
    console.log(`Category     : ${result.category}`);
    console.log(`Confidence   : ${(result.confidence * 100).toFixed(0)}%`);
    console.log(`Priority     : ${result.priority}`);
    console.log(`Sentiment    : ${result.sentiment}`);
    console.log(`Department   : ${result.department}`);
    console.log("--------------------------------------------------------\n");
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
    const complaintId = await askComplaintId();
    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log("\n========================================================");
    console.log("                 🔎 VIEW COMPLAINT");
    console.log("========================================================");

    console.log(`Complaint ID     : ${complaint.complaint_id}`);
    console.log(`Passenger Name   : ${complaint.passenger_name}`);
    console.log(`Phone            : ${complaint.phone}`);
    console.log(`Train Number     : ${complaint.train_number}`);
    console.log(`PNR              : ${complaint.pnr}`);
    console.log(`Coach Number     : ${complaint.coach_number}`);
    console.log(`Seat Number      : ${complaint.seat_number}`);
    console.log(`Journey Date     : ${complaint.journey_date}`);
    console.log(`Description      : ${complaint.description}`);
    console.log(`Category         : ${complaint.category || "Not analyzed"}`);
    console.log(`Confidence       : ${complaint.confidence ?? "Not analyzed"}`);
    console.log(`Priority         : ${complaint.priority || "Not analyzed"}`);
    console.log(`Department       : ${complaint.department || "Not assigned"}`);
    console.log(`Sentiment        : ${complaint.sentiment || "Not analyzed"}`);
    console.log(`Status           : ${complaint.status}`);
    console.log(`Created At       : ${complaint.created_at}`);
    console.log(`Updated At       : ${complaint.updated_at}`);

    console.log("========================================================\n");
}

export async function handleTrackComplaint() {
    const complaintId = await askComplaintId();
    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    const history = getComplaintHistory(complaintId);

    console.log("\n========================================================");
    console.log("                 📍 TRACK COMPLAINT");
    console.log("========================================================");

    console.log(`Complaint ID : ${complaint.complaint_id}`);
    console.log(`Current Status: ${complaint.status}`);

    history.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.new_status}`);
        console.log(`   Remarks: ${item.remarks}`);
        console.log(`   Updated By: ${item.updated_by}`);
        console.log(`   Time: ${item.timestamp}`);
    });

    console.log("========================================================\n");
}

export async function handleUpdateComplaintStatus() {
    const complaintId = await askComplaintId();

    const { newStatus } = await inquirer.prompt([
        {
            type: "select",
            name: "newStatus",
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
        }
    ]);

    const { remarks } = await inquirer.prompt([
        {
            type: "input",
            name: "remarks",
            message: "Enter Remarks:"
        }
    ]);

    const result = updateComplaintStatus(
        complaintId,
        newStatus,
        remarks || "Status updated",
        "CLI"
    );

    if (!result) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log("\n✅ Complaint status updated successfully.");
}

export async function handleStatusHistory() {
    const complaintId = await askComplaintId();
    const history = getComplaintHistory(complaintId);

    if (history.length === 0) {
        console.log("\n❌ Complaint not found or no history.");
        return;
    }

    console.log("\n========================================================");
    console.log("                 📜 STATUS HISTORY");
    console.log("========================================================");

    history.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.new_status}`);
        console.log(`   Old Status : ${item.old_status || "None"}`);
        console.log(`   Remarks    : ${item.remarks}`);
        console.log(`   Updated By : ${item.updated_by}`);
        console.log(`   Time       : ${item.timestamp}`);
    });

    console.log("\n========================================================\n");
}

export async function handleSystemInformation() {
    console.log("\n========================================================");
    console.log("                ℹ️ SYSTEM INFORMATION");
    console.log("========================================================");

    console.log("Project       : Rail Madad AI");
    console.log("Version       : 1.0.0");
    console.log("Runtime       : Node.js");
    console.log("Language      : JavaScript");
    console.log("Database      : SQLite");
    console.log("Interface     : CLI");
    console.log("AI Approach   : Lightweight Rule-Based Classification");
    console.log("Architecture  : Node.js + SQLite + AI");

    console.log("========================================================\n");
}
