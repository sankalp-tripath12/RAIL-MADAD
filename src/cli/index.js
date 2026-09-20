import { showMenu } from "./menu.js";

import {
    handleRegisterComplaint,
    handleAnalyzeComplaint,
    handleViewComplaint,
    handleTrackComplaint,
    handleUpdateComplaintStatus,
    handleStatusHistory,
    handleSystemInformation
} from "./commands.js";

async function startCLI() {
    let running = true;

    while (running) {
        const choice = await showMenu();

        switch (choice) {
            case "Register Complaint":
                await handleRegisterComplaint();
                break;

            case "Analyze Complaint":
                await handleAnalyzeComplaint();
                break;

            case "View Complaint":
                await handleViewComplaint();
                break;

            case "Track Complaint":
                await handleTrackComplaint();
                break;

            case "Update Complaint Status":
                await handleUpdateComplaintStatus();
                break;

            case "Status History":
                await handleStatusHistory();
                break;

            case "System Information":
                await handleSystemInformation();
                break;

            case "Exit":
                console.log("\n🚆 Thank you for using Rail Madad AI.");
                console.log("Exiting system...\n");
                running = false;
                break;

            default:
                console.log("\n❌ Invalid option.");
        }
    }
}

startCLI();
