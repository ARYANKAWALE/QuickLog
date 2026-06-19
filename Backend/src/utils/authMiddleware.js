import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'quicklog-dev-secret-key-2024'

const authMiddleware = (req, res, next) => {
  try {
    // Get the Authorization header → "Bearer <token>"
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.'
      })
    }

    // Extract the token (split "Bearer <token>" → take the second part)
    const token = authHeader.split(' ')[1]

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Attach user id to the request
    req.user = { id: decoded.id }

    // Move to the next middleware/controller
    next()

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.'
    })
  }
}

export default authMiddleware
