import axios from "axios";

const API_BASE_URL = "/api/goals/";


// Get goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const response = await axios.get(API_BASE_URL, config);

    return response.data;
}

// Create goal
const createGoal = async (goal, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const response = await axios.post(API_BASE_URL, goal, config);

    return response.data;
}

// Update goal
const updateGoal = async (updatedGoal, goalID, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const response = await axios.put(API_BASE_URL + goalID, updatedGoal, config);

    return response.data;
}

// Delete goal
const deleteGoal = async (goalID, token) => {
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        }
    }
    const response = await axios.delete(API_BASE_URL + goalID, config);

    return response.data;
}


// Export
const goalService = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}

export default goalService;