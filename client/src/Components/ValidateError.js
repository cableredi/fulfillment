import React from 'react';

export default function ValidateError(props) {

  if (props.message) {
    return (
      <div className='text-danger'>
        {props.message}
      </div>
    )
  }

  return <></>
}
