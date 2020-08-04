function StorageService() {
    const get = key => localStorage.getItem(key);
    const set = (key, value) => localStorage.setItem(key, value);
    const removeItem = key => localStorage.removeItem(key);
    
    return Object.freeze({
        get,
        set,
        removeItem,
    });
}

export default StorageService;



