
exports.numberGenerator = (n) => {
    let s = []
    for(let i = 0; i < n; i++){
        s.push(i)
    }
    for(let i = 0; i < n; i++){
        const nbre = 0//parseInt(Math.random() * 10)
        s[i] = nbre
    }
    return s.join('')
}