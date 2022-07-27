
// This function takes two parameters which are used to filter through the array passed in and remove duplicate elements
const getUniqueKeyValues = (key, arr) => {
    // If the array is empty exit the function 
    if (!arr) return []

    
    return arr.filter( (item, index, self) => 
    index === self.findIndex((i) => i[key] && item[key] && i[key] === item[key])
    )
}

export default getUniqueKeyValues;