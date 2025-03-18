import axios from "axios";

export default class ApiService {
    // Change it according to wherever your backend is running
    static BASE_URL = "http://localhost:8080";

    // Get header with the token
    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    // Attempt to refresh the token if it has expired
    static async refreshToken() {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                throw new Error("No refresh token available");
            }

            const response = await axios.post(`${this.BASE_URL}/auth/refresh`, { refreshToken });
            const { token, refreshToken: newRefreshToken } = response.data;

            // Update tokens in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", newRefreshToken);

            return token;  // Return the new token
        } catch (error) {
            console.error("Token refresh failed:", error);
            this.logout();  // Logout if refresh fails
            throw error;  // Re-throw to handle it in other parts of the app
        }
    }

    // Wishlist APIs
    static async getWishlist() {
        try {
            const response = await axios.get(`${this.BASE_URL}/wishlist`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            throw err;
        }
    }

    static async removeFromWishlist(vehicleId) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/wishlist/${vehicleId}`, {
                headers: this.getHeader(),
            });
            return response.data;
        } catch (err) {
            console.error("Error removing vehicle from wishlist:", err);
            throw err;
        }
    }

    // Fetch the application usage report 
    static async getApplicationUsageReport() {
        const response = await axios.get(`${this.BASE_URL}/usagereport`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Fetch the monthly sales report 
    static async getSalesReport() {
        const response = await axios.get(`${this.BASE_URL}/salesreport`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Authentication and user API */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    static async getLoggedInUserInfo() {
        try {
            const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            // If request fails due to an expired token, try refreshing the token
            if (error.response && error.response.status === 401) {
                try {
                    const newToken = await this.refreshToken();
                    // Retry the request with the new token
                    const retryResponse = await axios.get(`${this.BASE_URL}/user/my-info`, {
                        headers: this.getHeader()  // Automatically uses the new token
                    });
                    return retryResponse.data;
                } catch (refreshError) {
                    throw refreshError;
                }
            }
            throw error;  // If the error is not token-related, just throw it
        }
    }

    // Item API (updated as per your mapping)
    static async addItem(formData) {
        const response = await axios.post(`${this.BASE_URL}/items/create`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async updateItem(formData) {
        const response = await axios.put(`${this.BASE_URL}/items/update`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async getAllItems() {
        const response = await axios.get(`${this.BASE_URL}/item/get-all`);
        return response.data;
    }

    static async searchItems(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/item/search`, {
            params: { searchValue }
        });
        return response.data;
    }

    static async getAllItemsByCategoryId(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/item/get-by-category-id/${categoryId}`);
        return response.data;
    }

    static async getItemById(itemId) {
        const response = await axios.get(`${this.BASE_URL}/item/get-by-item-id/${itemId}`);
        return response.data;
    }

    static async deleteItem(itemId) {
        const response = await axios.delete(`${this.BASE_URL}/item/delete/${itemId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Category API */
    static async createCategory(body) {
        const response = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllCategory() {
        const response = await axios.get(`${this.BASE_URL}/category/get-all`);
        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/category/get-category-by-id/${categoryId}`);
        return response.data;
    }

    static async updateCategory(categoryId, body) {
        const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Orders API */
    static async createOrder(body) {
        const response = await axios.post(`${this.BASE_URL}/order/create`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getAllOrders() {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async getOrderItemById(itemId) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { itemId }
        });
        return response.data;
    }

    static async getAllOrderItemsByStatus(status) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { status }
        });
        return response.data;
    }

    static async updateOrderitemStatus(orderItemId, status) {
        const response = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`, {}, {
            headers: this.getHeader(),
            params: { status }
        });
        return response.data;
    }

    /* Address API */
    static async saveAddress(body) {
        const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /* Vehicle Image Upload API */
    static async uploadVehicleImage(formData) {
        const response = await axios.post(`${this.BASE_URL}/items/upload`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data; // Image URL
    }

    /* Authentication checker API */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');  // Remove the refresh token as well
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }
}
