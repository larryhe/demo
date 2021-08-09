/** @format **/
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';

const propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
};
function Scale({ min, max, value, onChange }) {
    const [selection, setSelection] = useState(value);
    const list = range(min, max);
    return (
        <ul className="scale">
            {list.map((item) => {
                return (
                    <li key={item}>
                        <button
                            className={selection === item ? 'active' : ''}
                            onClick={() => {
                                if (item !== selection) {
                                    setSelection(item);
                                    if (onChange) {
                                        onChange(item);
                                    }
                                }
                            }}
                        >
                            {item}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

Scale.propTypes = propTypes;
Scale.defaultProps = {
    min: 1,
    max: 11,
};
export default Scale;
