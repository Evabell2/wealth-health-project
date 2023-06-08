import React from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import { optionsStates, optionsDepartments } from '../data'
import Modale from 'modale-component-react/dist/components/Modale'
import { useDispatch, useSelector } from "react-redux";
import { modale, setBirthDate, setStartDate, setSelectedOption, setDepartment, setFormData, addEmployee } from '../redux'

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

    // Modale
    const displayModale = useSelector((state) => state.createEmployee.displayModale);
    const handleDisplayModale = () => {
      dispatch(modale());
    }

    const birthDate = useSelector((state) => state.createEmployee.birthDate);
    const startDate = useSelector((state) => state.createEmployee.startDate);
    const selectedOption = useSelector((state) => state.createEmployee.selectedOption);
    const formData = useSelector((state) => state.createEmployee.formData);

    const handleChange = (event) => {
      const { name, value } = event.target;
      dispatch(setFormData({ [name]: value }));
    }

    const handleBirthDateChange = (date) => {
      dispatch(setBirthDate(date.getTime()));
    }

    const handleDateChange = (date) => {
      dispatch(setStartDate(date.getTime()));
    }

    const handleStateChange = (option) => {
      dispatch(setSelectedOption(option));
    }

    const handleDepartmentChange = (option) => {
      dispatch(setDepartment(option));
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const employee = { ...formData }
      dispatch(addEmployee(employee))
      dispatch(setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        startDate: null,
        department: "",
        street: "",
        city: "",
        state: "",
        zipCode: ""
      }));
    }
  
  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="First Name"
            name="firstName"
            onChange={handleChange} 
        />
        <input 
            type="text"
            placeholder="Last Name" 
            name="lastName"
            onChange={handleChange} 
        />

        < DatePicker 
            selected={birthDate}
            onChange={handleBirthDateChange}
            placeholderText="Date of Birth"
            name="dateOfBirth"
        />

        < DatePicker 
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="Start Date"
            name="startDate"
        />

        <fieldset>
          <legend>Address</legend>
          <input
            type="text"
            placeholder="Street"
            name="street"
            onChange={handleChange} 
            
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={handleChange} 
          />

        <Select
            defaultValue={selectedOption}
            onChange={handleStateChange}
            placeholder="Select an option"
            name="state"
            styles={customStyles}
            options={optionsStates.map(state => ({
                value: state.abbreviation,
                label: state.name
            }))}
            
        />

          <input 
            type="number" 
            placeholder="Zip Code"
            name="zipCode"
            onChange={handleChange}  
        />
        </fieldset>

        <div className='department'>
          <label htmlFor="department">Department</label>
          <Select
            defaultValue={selectedOption}
            onChange={handleDepartmentChange}
            placeholder="Select an option"
            name="department"
            styles={customStyles}
            options={optionsDepartments}
        />
        </div>
        
      <button type='submit' onClick={handleDisplayModale}>Save</button>
      </form>

      <Modale display={displayModale} setDisplayModale={handleDisplayModale} text="" />
    </div>
  )
}
export default CreateEmployee;

