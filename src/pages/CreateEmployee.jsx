import React from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import { optionsStates, optionsDepartments } from '../data'
import Modale from 'modale-component-react/dist/components/Modale'
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from 'react';
import { setFormErrors, setEmptyFields, modale, setBirthDate, setStartDate, setSelectedOption, setDepartment, setFormData, addEmployee } from '../redux'

function CreateEmployee() {
  
  const dispatch = useDispatch()

    // style des options
    const customStyles = {
        option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#e91e634f' : 'white',
        ':hover': {
            backgroundColor: '#e91e634f',
        },
        }),
        control: (baseStyles) => ({
            ...baseStyles,
            boxShadow: 'none',
            border: 'none'
        }),
    }

    // entrées formulaire
    const formErrors = useSelector((state) => state.createEmployee.formErrors)
    const emptyFields = useSelector((state) => state.createEmployee.emptyFields)
    const birthDate = useSelector((state) => state.createEmployee.birthDate)
    const startDate = useSelector((state) => state.createEmployee.startDate)
    const formData = useSelector((state) => state.createEmployee.formData)
    const displayModale = useSelector((state) => state.createEmployee.displayModale)

    const handleChange = (event) => {
      const { name, value } = event.target
      dispatch(setFormData({ [name]: value }))
    }

    const handleBirthDateChange = (date) => {
      dispatch(setBirthDate(date.getTime()))
    }

    const handleDateChange = (date) => {
      dispatch(setStartDate(date.getTime()))
    }

    const handleStateChange = (option) => {
      dispatch(setSelectedOption(option))
      setSelectedState(option)
    }

    const handleDepartmentChange = (option) => {
      dispatch(setDepartment(option))
      setSelectedDepartment(option)
    }


    const handleSubmit = (event) => {
      event.preventDefault()

      const emptyFields = Object.keys(formData).filter((key) => {
        const value = formData[key]
        return value === null || value === ''
      })
    
      if (emptyFields.length > 0) {
        const error = 'Please fill in all fields.'
        dispatch(setFormErrors(error))
        dispatch(setEmptyFields(emptyFields))
      }
      else {
        const employee = { ...formData }
        dispatch(addEmployee(employee))
        dispatch(modale())
        resetForm()
      }
    }

    const formRef = useRef(null)
    const [selectedState, setSelectedState] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const resetForm = () => {
      formRef.current.reset()
      dispatch(setBirthDate(null))
      dispatch(setStartDate(null))
      dispatch(setSelectedOption(null))
      dispatch(setDepartment(null))
      dispatch(setFormData({}))
      setSelectedState(null)
      setSelectedDepartment(null)
    }


  return (

    <div id="form">
      <form onSubmit={handleSubmit} ref={formRef}>
        <input 
            type="text" 
            placeholder="First Name"
            name="firstName"
            onChange={handleChange} 
            className={emptyFields.includes('firstName') ? 'error-field' : ''}
            />

        <input 
            type="text"
            placeholder="Last Name" 
            name="lastName"
            onChange={handleChange} 
            className={emptyFields.includes('lastName') ? 'error-field' : ''}
        />

        < DatePicker 
            selected={birthDate}
            onChange={handleBirthDateChange}
            placeholderText="Date of Birth"
            name="dateOfBirth"
            className={emptyFields.includes('dateOfBirth') ? 'error-field' : ''}
        />

        < DatePicker 
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="Start Date"
            name="startDate"
            className={emptyFields.includes('startDate') ? 'error-field' : ''}
        />

        <fieldset>
          <legend>Address</legend>
          <input
            type="text"
            placeholder="Street"
            name="street"
            onChange={handleChange} 
            className={emptyFields.includes('street') ? 'error-field' : ''}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={handleChange} 
            className={emptyFields.includes('city') ? 'error-field' : ''}
          />

        <Select
            value={selectedState}
            onChange={handleStateChange}
            placeholder="Select an option"
            name="state"
            styles={customStyles}
            options={optionsStates.map(state => ({
                value: state.abbreviation,
                label: state.name
            }))}
            className={emptyFields.includes('state') ? 'error-field' : ''}
        />

          <input 
            type="number" 
            placeholder="Zip Code"
            name="zipCode"
            onChange={handleChange}  
            className={emptyFields.includes('zipCode') ? 'error-field' : ''}
        />
        </fieldset>

        <div className='department'>
          <label htmlFor="department">Department</label>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            placeholder="Select an option"
            name="department"
            styles={customStyles}
            options={optionsDepartments}
            className={emptyFields.includes('department') ? 'error-field' : ''}
        />
        </div>

      <button type='submit'>Save</button>


      {Object.keys(formErrors).length > 0 && (
        <span className="error">Please fill in all fields.</span>
      )}      
      </form>

      <Modale display={displayModale} setDisplayModale={() => dispatch(modale())} text="" />
        
    </div>
  )
}
export default CreateEmployee;

