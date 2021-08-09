/** format **/
import { getPatientFirstName, getDoctorLastName, getDiagnosis, persist } from './util';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const firstName = getPatientFirstName();
        const lastName = getDoctorLastName();
        const diagnosis = getDiagnosis();
        res.status(200).json({ patient: { firstName }, doctor: { lastName }, diagnosis });
    } else if (req.method === 'POST') {
        const data = req.body;
        persist(data);
        res.status(200).json({ success: 'Data saved' });
    }
}
