import { Schema, model } from "mongoose";

const LectureSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: "instructor", required: true },
    // createdBy: { type: Schema.Types.ObjectId, refPath: "createdByRole", required: true },
    // createdByRole: { type: String, enum: ["Instructor", "Admin"], required: true },
    L_Name: { type: String, required: true },
    L_Date: { type: Date, required: true },
    L_link: { type: String, required: true },
    Subject: { type: String, required: true },
    L_Type: { type: String, required: true },
    L_Instructor: { type: String, required: true }
});

const creationData = model("creation", LectureSchema);



export { creationData }
