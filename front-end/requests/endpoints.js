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

}

export default endpoints;