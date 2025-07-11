const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: 'No token, access denied' });

     try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
}