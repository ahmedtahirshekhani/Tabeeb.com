import React from "react";

const viewearnrep = () => {
    const earnDetails = [{patientname: 'Amir Iqbal', totalearns: 15000}, {patientname:'Zafar Shahid', totalearns:25000}, {patientname: 'Suleman Qazi', totalearns:5000}]

    return(
    <div className="overflow-x-auto">
        <h1 class="text-center text-3xl">Eearnings Report</h1>
    <table className="table table-compact w-full">
        <thead>
        <tr>
            <th>Patient Name</th> 
            <th>Total Earnings from Patient (in Rs.)</th> 
        </tr>
        </thead> 
        <tbody>
        {earnDetails.map((value,index) => {
                        return(
                        <tr className="hover">
                        <td>{value['patientname']}</td>
                        <td>{value['totalearns']}</td>
                        </tr>
                    )
                    })}
        </tbody> 
    </table>
    </div>
    )
}

export default viewearnrep;