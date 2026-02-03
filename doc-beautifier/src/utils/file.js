/**
 * 文件操作工具
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

/**
 * 确保目录存在
 */
async function ensureDir(dirPath) {
  await fs.ensureDir(dirPath);
}

/**
 * 复制文件
 */
async function copyFile(src, dest) {
  await fs.copy(src, dest);
}

/**
 * 查找文件
 */
function findFiles(pattern, options = {}) {
  return glob.sync(pattern, options);
}

/**
 * 合并对象
 */
function merge(...objects) {
  return objects.reduce((acc, obj) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined) {
          acc[key] = obj[key];
        }
      });
    }
    return acc;
  }, {});
}

/**
 * 读取JSON文件
 */
async function readJson(filePath) {
  return await fs.readJson(filePath);
}

/**
 * 写入JSON文件
 */
async function writeJson(filePath, data) {
  await fs.writeJson(filePath, data, { spaces: 2 });
}

module.exports = {
  ensureDir,
  copyFile,
  findFiles,
  merge,
  readJson,
  writeJson
};
