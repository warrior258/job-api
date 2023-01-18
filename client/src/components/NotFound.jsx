import React from 'react'

const NotFound = () => {
  return (
    <div className='h-[80vh] grid place-items-center'>
        <div className='text-white flex gap-5 items-center'>
            <h1 className='text-7xl font-semibold'>404</h1>
            <div className='bg-white w-1 h-16'></div>
            <p className='text-lg'>Page Not Found 💀</p>
        </div>
    </div>
  )
}

export default NotFound