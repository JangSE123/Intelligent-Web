import React from 'react';

function MobileMain(props) {
    return (
        <div>
            {Array.from({ length: 100 }, (_, i) => (
                <p key={i}>test</p>
            ))}
        </div>
    );
}

export default MobileMain;