import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
       .string()
       .trim()
       .required('Name is required')
       .min(3, 'Name must be 3 characters long'),
    email: yup
       .string()
       .trim()
       .email('Must be a valid email address')
       .required('Email is required'),
    role: yup
       .string()
       .oneOf(['Analyst I', 'Analyst II', 'Analyst III', 'Team Lead'], 'Role is required'),
    termsOfService: yup.boolean()
})

export default formSchema