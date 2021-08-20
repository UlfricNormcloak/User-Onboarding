import React, { useState, useEffect } from 'react';
import './App.css';
import UserForm from './Form';
import axios from 'axios';
import * as yup from 'yup';
import schema from './validation/formSchema';
import User from './User';

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  avatar: '',
  termsOfService: false,
}
const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  avatar: '',
  initialFormErrors: '',
}

const initialUsers = []
const initialDisabled = true

export default function App() {

    const [users, setUsers] = useState(initialUsers) 
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled) 


    const getUsers = () => {
      axios.get(`https://reqres.in/api/users`)
      .then(res => {
        console.log(res)
        setUsers(res.data.data);
      }).catch(err => console.error(err))
    }

    const postNewUser = newUser => {
      axios.post(`https://reqres.in/api/users`, newUser)
          .then(res => {
            setUsers([...users, res.data]);
        }).catch(err => console.error(err));
  
      setFormValues(initialFormValues);
    }

    const validate = (name, value) => {
      yup.reach(schema, name)
        .validate(value)
        .then(() => setFormErrors({ ...formErrors, [name]: '' }))
        .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
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
        first_name: formValues.name.trim(),
        last_name: formValues.name.trim(),
        email: formValues.email.trim(),
        avatar: formValues.avatar.trim(),
        termsOfService: true
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

      {
        users.map( user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
      
    </div>
    );
    }


