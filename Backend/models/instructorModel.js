import { Schema } from "mongoose";

const Lectures = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "instructor", required: true },
    L_Name: { type: String },
    L_Date: { type: String },
    L_link: { type: String },
    Subject: { type: String },
    L_Type: { type: String },
    L_Instructor: { type: String }
})

