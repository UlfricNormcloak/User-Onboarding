import React from 'react'

export default function UserForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change( name, valueToUse);
      }


return (
    <form className='form container' onSubmit={onSubmit}>
        <div className='form-group submit'>
            <h1>User Onboarding Submission Form</h1>

            <button disabled={disabled}>submit</button>

            <div className='errors'>
                <div>{errors.first_name}</div>
                <div>{errors.last_name}</div>
                <div>{errors.email}</div>
                <div>{errors.avatar}</div>
                <div>{errors.termsOfService}</div>
            </div>
        </div>

        <div className='form-group inputs'>
            <h4>New Associate Information</h4>

            <label>First Name
              <input
                value={values.first_name}
                onChange={onChange}
                name='first_name'
                type='text'
                />
            </label>

            <label>Last Name&nbsp;
              <input
                value={values.last_name}
                onChange={onChange}
                name='last_name'
                type='text'
                />
            </label>

            <label>Email
              <input
                value={values.email}
                onChange={onChange}
                name='email'
                type='text'
               />
           </label>

           {/* <label>Role
              <select
                onChange={onChange}
                value={values.role}
                name='role'
              >
                <option value=''>- Select an option -</option>
                <option value='student'>Analyst I</option>
                <option value='alumni'>Analyst II</option>
                <option value='instructor'>Analyst III</option>
                <option value='tl'>Team Lead</option>
              </select>
           </label> */}

           <label>Avatar
              <input
                value={values.avatar}
                onChange={onChange}
                name='avatar'
                type='file'
              />
            </label>

            <label>Terms of Service
              <input
                type="checkbox"
                name="termsOfService"
                checked={values.termsOfService}
                onChange={onChange}
              />
            </label>

        </div>
    </form>
)
}