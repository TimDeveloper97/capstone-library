import React from 'react'
import { Form } from 'react-bootstrap'

export default function Input(props) {
    
  return (
    <Form.Group>
          <Form.Control type={props.type} placeholder={props.placeholder} required={props.required} name={props.name} isInvalid={props.isInvalid} />
          <Form.Control.Feedback type="invalid">
            {props.errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
  )
}
