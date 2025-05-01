import axios from "axios";
const BASE_URL = "http://68.183.215.231:8081";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;

export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`${BASE_URL}/api/nomad/user/auth/signin`, {
      email,
      password,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to login:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Login error:", error);
      return {
        status: error.response.status,
        message: error.response.data.error || "Login failed",
      };
    } else {
      console.error("Error logging in:", error);
      return null;
    }
  }
};

export const listTransactions = async (filter) => {
  try {
    const response = await api.post(`${BASE_URL}/api/nomad/transfer/list`, filter, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch transactions:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching transactions:", error);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to fetch transactions",
      };
    } else {
      console.error("Error fetching transactions:", error);
      return null;
    }
  }
};

export const listVASPs = async (filter) => {
  try {
    const response = await api.post(`${BASE_URL}/api/nomad/vasp/list`, filter, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching VASPs:", error);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to fetch VASPs",
      };
    } else {
      console.error("Error fetching VASPs:", error);
      return null;
    }
  }
};

export const getTransactionDetail = async (id) => {
  try {
    const response = await api.post(
      `${BASE_URL}/api/nomad/transfer/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    if (error.response) {
      console.error("Error fetching VASPs:", error);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to fetch VASPs",
      };
    } else {
      console.error("Error fetching VASPs:", error);
      return null;
    }
  }
};

export const trustVASP = async (vaspId, trust) => {
  try {
    const response = await api.post(
      `${BASE_URL}/api/nomad/vasp/update/${vaspId}`,
      { isTrust: trust },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      console.error("Failed to update trust status:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating trust status:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to update trust status",
      };
    } else {
      console.error("Error updating trust status:", error);
      return null;
    }
  }
};

export const updateTransactionStatus = async (recordId, newStatus) => {
  try {
    const response = await api.post(
      `${BASE_URL}/api/nomad/transfer/update/${recordId}`,
      { status: newStatus },
      {
        headers: {},
      }
    );

    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update transaction status:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating transaction status:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to update transaction status",
      };
    } else {
      console.error("Error updating transaction status:", error);
      return null;
    }
  }
};

export const getUserData = async () => {
  try {
    const response = await api.post(`${BASE_URL}/api/nomad/user/getPlatFormUser`, {
      headers: {},
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update transaction status:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating transaction status:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to update transaction status",
      };
    } else {
      console.error("Error updating transaction status:", error);
      return null;
    }
  }
};

export const getVASPDetail = async (id) => {
  try {
    const response = await api.post(
      `${BASE_URL}/api/nomad/vasp/detail`,
      {
        vaspId: id,
      },
      {
        headers: {},
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update transaction status:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating transaction status:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to update transaction status",
      };
    } else {
      console.error("Error updating transaction status:", error);
      return null;
    }
  }
};

export const getApiKey = async () => {
  try {
    const response = await api.post(`${BASE_URL}/api/nomad/user/getApiKey`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update transaction status:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating transaction status:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to update transaction status",
      };
    } else {
      console.error("Error updating transaction status:", error);
      return null;
    }
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.post(`${BASE_URL}/api/nomad/user/updateProfile`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.status === 200) {
      console.log(response);
      return response.data;
    } else {
      console.error("Failed to update trust status:", response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error("Error updating trust status:", error.response.data);
      return {
        status: error.response.status,
        message: error.response.data.error || "Failed to update trust status",
      };
    } else {
      console.error("Error updating trust status:", error);
      return null;
    }
  }
};
