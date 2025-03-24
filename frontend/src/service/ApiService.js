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


   /* Attempt to refresh the token if it has expired (not sure to add)
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
   }*/

   

   // Wishlist APIs
   static async addToWishlist(userId, itemId) {
     const payload = {
       userId: parseInt(userId),
       productId: parseInt(itemId),
     };

     const response = await axios.post(`${this.BASE_URL}/wishlist/add`, payload, {
       headers: this.getHeader(),
     });

     return response.data;
   }


   static async getWishlist(userId) {
       try {
           const response = await axios.get(`${this.BASE_URL}/wishlist/user/${userId}`, {
               headers: this.getHeader(),
           });
           return response.data;
       } catch (err) {
           console.error("Error fetching wishlist:", err);
           throw err;
       }
   }

   static async removeFromWishlist(wishlistId) {
     return axios.delete(`${this.BASE_URL}/wishlist/remove/${wishlistId}`, {
       headers: this.getHeader()
     });
   }


   // Fetch the application usage report

    // Function to track a visit/event
  static async trackVisit(ipAddress, vid, eventType) {
	try {
  	const response = await axios.post(
    	`${this.BASE_URL}/usage/track`,
    	null, 
    	{
      	params: {
        	ipAddress,
        	vid,
        	eventType,
      	},
      	headers: this.getHeader(), 
    	}
  	);
  	return response.data;
	} catch (err) {
  	console.error('Error tracking visit:', err);
  	throw err;
	}
  }

  // Function to fetch the application usage report
  static async getApplicationUsageReport() {
	try {
  	const response = await axios.get(`${this.BASE_URL}/usage/reports`, {
    	headers: this.getHeader(),
  	});
  	return response;
	} catch (err) {
  	console.error('Error fetching application usage report:', err);
  	throw err;
	}
  }

  static async getIpAddress() {
    try {
      const response = await axios.get('https://api.ipify.org?format=json'); // Example of IP fetching
      return response.data;
    } catch (err) {
      console.error('Error fetching IP address:', err);
      throw err;
    }
  }

   // Fetch the monthly sales report
   static async getSalesReport() {
       const response = await axios.get(`${this.BASE_URL}/orders/report/monthly-orders`, {
           headers: this.getHeader()
       });
       return response.data;
   }


   /* Authentication and user API */
   static async registerUser(registration) {
    try {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;  // Rethrow the error for further handling (e.g., showing error messages)
    }
   }


   static async loginUser(loginDetails) {
    try {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        // Store the tokens in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('refreshToken', response.data.refreshToken);  // If available
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;  // Rethrow the error for further handling
    }
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
   // Item API (updated as per your mapping)
   static async addItem(formData) {
       const response = await axios.post(`${this.BASE_URL}/catalog/items/create`, formData, {
           headers: {
               ...this.getHeader(),
               "Content-Type": "multipart/form-data"
           }
       });
       return response.data;
   }


   static async updateItem(formData) {
       const response = await axios.put(`${this.BASE_URL}/catalog/items/update`, formData, {
           headers: {
               ...this.getHeader(),
               "Content-Type": "multipart/form-data"
           }
       });
       return response.data;
   }


   static async getAllItems(page = 0, size = 10) {
    const response = await axios.get(`${this.BASE_URL}/catalog/items`, {
        params: { page, size }
    });
    return response.data;
}
/*static async filterItems(filters) {
    const response = await axios.get(`${this.BASE_URL}/catalog/items/filter`, {
        params: filters
    });
    return response.data;
}*/
 
static async getItemsByBrand(brand) {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/brand/${brand}`);
	return response.data;
  }

  static async getSortedItemsByPrice(order) {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/sort`, {
  	params: { order }
	});
	return response.data;
  }

  static async getSortedItemsByMileage(order) {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/sort/mileage`, {
  	params: { order }
	});
	return response.data;
  }

  static async getItemsByShape(shape) {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/shape/${shape}`);
	return response.data;
  }

  static async getItemsByModelYear(year) {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/year/${year}`);
	return response.data;
  }

  static async getItemsByVehicleHistoryNoDamage() {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/history/no-damage`);
	return response.data;
  }

  static async getItemsByVehicleHistoryWithDamage() {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/history/with-damage`);
	return response.data;
  }

  static async filterItems({ brand, shape, modelYear, vehicleHistory }) {
	const response = await axios.get(`${this.BASE_URL}/catalog/items/filter`, {
  	params: { brand, shape, modelYear, vehicleHistory }
	});
	return response.data;
  }



   static async searchItems(searchValue) {
       const response = await axios.get(`${this.BASE_URL}/catalog/items/search`, {
           params: { searchValue }
       });
       return response.data;
   }


   static async getAllItemsByCategoryId(categoryId) {
       const response = await axios.get(`${this.BASE_URL}/categories/${categoryId}`);
       return response.data;
   }


   static async getItemById(itemId) {
       const response = await axios.get(`${this.BASE_URL}/catalog/items/details/${itemId}`);
       return response.data;
   }
     //start from here
     static async deleteItem(itemId) {
        const response = await axios.delete(`${this.BASE_URL}/catalog/items/delete/${itemId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }
    


   /* Category API */
   static async createCategory(body) {
       const response = await axios.post(`${this.BASE_URL}/categories/create`, body, {
           headers: this.getHeader()
       });
       return response.data;
   }


   static async getAllCategory() {
       const response = await axios.get(`${this.BASE_URL}/categories/all`);
       return response.data;
   }


   static async getCategoryById(categoryId) {
       const response = await axios.get(`${this.BASE_URL}/categories/${categoryId}`);
       return response.data;
   }


   static async updateCategory(categoryId, body) {
       const response = await axios.put(`${this.BASE_URL}/categories/update/${categoryId}`, body, {
           headers: this.getHeader()
       });
       return response.data;
   }


   static async deleteCategory(categoryId) {
       const response = await axios.delete(`${this.BASE_URL}/categories/delete/${categoryId}`, {
           headers: this.getHeader()
       });
       return response.data;
   }


   /* Orders API */
   static async createOrder(userId) {
     const response = await axios.post(`${this.BASE_URL}/orders/create/${userId}`);
     return response.data;
   }
   
   static async addItemToOrder(orderId, itemId, quantity) {
     return axios.post(
       `${this.BASE_URL}/orders/${orderId}/add-item/${itemId}?quantity=${quantity}`,
       null, // no body
       { headers: this.getHeader() }
     );
   }


  
  // 🗑️ Remove item from order  
  static async removeItemFromOrder(orderId, orderItemId) {
    try {
      const response = await axios.delete(
        `${this.BASE_URL}/orders/${orderId}/remove-item/${orderItemId}`,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (err) {
      console.error('Error removing item from order:', err);
      throw err;
    }
  }
  
   // Add the getAllItemsInOrder method
static async getAllItemsInOrder(orderId) {
    try {
        const response = await axios.get(`${this.BASE_URL}/orders/${orderId}/items`, {
            headers: this.getHeader()
        });
        return response.data;  
    } catch (error) {
        console.error('Error fetching items in order:', error);
        throw error;  
    }
}


   static async getAllOrders(userId) {
    const response = await axios.get(`${this.BASE_URL}/orders/user/${userId}`, { // Adjust the endpoint if necessary
        headers: this.getHeader()
    });
    return response.data;
}


static async getDetailedItemsInOrder(orderId) {
  try {
    const response = await axios.get(`${this.BASE_URL}/orders/${orderId}/detailed-items`, {
      headers: this.getHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching detailed items in order:', error);
    throw error;
  }
}

static async updateOrderItemQuantity(orderId, orderItemId, quantity) {
  try {
    const response = await axios.put(
      `${this.BASE_URL}/orders/${orderId}/update-quantity/${orderItemId}?quantity=${quantity}`,
      null,
      { headers: this.getHeader() }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order item quantity:", error);
    throw error;
  }
}



// Method to update order status
static async updateOrderStatus(orderId, status) {
    try {
        const response = await axios.put(`${this.BASE_URL}/orders/update-status/${orderId}`, 
            { status }, 
            {
                headers: this.getHeader()
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
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



   //reviews api
   // Fetch item reviews
static async getItemReviews(itemId) {
    try {
        const response = await axios.get(`${this.BASE_URL}/catalog/${itemId}/reviews`, {
            headers: this.getHeader(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching item reviews:', error);
        throw error;
    }
}

// Submit an item review (rating + comment)
static async submitReview(itemId, reviewData) {
  try {
    const response = await axios.post(
      `${this.BASE_URL}/catalog/${itemId}/reviews`,
      reviewData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  } catch (err) {
    console.error("Review submission failed:", err.response || err);
    throw err;
  }
}




   //  Fetch all hot deals
   static async getAllHotDeals() {
     try {
       const response = await axios.get(`${this.BASE_URL}/hot-deals/all`, {
         headers: this.getHeader(),
       });
       return Array.isArray(response.data) ? response.data : []; // <-- Safeguard here
     } catch (err) {
       console.error('Error fetching hot deals:', err);
       return []; // return empty array instead of throwing
     }
   }


  // Add a new hot deal (Admin only)
  static async addHotDeal(itemId, discount) {
	try {
  	const response = await axios.post(
    	`${this.BASE_URL}/hot-deals/add/${itemId}`,
    	null,
    	{
      	params: { discount },
      	headers: this.getHeader(),
    	}
  	);
  	return response.data;
	} catch (err) {
  	console.error('Error adding hot deal:', err);
  	throw err;
	}
  }

  // 🗑️ Remove a hot deal (Admin only)
  static async removeHotDeal(hotDealId) {
	try {
  	const response = await axios.delete(`${this.BASE_URL}/hot-deals/remove/${hotDealId}`, {
    	headers: this.getHeader(),
  	});
  	return response.data;
	} catch (err) {
  	console.error('Error removing hot deal:', err);
  	throw err;
	}
  }


   //admin analytics api
}
