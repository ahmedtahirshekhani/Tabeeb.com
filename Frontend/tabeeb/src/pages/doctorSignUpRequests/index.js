import React from "react";

const doctorSignUpRequests = () => {
    const doctorDetails = [{fullname: 'Iqbal Amir', CNICNo:422000000, PMCReg:123456, num:923321232343, Email:'doctor@gmail.com', about:'I am a nice doctor', city:'Karachi'}, {fullname:'Amir Rasheed', CNICNo:4221123123123, PMCReg:523423, num:92337777343, Email:'someone@gmail.com', about:'I am a great doctor', city:'Lahore'}, {fullname: 'Basit Anwar', CNICNo:42242110, PMCReg:786549, num:923423455674, Email:'someotherperson@gmail.com', about:'I am an okay doctor', city:'Islamabad'}]

    return(
    <div className="overflow-x-auto">
        <h1 class="text-center text-3xl">Doctor Signup Requests</h1>
    <table className="table table-compact w-full">
        <thead>
        <tr>
            <th>Full Name</th> 
            <th>CNIC No.</th> 
            <th>PMC Registration No.</th> 
            <th>Contact No.</th>
            <th>Email</th> 
            <th>About Doctor</th> 
            <th>City</th>
        </tr>
        </thead> 
        <tbody>
        {doctorDetails.map((value,index) => {
                        return(
                        <tr className="hover">
                        <td>{value['fullname']}</td>
                        <td>{value['CNICNo']}</td>
                        <td>{value['PMCReg']}</td>
                        <td>{value['num']}</td>
                        <td>{value['Email']}</td>
                        <td>{value['about']}</td>
                        <td>{value['city']}</td>
                        </tr>
                    )
                    })}
        </tbody> 
    </table>
    </div>
    )
}

export default doctorSignUpRequests;