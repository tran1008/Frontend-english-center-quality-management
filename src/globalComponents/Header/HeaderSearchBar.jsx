import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const testData = [{
    id: 0, 
    name: "TOEIC500",
    type: "Class"
}, {
    id: 1, 
    name: "TOEIC700",
    type: "Class"
}, {
    id: 2, 
    name: "TOEIC800",
    type: "Class"
},{
    id: 3, 
    name: "Mrs Hoa",
    type: "Teacher"
}, {
    id: 4, 
    name: "Mr Vu",
    type: "Teacher"
},{
    id: 5, 
    name: "Nguyen Thanh Trung",
    type: "Student"
}, {
    id: 6,
    name: "Doan Quoc Bao",
    type: "Student"
}]

export default function SearchBar() {
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }

    const formatResult = (testData) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>{testData.name}</span>
            <span style={{ display: 'block', textAlign: 'left' , fontSize: '14px', color: 'GrayText'}}> {testData.type}</span>
          </>
        )
      }

    return (
    
        <div style={{width:"400px", height:"32px", marginLeft:'430px'}}>
            <ReactSearchAutocomplete
                items={testData}
                placeholder="Search..."
                onSearch={handleOnSearch}
                autoFocus
                // formatResult={formatResult}
            />
        </div>
  )
}


