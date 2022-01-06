/** @format **/
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { load, save } from './API';

function StaticFeedback() {
    const [payload, setPayload] = useState(null);
    const [data, setData] = useState({});
    const router = useRouter();

    return <h2>loading...</h2>;
}

export default StaticFeedback;
