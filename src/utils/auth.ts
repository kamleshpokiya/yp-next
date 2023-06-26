// packages
import bcrypt from 'bcryptjs';


// hash password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// compare password
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}