import axios from "axios";

const API_URL = "/api/users/";


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + "create", userData);

    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "authenticate", userData);

    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout
const logout = async () => {
    console.log("Delet")
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
}

export default authService;