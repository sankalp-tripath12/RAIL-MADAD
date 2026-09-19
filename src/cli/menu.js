import inquirer from "inquirer";

export async function showMenu() {
    console.log("\n");
    console.log("========================================================");
    console.log("              🚆 RAIL MADAD AI");
    console.log("       AI Complaint Management System");
    console.log("========================================================");

    console.log("\n✓ Database Connected");
    console.log("✓ System Ready");

    console.log("\n========================================================");

    const answer = await inquirer.prompt([
        {
            type: "select",
            name: "choice",
            message: "Select an option:",
            choices: [
                "Register Complaint",
                "Analyze Complaint",
                "View Complaint",
                "Track Complaint",
                "Update Complaint Status",
                "Status History",
                "System Information",
                "Exit"
            ]
        }
    ]);

    return answer.choice;
}