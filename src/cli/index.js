import initializeDatabase from "../database/schema.js";

import { showMenu } from "./menu.js";

import {
    handleRegisterComplaint,
    handleViewComplaint,
    handleTrackComplaint,
    handleUpdateComplaintStatus,
    handleStatusHistory
} from "./commands.js";

async function startApplication() {
    console.clear();

    console.log("========================================================");
    console.log("              🚆 RAIL MADAD AI");
    console.log("       AI Complaint Management System");
    console.log("========================================================");

    try {
        initializeDatabase();

        console.log("✓ Database Connected");
        console.log("✓ Database Initialized");

        let running = true;

        while (running) {
            const choice = await showMenu();

            switch (choice) {
                case "Register Complaint":
                    await handleRegisterComplaint();
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
                    console.log("\n");
                    console.log("========================================================");
                    console.log("                 SYSTEM INFORMATION");
                    console.log("========================================================");
                    console.log("Project      : Rail Madad AI");
                    console.log("Version      : 1.0.0");
                    console.log("Runtime      : Node.js");
                    console.log("Database     : SQLite");
                    console.log("Interface    : CLI");
                    console.log("Architecture : Node.js + SQLite");
                    console.log("Status       : Running");
                    console.log("========================================================");
                    break;

                case "Exit":
                    running = false;
                    break;
            }
        }

        console.log("\n✓ Rail Madad AI closed successfully.");

    } catch (error) {
        console.error("\n❌ Application failed to start.");
        console.error(error.message);
        process.exit(1);
    }
}

startApplication();