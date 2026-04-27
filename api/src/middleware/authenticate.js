import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    //! always specify the algorithm to prevent security vulnerabilities
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    // payload.sub is the userId we set when signing the token
    // currently not used, need to implement user registration and login first
    req.userId = payload.sub; // available in all downstream controllers
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/*
// Below example is for when the token is sent in the Authorization header instead of a cookie.
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.userId = payload.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Then in client side you would need to sotre it in localStorage/sessionStorage instead of cookie.
// The downside is that localStorage is accessible to JavaScript, making it vulnerable to XSS attacks.

const token = localStorage.getItem("token");

fetch("http://localhost:3000/posts/1/comments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,  // ← here
  },
  body: JSON.stringify({ content }),
});
*/
