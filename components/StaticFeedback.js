/** @format **/
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Scale from './Scale';
import Switch from './Switch';
import { load, save } from './API';

function StaticFeedback() {
    const [payload, setPayload] = useState(null);
    const [data, setData] = useState({});
    const router = useRouter();
    useEffect(() => {
        load('/api/simple').then((response) => {
            console.log('Success:', response);
            setPayload(response);
        });
    }, []);
    if (payload) {
        return (
            <div className="feedback">
                <h3>
                    Hi {payload.patient.firstName}, on a scale of 1-10, would you recommend Dr{' '}
                    {payload.doctor.lastName} to a friend or family member? 1 = Would not recommend,
                    10 = Would strongly recommend
                </h3>
                <Scale
                    value={data.scale}
                    onChange={(value) => {
                        setData((prev) => ({ ...prev, scale: value }));
                    }}
                />
                <h3>
                    You were diagnosed with {payload.diagnosis}. Did Dr {payload.doctor.lastName}{' '}
                    explain how to manage this diagnosis in a way you could understand?
                </h3>
                <Switch
                    value={data.yesNo}
                    onChange={(value) => {
                        setData((prev) => ({ ...prev, yesNo: value }));
                    }}
                />
                <h3>How do you feel about being diagnosed with {payload.diagnosis}?</h3>
                <textarea
                    rows={10}
                    cols={60}
                    value={data.input}
                    onChange={(event) => {
                        setData((prev) => ({ ...prev, input: event.target.value }));
                    }}
                ></textarea>
                <div>
                    <button
                        onClick={() => {
                            save('/api/simple', data);
                            router.push('/result');
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
    return <h2>loading...</h2>;
}

export default StaticFeedback;
