import db from "../database/database.js";
import { generateComplaintId } from "../utils/helpers.js";

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
