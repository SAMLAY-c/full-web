import { compare, hash } from "bcryptjs";

/**
 * 密码哈希
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

/**
 * 验证密码
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

/**
 * 生成随机 token
 */
export function generateToken(length: number = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证密码强度
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("密码至少需要8个字符");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("密码需要包含至少一个大写字母");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("密码需要包含至少一个小写字母");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("密码需要包含至少一个数字");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
