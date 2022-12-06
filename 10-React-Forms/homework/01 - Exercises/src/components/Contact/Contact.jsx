import React from 'react'
import './Contact.modules.css'

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = ({name,email,phone,subject,message}) => {
  const errors = {}

  // errors.name = inputs.name === "" ? "Se requiere un nombre" : errors.name

  if(name === "") errors.name = "Se requiere un nombre";
  if(!regexEmail.test(email)) errors.email = "Debe ser un correo electrónico";
  if(phone<=0) errors.phone = "Sólo números positivos";
  if(!subject) errors.subject = "Se requiere un asunto";
  if(!message) errors.message = "Se requiere un mensaje";

  return errors;
}


export default function Contact () {
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    phone: 0,
    subject: "",
    message: ""
  })
  
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleChange = (event) => {
    const property = event.target.name
    const value = event.target.value
    setInputs({
      ...inputs,
      [property]: value
    })

    setErrors(validate({
      ...inputs,
      [property]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!Object.keys(errors).length) {
      alert("Datos completos");
      setErrors({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
      setInputs({
        name: "",
        email: "",
        phone: 0,
        subject: "",
        message: ""
      })
    } else {
      alert("Debes corregir los errores")
    }
  }

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" name="name" value={inputs.name} 
      onChange={handleChange} className={errors.name && "warning"} placeholder='Escribe tu nombre...' />
      {errors.name && <p className='danger'>{errors.name}</p>} 

      <label htmlFor="email">Correo Electrónico:</label>
      <input type="text" name='email' value={inputs.email} 
      onChange={handleChange} className ={errors.email && "warning"} placeholder='Escribe tu email...' />
      {errors.email && <p className='danger'>{errors.email}</p>} 

      <label htmlFor="phone">Teléfono:</label>
      <input type="number" name="phone" value={inputs.phone} 
      onChange={handleChange} className ={errors.phone && "warning"} placeholder='Escribe un teléfono...' />
      {errors.phone && <p className='danger'>{errors.phone}</p>} 

      <label htmlFor="subject">Asunto:</label>
      <input type="text" name="subject" value={inputs.subject}
      onChange={handleChange} className ={errors.subject && "warning"} placeholder='Escribe el asunto...' />
      {errors.subject && <p className='danger'>{errors.subject}</p>} 

      <label htmlFor="message">Mensaje:</label>
      <textarea name="message" cols="30" rows="10" placeholder='Escribe tu mensaje...'
      type="text" value={inputs.message} onChange={handleChange} className={errors.message && "warning"}></textarea>
      {errors.message && <p className='danger'>{errors.message}</p>} 

      <button type='submit'>Enviar</button>
    </form>
  </div>
  )
}
