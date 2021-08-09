/** @format **/
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
};
function Switch({ value, onChange }) {
    const [selection, setSelection] = useState(value);
    return (
        <div className="switch">
            <button
                className={selection === 1 ? 'active' : ''}
                onClick={() => {
                    if (selection !== 1) {
                        setSelection(1);
                        if (onChange) {
                            onChange(1);
                        }
                    }
                }}
            >
                Yes
            </button>
            <button
                className={selection === 0 ? 'active' : ''}
                onClick={() => {
                    if (selection !== 0) {
                        setSelection(0);
                        if (onChange) {
                            onChange(0);
                        }
                    }
                }}
            >
                No
            </button>
        </div>
    );
}

Switch.propTypes = propTypes;
export default Switch;
