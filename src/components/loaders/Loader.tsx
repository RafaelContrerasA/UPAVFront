import React from 'react'
import { helix } from 'ldrs';


helix.register()

const Loader = () => {
    return (
        <>
            <l-helix
                size={"150"}
                color={"#4A001F"}
                speed={2.5}>
            </l-helix>
        </>
    )
}

export default Loader