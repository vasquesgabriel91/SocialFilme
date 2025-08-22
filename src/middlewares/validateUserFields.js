function validationUserFields(req, res, next){
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    
    next();
}
export default validationUserFields;