/** format **/
import { getPatientFirstName, getDoctorLastName, getDiagnosis, persist } from './util';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const firstName = getPatientFirstName();
        const lastName = getDoctorLastName();
        const diagnosis = getDiagnosis();
        const questions = [
            {
                id: 1,
                text: `Hi ${firstName}, on a scale of 1-10, would you recommend Dr ${lastName} to a friend or family member? 1 = Would not recommend 10 = Would strongly recommend`,
                answer: { id: 'scale', type: 'Scale', min: 1, max: 10 },
            },
            {
                id: 2,
                text: `You were diagnosed with ${diagnosis}. Did Dr ${lastName} explain how to manage this diagnosis in a way you could understand?`,
                answer: { id: 'switch', type: 'Switch' },
            },
            {
                id: 3,
                text: `How do you feel about being diagnosed with ${diagnosis}?`,
                answer: { id: 'input', type: 'Input' },
            },
        ];
        res.status(200).json(questions);
    } else if (req.method === 'POST') {
        const data = req.body;
        persist(data);
        res.status(200).json({ success: 'Data saved' });
    }
}
