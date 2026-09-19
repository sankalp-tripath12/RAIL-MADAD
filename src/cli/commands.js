import inquirer from "inquirer";

import {
    registerComplaint,
    getComplaintById,
    getComplaintHistory,
    updateComplaintStatus,
    analyzeComplaintCategory
} from "../services/complaintService.js";


/*
========================================================
REGISTER COMPLAINT
========================================================
*/

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
            message: "Media File Path (leave blank if none):",
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


/*
========================================================
ANALYZE COMPLAINT
========================================================
*/

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

    console.log("--------------------------------------------------------\n");
}


/*
========================================================
ASK COMPLAINT ID
========================================================
*/

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


/*
========================================================
VIEW COMPLAINT
========================================================
*/

export async function handleViewComplaint() {
    console.log("\n========================================================");
    console.log("                 🔎 VIEW COMPLAINT");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log("\n--------------------------------------------------------");
    console.log("COMPLAINT DETAILS");
    console.log("--------------------------------------------------------");

    console.log(`Complaint ID      : ${complaint.complaint_id}`);
    console.log(`Passenger Name    : ${complaint.passenger_name}`);
    console.log(`Phone             : ${complaint.phone}`);
    console.log(`Train Number      : ${complaint.train_number}`);
    console.log(`PNR               : ${complaint.pnr}`);
    console.log(`Coach Number      : ${complaint.coach_number}`);
    console.log(`Seat Number       : ${complaint.seat_number}`);
    console.log(`Journey Date      : ${complaint.journey_date}`);
    console.log(`Description       : ${complaint.description}`);
    console.log(`Media Type        : ${complaint.media_type || "None"}`);
    console.log(`Media Path        : ${complaint.media_path || "None"}`);
    console.log(`Category          : ${complaint.category || "Not analyzed"}`);
    console.log(`Confidence        : ${complaint.confidence ?? "Not analyzed"}`);
    console.log(`Priority          : ${complaint.priority || "Not analyzed"}`);
    console.log(`Department        : ${complaint.department || "Not assigned"}`);
    console.log(`Sentiment         : ${complaint.sentiment || "Not analyzed"}`);
    console.log(`Status            : ${complaint.status}`);
    console.log(`Official Remarks  : ${complaint.official_remarks || "None"}`);
    console.log(`Created At        : ${complaint.created_at}`);
    console.log(`Updated At        : ${complaint.updated_at}`);
    console.log(`Resolved At       : ${complaint.resolved_at || "Not resolved"}`);

    console.log("--------------------------------------------------------\n");
}


/*
========================================================
TRACK COMPLAINT
========================================================
*/

export async function handleTrackComplaint() {
    console.log("\n========================================================");
    console.log("                 📍 TRACK COMPLAINT");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    const history = getComplaintHistory(complaintId);

    console.log("\n--------------------------------------------------------");
    console.log(`Complaint ID : ${complaint.complaint_id}`);
    console.log(`Current Status: ${complaint.status}`);
    console.log("--------------------------------------------------------");

    if (history.length === 0) {
        console.log("No status history available.");
        return;
    }

    history.forEach((item, index) => {
        console.log(`${index + 1}. ${item.new_status}`);
        console.log(`   Remarks: ${item.remarks}`);
        console.log(`   Updated By: ${item.updated_by}`);
        console.log(`   Time: ${item.timestamp}`);
        console.log("");
    });
}


/*
========================================================
UPDATE COMPLAINT STATUS
========================================================
*/

export async function handleUpdateComplaintStatus() {
    console.log("\n========================================================");
    console.log("             🔄 UPDATE COMPLAINT STATUS");
    console.log("========================================================");

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

    const updatedComplaint = updateComplaintStatus(
        complaintId,
        newStatus,
        remarks || "Status updated",
        "CLI"
    );

    if (!updatedComplaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    console.log("\n✅ Complaint status updated successfully.");
    console.log(`Complaint ID: ${updatedComplaint.complaint_id}`);
    console.log(`New Status: ${updatedComplaint.status}`);
}


/*
========================================================
STATUS HISTORY
========================================================
*/

export async function handleStatusHistory() {
    console.log("\n========================================================");
    console.log("                 📜 STATUS HISTORY");
    console.log("========================================================");

    const complaintId = await askComplaintId();

    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        console.log("\n❌ Complaint not found.");
        return;
    }

    const history = getComplaintHistory(complaintId);

    if (history.length === 0) {
        console.log("\nNo status history found.");
        return;
    }

    console.log(`\nComplaint ID: ${complaintId}\n`);

    history.forEach((item, index) => {
        console.log(`${index + 1}. ${item.new_status}`);
        console.log(`   Old Status : ${item.old_status || "None"}`);
        console.log(`   Remarks    : ${item.remarks}`);
        console.log(`   Updated By : ${item.updated_by}`);
        console.log(`   Time       : ${item.timestamp}`);
        console.log("");
    });
}


/*
========================================================
SYSTEM INFORMATION
========================================================
*/

export async function handleSystemInformation() {
    console.log("\n========================================================");
    console.log("                ℹ️ SYSTEM INFORMATION");
    console.log("========================================================");

    console.log("Project        : Rail Madad AI");
    console.log("Purpose        : AI Complaint Management System");
    console.log("Runtime        : Node.js");
    console.log("Language       : JavaScript");
    console.log("Database       : SQLite");
    console.log("Interface      : CLI");
    console.log("AI Approach    : Lightweight Rule-Based Classification");
    console.log("Architecture   : CLI + Services + AI + SQLite");

    console.log("========================================================\n");
}