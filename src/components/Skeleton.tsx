import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';

const Skeleton = () => {
    return (
        <>
            <Placeholder animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
        </>
    )
}

export default Skeleton




