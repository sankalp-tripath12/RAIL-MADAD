const DEPARTMENT_MAPPING = {
    Electrical: "Electrical Maintenance",
    Cleanliness: "Housekeeping",
    Maintenance: "Maintenance Department",
    "Water Supply": "Water & Sanitation",
    Food: "Catering Department",
    Security: "Railway Security",
    "Staff Behaviour": "Staff Administration",
    Medical: "Medical Department",
    "Coach Damage": "Coach Maintenance",
    Ticketing: "Ticketing Department",
    "Train Delay": "Operations Department",
    Other: "General Help Desk"
};

export function routeComplaint(category) {
    if (!category || typeof category !== "string") {
        return {
            department: "General Help Desk"
        };
    }

    return {
        department:
            DEPARTMENT_MAPPING[category] || "General Help Desk"
    };
}
