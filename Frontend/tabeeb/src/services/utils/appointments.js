import axios from "axios";

const pendingAppointments = (role, token) => {
    return new Promise((resolve, reject) => {
        // request content type json
        const req = {
            token: token,
        };
        // convert req to json
        const jsonReq = JSON.stringify(req);
        axios
            .post(`/api/v1/${role}/pendingAppointments`, jsonReq, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
                console.log("Success");
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });

}

export { pendingAppointments };