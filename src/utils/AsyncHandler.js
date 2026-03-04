const AsyncHandler = (fn) => async(...args) => {
    try {
        await fn(...args)
    } catch (error) {
        console.log("Error :", error)
    }
}

export default AsyncHandler