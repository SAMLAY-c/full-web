import { hashPassword } from "@/lib/auth/password";

// 临时内存存储（生产环境应使用数据库）
const users: any[] = [];

// 默认管理员账号（仅用于开发测试）
const DEFAULT_ADMIN = {
  id: "admin-1",
  email: "admin@example.com",
  name: "管理员",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYA.qGZvKG6G", // admin123
  isAdmin: true,
  isMember: true,
  createdAt: new Date().toISOString(),
};

// 初始化默认用户
if (users.length === 0) {
  users.push(DEFAULT_ADMIN);
}

// 用户管理函数
export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
  isMember?: boolean;
}) {
  const existingUser = users.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("用户已存在");
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    isAdmin: false,
    isMember: userData.isMember || false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  return newUser;
}

export async function getUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export async function updateUserMembership(userId: string, isMember: boolean) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.isMember = isMember;
    return user;
  }
  return null;
}

export { users };
