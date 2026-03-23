export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const expectedToken = process.env.ADMIN_TOKEN || "rightcollege-admin";

  if (!token || token !== expectedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
