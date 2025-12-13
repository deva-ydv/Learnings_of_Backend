const jwt = require("jsonwebtoken");
const jwtPassword = "secret"
const zod = require("zod")

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6)


//signin function using jwt

function singJwt(username, password){
    const usernameResponse = emailSchema.safeParse(username)
    const passwordRespomse = passwordSchema.safeParse(username)

    if(!usernameResponse.success || !passwordRespomse.success){
        return null;
    }
    
    const signature = jwt.sign({
        username
    },jwtPassword)

    return signature;
}

const ans = singJwt("deva@gmail.com","234123");

// decode function
function decodeJwt(token){
    const decode = jwt.decode(token);
    if(decode) return true;
    return false;
}

// verify function
function verifyJwt(token){
    try {
        jwt.verify(token,jwtPassword);
        return true;
    } catch (error) {
        
    }
    return false
}

const verified = verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldmFAZ21haWwuY29tIiwiaWF0IjoxNzY1NjE1NzE1fQ.BgTG815T0_4uUgJKyOa0uX-ZDB6xmZ4JkQcBTw-s8lg")
console.log(verified)

// console.log(decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRldmFAZ21haWwuY29tIiwiaWF0IjoxNzY1NjE1NzE1fQ.BgTG815T0_4uUgJKyOa0uX-ZDB6xmZ4JkQcBTw-s8lg"))
// console.log(ans)