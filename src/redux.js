import { createSlice, combineReducers } from "@reduxjs/toolkit"

const createEmployeeSlice = createSlice ({
    name: "createEmployee",
    initialState: {
        formErrors: {},
        emptyFields: [],
        displayModale: false,
        birthDate: null,
        startDate: null,
        selectedOption: null,
        formData: {
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            startDate: null,
            department: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
        },
        employees: [],
    },
    reducers: {
        setFormErrors: (state, action) => {
            state.formErrors = action.payload
        },
        setEmptyFields: (state, action) => {
            state.emptyFields = action.payload;
        },
        modale: (state) => {
            state.displayModale = !state.displayModale
        },
        setBirthDate: (state, action) => {
            state.birthDate = action.payload;
            state.formData.dateOfBirth = action.payload;
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload;
            state.formData.startDate = action.payload;
        },
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload;
            state.formData.state = action.payload;
        },
        setDepartment: (state, action) => {
            state.selectedOption = action.payload;
            state.formData.department = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        addEmployee: (state, action) => {
            const employee = { ...action.payload };
            state.employees.push(employee);
        },
    },
})

export const {
    setFormErrors,
    setEmptyFields,
    modale,
    setBirthDate,
    setStartDate,
    setSelectedOption,
    setDepartment,
    setFormData,
    addEmployee
}   = createEmployeeSlice.actions


const rootReducer = combineReducers({
    createEmployee: createEmployeeSlice.reducer,
})
  
export default rootReducer;

