import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './Form';
import axios from 'axios';
import * as yup from 'yup';
import schema from './validation/formSchema';
import { ValidationError } from 'yup';

{/*///////Initial States/////// */}

const initialFormValues = {
  name: '',
  email: '',
  role: '',
  password: '',
  termsOfService: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  role: '',
  password: '',
}

const initialUser = []
const initialDisabled = true

export default function App() {

    const [users, setUsers] = useState(initialUsers) 
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled) 


    const getUsers = () => {
      axios.get(`https://reqres.in/api/users`)
      .then(res => {
        setUsers(res.data);
      }).catch(err => console.error(err))
    }

    const postNewUser = newUser => {
      axios.post(`https://reqres.in/api/users`, newUser)
          .then(res => {
            setUsers([res.data, ...users]);
        }).catch(err => console.error(err));
  
      setFormValues(initialFormValues);
    }

    const inputChange = (name, value) => {
       validate(name, value)
       setFormValues({
         ...formValues,
         [name]: value
       })
    }

    const formSubmit = () => {


      const newUser = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        role: formValues.role.trim(),
        password: formValues.password.trim(),
        termsOfService: []
      }

      postNewUser(newUser);
    }

    useEffect(() => {
      getUsers()
    }, [])
  
    useEffect(() => {
      // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
      schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

    return (
    <div className='container'>
      <header><h1>New User Onboarding App</h1></header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      
    </div>
    );
    }


