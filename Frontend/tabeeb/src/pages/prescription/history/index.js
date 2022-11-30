import { useState } from "react";

// const prescriptions = () => {
//     return (<div className="overflow-x-auto">
//         <table className="table table-compact w-full">
//             <thead>
//             <tr>
//                 <th></th> 
//                 <th>Name</th> 
//                 <th>Job</th> 
//                 <th>company</th> 
//                 <th>location</th> 
//                 <th>Last Login</th> 
//                 <th>Favorite Color</th>
//             </tr>
//             </thead> 
//             <tbody>
//             <tr>
//                 <th>1</th> 
//                 <td>Cy Ganderton</td> 
//                 <td>Quality Control Specialist</td> 
//                 <td>Littel, Schaden and Vandervort</td> 
//                 <td>Canada</td> 
//                 <td>12/16/2020</td> 
//                 <td>Blue</td>
//             </tr>
//             </tbody>
//         </table>
//     </div>
//     )                  
// }

const popUp = (props) => {

}
const PrescriptionHist = ()=>{
    // const [namesList, setNamesList] = useState(['Grant', 'Betty', 'Bitch']);
    // const [pHist, setpHist] = useState([])
    const patientDetails = [{date: '21 December 2022', name:'Hugh', prescription:['Panadol', 'Brufen', 'Injection']}, {date: '24 November 2002', name:'Lisa', prescription:['Disprin', 'Eno']}, {date: '4 September 2014', name:'Saleem', prescription:['Lysol','Riskek-20','Ensure','Hajmola']}]


    //const temp = ['Grant', 'Betty', 'Bitch']

    //setNamesList(temp)

    return(
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                <tr>
                    <th>Date Prescribed</th>
                    <th>Patient Name</th>
                    <th>Prescription Details</th>
                </tr>
                </thead>
                <tbody>
                {/* <!-- row 1 --> */}
                
                    {patientDetails.map((value,index) => {
                        return(
                        <tr className="hover">
                            <td>{value['date']}</td>
                          <td>{value['name']}</td>
                          <td>{value['prescription'].join(', ')}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PrescriptionHist;