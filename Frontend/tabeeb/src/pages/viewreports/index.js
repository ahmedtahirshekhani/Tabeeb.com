import React from "react";

const viewreports = (dict) => {
    // const d_reportDetails = dict["doctors"]
    // const p_reportDetails = dict["patients"]
    const reportDetails = [{report_id: 145, phone: 923456789, cnic: 42222222222, report_reason: 'This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot'}, {report_id: 666, phone: 923987654321, cnic: 4121212121, report_reason: 'This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot'}, {report_id: 777, phone: 923756478392, cnic: 42134222222, report_reason: 'This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot'}, {report_id: 888, phone: 923098971234, cnic: 4200000002, report_reason: 'This guys is very and extremely rude. Did not talk correctly, gave me the wrong meds. Please ban this guy. He was late for the appointment. He charges a lot'}]

    return(
    <div className="overflow-x-auto">
        <h1 style={{padding: 1 + 'em'} } class="text-center text-3xl">User Ban Reports</h1>
        <h2 style={{padding: 1.5 + 'em'} } >Reported by Doctors</h2>
    <table className="table table-compact w-full" >
        <thead>
        <tr>
            <th>Report ID</th>
            <th>Patient Phone Number</th> 
            <th>Doctor CNIC</th>
            <th>Reasoning behind report</th>  
        </tr>
        </thead> 
        <tbody>
        {reportDetails.map((value,index) => {
                        return(
                        <tr className="hover">
                        <td>{value['report_id']}</td>
                        <td>{value['phone']}</td>
                        <td>{value['cnic']}</td>
                        <td>{value['report_reason']}</td>
                        <td><button className="btn btn-outline btn-accent">Ban</button></td>
                        </tr>
                    )
                    })}
        </tbody> 
    </table>
    <h2 style={{padding: 1.5 + 'em'} } >Reported by Patients</h2>
    <table className="table table-compact w-full" >
        <thead>
        <tr>
            <th>Report ID</th>
            <th>Doctor Phone Number</th> 
            <th>Patient CNIC</th>
            <th>Reasoning behind report</th>  
        </tr>
        </thead> 
        <tbody>
        {reportDetails.map((value,index) => {
                        return(
                        <tr className="hover">
                        <td>{value['report_id']}</td>
                        <td>{value['phone']}</td>
                        <td>{value['cnic']}</td>
                        <td>{value['report_reason']}</td>
                        <td><button className="btn btn-outline btn-accent">Ban</button></td>
                        </tr>
                    )
                    })}
        </tbody> 
    </table>
    </div>
    )
}

export default viewreports;