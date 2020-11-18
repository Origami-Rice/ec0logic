const endpoints = {
    // inventory
    getInventory: {
        endpoint: '/api/inventory',
        method: 'GET',
    },
    addToInventory: {
        endpoint: 'api/inventory',
        method: 'POST',
    }, 
    getExpiring: {
        endpoint: 'api/inventory/expiring', 
        method: 'GET',
    }, 
    getExpired: {
        endpoint: 'api/inventory/expired', 
        method: 'GET',
    }, 
    getInventoryItem: {
        endpoint: 'api/inventory', 
        method: 'GET',
    },
    deleteInventoryItem: {
        endpoint: 'api/inventory',
        method: 'DELETE',
    },
    updateInventoryItem: {
        endpoint: 'api/inventory',
        method: 'PUT',
    },

    // Food + Shelflife Library
    getFoodLibrary: {
        endpoint: 'api/food-library',
        method: 'GET',
    },
    addToFoodLibrary: {
        endpoint: 'api/food-library',
        method: 'POST',
    },

    // History of Wasted Foods
    getWastedHistory: {
        endpoint: '/api/history/',
        method: 'GET',
    }

    // Shopping List
}

export default endpoints;