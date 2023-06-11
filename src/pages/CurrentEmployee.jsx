import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useSelector } from "react-redux";

function CurrentEmployee() {

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const day = ("0" + date.getDate()).slice(-2)
        const year = date.getFullYear()
        return month + "/" + day + "/" + year;
    }

    const employees = useSelector((state) => state.createEmployee.employees);
    const listeEmployee = [];

    for (const element of employees) {
        const dateOfBirth = element.dateOfBirth !== null ?  formatDate(element.dateOfBirth) : null
        const startDate = element.startDate !== null ?  formatDate(element.startDate) : null

        const infosEmployee = {
            firstName: element.firstName,
            lastName: element.lastName,
            dateOfBirth: dateOfBirth,
            startDate: startDate,
            street: element.street,
            city: element.city,
            state: element.state.label,
            zipCode: element.zipCode,
            department: element.department.value
        }
        listeEmployee.push(infosEmployee);
    }
    
    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true
        },
        {
            name: 'Start Date',
            selector: row => row.startDate,
            sortable: true
        },
        {
            name: 'Department',
            selector: row => row.department,
            sortable: true
        },
        {
            name: 'Date of Birth',
            selector: row => row.dateOfBirth,
            sortable: true
        },
        {
            name: 'Street',
            selector: row => row.street,
            sortable: true
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true
        },
        {
            name: 'State',
            selector: row => row.state,
            sortable: true
        },
        {
            name: 'Zip Code',
            selector: row => row.zipCode,
            sortable: true
        }
    ]

    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(listeEmployee);

    const searchFilter = (event) => {
        const textValue = event.target.value.toLowerCase();
        setSearchText(textValue);

        const filteredData = listeEmployee.filter((row) => {
            return row.firstName.toLowerCase().includes(textValue);
        })
        setFilteredData(filteredData);
    }

    return (
        <div id='table'>
            <div id='btn_search'>
                <input type="text" value={searchText} onChange={searchFilter} />
            </div>
            <DataTable
                columns={columns}
                data={searchText.length > 0 ? filteredData : listeEmployee}
                pagination
            ></DataTable>
        </div>
    )
}
export default CurrentEmployee;