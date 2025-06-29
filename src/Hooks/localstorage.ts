export const setStorage = (key: string, value: any) => {
    if(!value){
        console.error("Value is null or undefined");
    }
    localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = (key: string) => {
    const value = localStorage.getItem(key);
    if(!value){
        return;
    }
    return JSON.parse(value);
}

export const updateStorage = (key: string, value: any) => {
    const existingValue = getStorage(key);
    if(!existingValue){
        console.error("Value is null or undefined");
        return;
    }
    const updatedValue = { ...existingValue, ...value };
    setStorage(key, updatedValue);
}

export const removeStorage = (key: string) => {
    localStorage.removeItem(key);
}

export const clearStorage = () => {
    localStorage.clear();
}