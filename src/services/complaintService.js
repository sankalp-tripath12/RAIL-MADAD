import db from "../database/database.js";
import { generateComplaintId } from "../utils/helpers.js";
import { classifyComplaint } from "../ai/classifier.js";

export function registerComplaint(complaintData) {
    const complaintId = generateComplaintId();
    const now = new Date().toISOString();

    const insertComplaint = db.prepare(`
        INSERT INTO complaints (
            complaint_id,
            passenger_name,
            phone,
            train_number,
            pnr,
            coach_number,
            seat_number,
            journey_date,
            description,
            media_path,
            media_type,
            status,
            created_at,
            updated_at
        )
        VALUES (
            @complaint_id,
            @passenger_name,
            @phone,
            @train_number,
            @pnr,
            @coach_number,
            @seat_number,
            @journey_date,
            @description,
            @media_path,
            @media_type,
            @status,
            @created_at,
            @updated_at
        )
    `);

    insertComplaint.run({
        complaint_id: complaintId,
        passenger_name: complaintData.passengerName,
        phone: complaintData.phone,
        train_number: complaintData.trainNumber,
        pnr: complaintData.pnr,
        coach_number: complaintData.coachNumber,
        seat_number: complaintData.seatNumber,
        journey_date: complaintData.journeyDate,
        description: complaintData.description,
        media_path: complaintData.mediaPath || null,
        media_type: complaintData.mediaType || null,
        status: "REGISTERED",
        created_at: now,
        updated_at: now
    });

    const insertHistory = db.prepare(`
        INSERT INTO status_history (
            complaint_id,
            old_status,
            new_status,
            remarks,
            updated_by,
            timestamp
        )
        VALUES (
            @complaint_id,
            @old_status,
            @new_status,
            @remarks,
            @updated_by,
            @timestamp
        )
    `);

    insertHistory.run({
        complaint_id: complaintId,
        old_status: null,
        new_status: "REGISTERED",
        remarks: "Complaint registered",
        updated_by: "SYSTEM",
        timestamp: now
    });

    return complaintId;
}


export function getComplaintById(complaintId) {
    return db.prepare(`
        SELECT *
        FROM complaints
        WHERE complaint_id = ?
    `).get(complaintId);
}


export function getComplaintHistory(complaintId) {
    return db.prepare(`
        SELECT *
        FROM status_history
        WHERE complaint_id = ?
        ORDER BY timestamp ASC
    `).all(complaintId);
}


export function updateComplaintStatus(
    complaintId,
    newStatus,
    remarks = "Status updated",
    updatedBy = "CLI"
) {
    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        return null;
    }

    const now = new Date().toISOString();

    db.prepare(`
        UPDATE complaints
        SET
            status = ?,
            official_remarks = ?,
            updated_at = ?,
            resolved_at = CASE
                WHEN ? = 'RESOLVED' THEN ?
                ELSE resolved_at
            END
        WHERE complaint_id = ?
    `).run(
        newStatus,
        remarks,
        now,
        newStatus,
        now,
        complaintId
    );

    db.prepare(`
        INSERT INTO status_history (
            complaint_id,
            old_status,
            new_status,
            remarks,
            updated_by,
            timestamp
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        complaintId,
        complaint.status,
        newStatus,
        remarks,
        updatedBy,
        now
    );

    return getComplaintById(complaintId);
}


export function analyzeComplaintCategory(complaintId) {
    const complaint = getComplaintById(complaintId);

    if (!complaint) {
        return null;
    }

    const result = classifyComplaint(complaint.description);

    db.prepare(`
        UPDATE complaints
        SET
            category = ?,
            confidence = ?,
            updated_at = ?
        WHERE complaint_id = ?
    `).run(
        result.category,
        result.confidence,
        new Date().toISOString(),
        complaintId
    );

    return {
        complaintId: complaintId,
        category: result.category,
        confidence: result.confidence
    };
}