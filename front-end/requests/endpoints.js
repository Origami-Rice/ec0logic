const endpoints = {
    // inventory
    getInventory: {
        endpoint: '/api/inventory',
        method: 'GET',
    },
    addToInventory: {
        endpoint: '/api/inventory',
        method: 'POST',
    }, 
    getExpiring: {
        endpoint: '/api/inventory/expiring', 
        method: 'GET',
    }, 
    getExpired: {
        endpoint: '/api/inventory/expired', 
        method: 'GET',
    },

    // Food + Shelflife Library
    getFoodLibrary: {
        endpoint: '/api/food-library',
        method: 'GET',
    },
    addToFoodLibrary: {
        endpoint: '/api/food-library',
        method: 'POST',
    },

    // History of Wasted Foods
    getWastedHistory: {
        endpoint: '/api/history',
        method: 'GET',
    },

    addWastedItem: {
        endpoint: '/api/history',
        method: 'POST',
    },

    // Shopping List
    getShoppingList: {
        endpoint: '/api/shoppinglist',
        method: 'GET',
    },

    addToShoppingList: {
        endpoint: '/api/shoppinglist',
        method: 'POST',
    },

    updateShoppingList: {
        endpoint: '/api/shoppinglist',
        method: 'PUT',
    },

    // GHG Calculator
    getGHG: {
        endpoint: '/api/ghgcalculator/history',
        method: 'POST',
    },

    getMonthlyGHGBreakdown: {
        endpoint: '/api/ghgcalculator/history/breakdown',
        method: 'GET',
    },

    // Authentication
    signupUser: {
        endpoint: '/api/users/signup',
        method: 'POST',
    },

    signinUser: {
        endpoint: '/api/users/signin',
        method: 'POST',
    },

    signoutUser: {
        endpoint: '/api/users/signout',
        method: 'POST',
    },

    getAuthenticated: {
        endpoint: '/api/users/isauthenticated',
        method: 'GET',
    },

    updateEmail: {
        endpoint: '/api/users/email',
        method: 'PATCH',
    },

    updatePassword: {
        endpoint: '/api/users/password',
        method: 'PATCH',
    },

    getSecurityQuestion: {
        endpoint: '/api/users/security',
        method: 'GET',
    },

    verifySecurityAnswer: {
        endpoint: '/api/users/security',
        method: 'POST',
    },

    // Tips
    addTip: {
        endpoint: '/api/tips/add',
        method: 'POST',
    },

    deleteTip: {
        endpoint: '/api/tips/delete',
        method: 'POST',
    },
    
    getSavedTips: {
        endpoint: '/api/tips',
        method: 'GET',
    },

    // Recipes
    searchRecipes: {
        endpoint: '/api/recipe/search',
        method: 'POST',
    },

    addRecipe: {
        endpoint: '',
        method: 'POST',
    },

    removeRecipe: {
        endpoint: '',
        method: 'DELETE',
    },

    getSavedRecipes: {
        endpoint: '',
        method: 'GET'
    }
}

export default endpoints;