/** format **/
import sample from './data.json';
import get from 'lodash/get';

const findBy = (resourceType, path, defaultValue) => {
    const resources = sample.entry || [];
    const resource = resources.find((item) => item.resource.resourceType === resourceType);
    return get(resource, path, defaultValue);
};
export const getPatientFirstName = () => {
    const firstName = findBy('Patient', 'resource.name[0].given', []);
    return firstName.join(' ');
};

export const getDoctorLastName = () => {
    return findBy('Doctor', 'resource.name[0].family', '');
};

export const getDiagnosis = () => {
    return findBy('Diagnosis', 'resource.code.coding[0].name', '');
};

export const persist = (data) => {
    console.log(`persisting data.... ${JSON.stringify(data, null, 4)}`);
};
