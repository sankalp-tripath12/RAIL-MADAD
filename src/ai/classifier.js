const CATEGORY_KEYWORDS = {
    Electrical: [
        "ac",
        "air conditioner",
        "fan",
        "light",
        "electric",
        "electricity",
        "charging",
        "socket",
        "power"
    ],

    Cleanliness: [
        "dirty",
        "garbage",
        "trash",
        "dust",
        "unclean",
        "toilet",
        "washroom",
        "smell",
        "filthy"
    ],

    Maintenance: [
        "repair",
        "broken",
        "not working",
        "damaged",
        "maintenance",
        "fault",
        "leak"
    ],

    "Water Supply": [
        "water",
        "drinking water",
        "tap",
        "wash basin",
        "water supply"
    ],

    Food: [
        "food",
        "meal",
        "catering",
        "restaurant",
        "tea",
        "coffee",
        "food quality"
    ],

    Security: [
        "theft",
        "stole",
        "stolen",
        "steal",
        "security",
        "fight",
        "violence",
        "threat",
        "robbery",
        "robbed",
        "suspicious"
    ],

    "Staff Behaviour": [
        "staff",
        "employee",
        "conductor",
        "attendant",
        "rude",
        "misbehaviour",
        "behaviour"
    ],

    Medical: [
        "medical",
        "doctor",
        "injury",
        "injured",
        "sick",
        "hospital",
        "medicine",
        "emergency"
    ],

    "Coach Damage": [
        "coach damaged",
        "seat broken",
        "window broken",
        "door broken",
        "berth broken",
        "coach damage"
    ],

    Ticketing: [
        "ticket",
        "booking",
        "reservation",
        "pnr",
        "refund",
        "ticket counter"
    ],

    "Train Delay": [
        "delay",
        "delayed",
        "late",
        "train late",
        "running late"
    ]
};

export function classifyComplaint(text) {
    if (!text || typeof text !== "string") {
        return {
            category: "Other",
            confidence: 0
        };
    }

    const normalizedText = text.toLowerCase().trim();

    let bestCategory = "Other";
    let bestMatches = [];

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        const matches = keywords.filter(keyword =>
            normalizedText.includes(keyword.toLowerCase())
        );

        if (matches.length > bestMatches.length) {
            bestCategory = category;
            bestMatches = matches;
        }
    }

    /*
     * Explicit category priority rules.
     * These prevent generic words from incorrectly winning
     * over a more specific complaint category.
     */

    const waterKeywords = [
        "water",
        "drinking water",
        "water supply",
        "tap",
        "wash basin"
    ];

    const hasWaterKeyword = waterKeywords.some(keyword =>
        normalizedText.includes(keyword)
    );

    if (hasWaterKeyword) {
        return {
            category: "Water Supply",
            confidence: 0.80
        };
    }

    if (bestMatches.length === 0) {
        return {
            category: "Other",
            confidence: 0
        };
    }

    const confidence = Math.min(
        0.95,
        0.60 + (bestMatches.length - 1) * 0.10
    );

    return {
        category: bestCategory,
        confidence: Number(confidence.toFixed(2))
    };
}
