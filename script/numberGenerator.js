
exports.numberGenerator = (n) => {
    let s = ""
    for(let i = 0; i < n; i++){
        s = s + parseInt(Math.random() * 10).toString()
    }
    return parseInt(s)
}