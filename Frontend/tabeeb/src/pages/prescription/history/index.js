import { useState } from "react";

const prescriptions = () => {
    return (<div className="overflow-x-auto">
        <table className="table table-compact w-full">
            <thead>
            <tr>
                <th></th> 
                <th>Name</th> 
                <th>Job</th> 
                <th>company</th> 
                <th>location</th> 
                <th>Last Login</th> 
                <th>Favorite Color</th>
            </tr>
            </thead> 
            <tbody>
            <tr>
                <th>1</th> 
                <td>Cy Ganderton</td> 
                <td>Quality Control Specialist</td> 
                <td>Littel, Schaden and Vandervort</td> 
                <td>Canada</td> 
                <td>12/16/2020</td> 
                <td>Blue</td>
            </tr>
            </tbody>
        </table>
    </div>
    )                  
}
const PrescriptionHist = ()=>{
    const [namesList, setNamesList] = useState(['Grant', 'Betty', 'Bitch']);
    //const temp = ['Grant', 'Betty', 'Bitch']

    //setNamesList(temp)

    return(
        <div className="overflow-x-auto">
            <h1 class="text-4xl ...">Patient Names</h1>
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {/* <!-- row 1 --> */}
                
                    {namesList.map((value,index) => {
                        return(
                        <tr className="hover" onClick={prescriptions}>
                          <th>{index}</th>
                          <td>{value}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PrescriptionHist;