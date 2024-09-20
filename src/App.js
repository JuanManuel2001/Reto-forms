import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

  // Estado para los valores del formulario
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});

  // Estado para el estado de validación
  const [validationStates, setValidationStates] = useState({
    emailState: true, 
    passwordState: true
  });

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Función para validar la contraseña
  const validatePassword = (password) => {
    return password.length >= 9 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  }

  // Actualiza el valor del correo y valida
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormValues({...formValues, email });
    setValidationStates({...validationStates, emailState: validateEmail(email)});
  };

  // Actualiza el valor de la contraseña y valida
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({...formValues, password });
    setValidationStates({...validationStates, passwordState: validatePassword(password)});
  };

  // Actualiza el valor del select
  const handleSelectChange = (e) => {
    setFormValues({...formValues, favClass: e.target.value });
  };

  // Función para manejar el envío del formulario
  const clickSubmit = () => {
    if (validationStates.emailState && validationStates.passwordState) {
      alert(JSON.stringify(formValues));  // Aquí puedes hacer la llamada a fetch o cualquier otra lógica.
    } else {
      alert("El formulario contiene errores");
    }
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={handleEmailChange} 
            value={formValues.email}
            isInvalid={!validationStates.emailState} 
          />
          { !validationStates.emailState && 
            <Form.Text className="text-muted text-danger">
              El correo electrónico no es válido.
            </Form.Text>
          }
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange} 
            value={formValues.password} 
            isInvalid={!validationStates.passwordState} 
          />
          { !validationStates.passwordState && 
            <Form.Text className="text-muted text-danger">
              La contraseña debe tener al menos 9 caracteres, incluir letras y números.
            </Form.Text>
          }
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicSelect">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
