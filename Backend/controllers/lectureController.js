import { creationData } from "../models/instructorModel.js"

const scheduleStudent = async (req,res) => {

    try {
        const data = await creationData.find({})
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });

    }
}


export { scheduleStudent }