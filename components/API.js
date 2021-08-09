/** @format **/

export const load = (url) => {
    return fetch(url).then((response) => response.json());
};

export const save = (url, data) => {
    const rawData = JSON.stringify(data);
    console.log(`saving data===${rawData}`);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: rawData,
    }).then((response) => response.json());
};
