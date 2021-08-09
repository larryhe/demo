/** @format **/
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Scale from './Scale';
import Switch from './Switch';
import { load, save } from './API';

function DynamicFeedback() {
    const [questions, setQuestions] = useState([]);
    const [data, setData] = useState({});
    const router = useRouter();
    useEffect(() => {
        load('/api/dynamic').then((response) => {
            console.log('Success:', response);
            setQuestions(response);
        });
    }, []);
    const renderAnswer = (answer, questionId) => {
        if (answer.type === 'Scale') {
            return (
                <Scale
                    value={data[questionId]}
                    onChange={(value) => {
                        setData((prev) => ({ ...prev, [questionId]: value }));
                    }}
                />
            );
        }
        if (answer.type === 'Switch') {
            return (
                <Switch
                    value={data[questionId]}
                    onChange={(value) => {
                        setData((prev) => ({ ...prev, [questionId]: value }));
                    }}
                />
            );
        }
        if (answer.type === 'Input') {
            return (
                <textarea
                    id="input"
                    rows={10}
                    cols={60}
                    value={data[questionId]}
                    onChange={(event) => {
                        setData((prev) => ({ ...prev, [questionId]: event.target.value }));
                    }}
                ></textarea>
            );
        }
    };
    if (questions.length > 0) {
        return (
            <div className="feedback">
                {questions.map((question) => {
                    return (
                        <div key={question.id}>
                            <h3>{question.text}</h3>
                            {renderAnswer(question.answer, question.id)}
                        </div>
                    );
                })}
                <div>
                    <button
                        onClick={() => {
                            save('/api/dynamic', data);
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

export default DynamicFeedback;
