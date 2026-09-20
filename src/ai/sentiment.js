const NEGATIVE_KEYWORDS = [
    "bad",
    "worst",
    "dirty",
    "filthy",
    "angry",
    "rude",
    "terrible",
    "poor",
    "disappointed",
    "unacceptable",
    "problem",
    "issue",
    "broken",
    "stolen",
    "theft",
    "delay",
    "late",
    "not working",
    "wotking",
    "no water",
    "garbage",
    "smell",
    "danger",
    "threat"
];

const POSITIVE_KEYWORDS = [
    "good",
    "great",
    "excellent",
    "clean",
    "helpful",
    "thank",
    "thanks",
    "satisfied",
    "appreciate",
    "comfortable",
    "resolved"
];

export function analyzeSentiment(text) {
    if (!text || typeof text !== "string") {
        return {
            sentiment: "NEUTRAL",
            matchedKeywords: []
        };
    }

    const normalizedText = text.toLowerCase().trim();

    const negativeMatches = NEGATIVE_KEYWORDS.filter(keyword =>
        normalizedText.includes(keyword)
    );

    const positiveMatches = POSITIVE_KEYWORDS.filter(keyword =>
        normalizedText.includes(keyword)
    );

    if (negativeMatches.length > positiveMatches.length) {
        return {
            sentiment: "NEGATIVE",
            matchedKeywords: negativeMatches
        };
    }

    if (positiveMatches.length > negativeMatches.length) {
        return {
            sentiment: "POSITIVE",
            matchedKeywords: positiveMatches
        };
    }

    return {
        sentiment: "NEUTRAL",
        matchedKeywords: []
    };
}
