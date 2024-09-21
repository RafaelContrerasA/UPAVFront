import React from 'react'

const FilterBtnDesk = ({title, children}) => {
  return (
    <div className=' w-fit'>
        <p className=' p-2 bg-custom-rosa text-sm'>{title}</p>
        <div className=' bg-white p-2'>
            {children}
        </div>
    </div>
  )
}

export default FilterBtnDesk