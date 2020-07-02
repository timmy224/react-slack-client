function StorageService() {
    const get = key => localStorage.getItem(key);
    const set = (key, value) => localStorage.setItem(key, value);
    
    return Object.freeze({
        get,
        set,
    });
}

export default StorageService;



