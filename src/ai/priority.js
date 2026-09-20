const CRITICAL_KEYWORDS = [
    "fire",
    "accident",
    "injury",
    "medical emergency",
    "security threat",
    "violence",
    "bomb",
    "explosion"
];

const HIGH_KEYWORDS = [
    "emergency",
    "danger",
    "threat",
    "theft",
    "steal",
    "stole",
    "stolen",
    "robbery",
    "robbed",
    "assault",
    "smoke",
    "electric shock",
    "serious injury",
    "doctor"
];

const MEDIUM_KEYWORDS = [
    "broken",
    "damaged",
    "not working",
    "not wotking",
    "delay",
    "dirty",
    "water",
    "food",
    "leak",
    "repair",
    "complaint"
];

export function detectPriority(text) {
    if (!text || typeof text !== "string") {
        return {
            priority: "LOW",
            matchedKeywords: []
        };
    }

    const normalizedText = text.toLowerCase().trim();

    const criticalMatches = CRITICAL_KEYWORDS.filter(keyword =>
        normalizedText.includes(keyword)
    );

    if (criticalMatches.length > 0) {
        return {
            priority: "CRITICAL",
            matchedKeywords: criticalMatches
        };
    }

    const highMatches = HIGH_KEYWORDS.filter(keyword =>
        normalizedText.includes(keyword)
    );

    if (highMatches.length > 0) {
        return {
            priority: "HIGH",
            matchedKeywords: highMatches
        };
    }

    const mediumMatches = MEDIUM_KEYWORDS.filter(keyword =>
        normalizedText.includes(keyword)
    );

    if (mediumMatches.length > 0) {
        return {
            priority: "MEDIUM",
            matchedKeywords: mediumMatches
        };
    }

    return {
        priority: "LOW",
        matchedKeywords: []
    };
}
