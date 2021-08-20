import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
       .string()
       .trim()
       .required('First name is required')
       .min(3, 'Name must be 3 characters long'),
    last_name: yup
       .string()
       .trim()
       .required('Last name is required')
       .min(3, 'Name must be 3 characters long'),
    email: yup
       .string()
       .trim()
       .email('Must be a valid email address')
       .required('Email is required'),
    password: yup
       .string()
       .trim()
       .required('password is required'),
    termsOfService: yup.boolean()
})

export default formSchema