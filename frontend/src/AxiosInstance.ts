import axios from "axios"


const baseURL = process.env.environment === "production" ? `${process.env.REACT_APP_HEALTH_API}/` : `http://localhost:5001/`

const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

const AssignRoleHeader = (role: string) => {
    axios.defaults.headers.common["USER-ROLE"] = role
}

export { AxiosInstance, AssignRoleHeader }