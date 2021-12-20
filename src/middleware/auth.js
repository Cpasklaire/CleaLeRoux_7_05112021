// vérification token dans localStorage
const jwt = require('jsonwebtoken');

export default function auth (to, from, next) {
    const userLocal = localStorage.getItem('userId');     
    const token = localStorage.getItem('token');    
    let userId = ''
    try {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');    
        userId = decodedToken.userId;        
    } catch(error) {
        console.log("Token is invalid or has expired")
        localStorage.clear();
        next({ name: 'Home' });
    }
    if (userLocal != userId) {      
        localStorage.clear();
        next({ name: 'Home' });        
        return false
    }    
    return next()
}

/*export default function auth (to, from, next) {
  if (!localStorage.getItem('token')) {
    next({ name: 'Home' });
    return false
  }
  return next()
}*/