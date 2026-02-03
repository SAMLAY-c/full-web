#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const beautifier = require('../src/core');

program
  .name('doc-beautify')
  .description('将普通文档自动转换为精美HTML页面')
  .version('1.0.0')
  .argument('<input>', '输入文档路径 (支持 .md, .txt, .docx)')
  .option('-o, --output <path>', '输出HTML文件路径')
  .option('-t, --template <name>', '选择模板', 'magazine')
  .option('--theme <name>', '选择主题', 'light')
  .option('--images <type>', '图片来源 (search/ai/mixed)', 'search')
  .option('--animations', '启用动画效果', false)
  .option('--config <path>', '配置文件路径')
  .option('--watch', '监视文件变化并自动更新', false)
  .option('--serve', '启动开发服务器预览', false)
  .option('-v, --verbose', '显示详细日志', false)
  .action(async (input, options) => {
    try {
      console.log(chalk.blue('\n🎨 Doc Beautifier - 智能文档美化系统\n'));
      
      // 验证输入文件
      if (!fs.existsSync(input)) {
        console.error(chalk.red(`✗ 错误: 文件不存在 ${input}`));
        process.exit(1);
      }

      // 设置默认输出路径
      if (!options.output) {
        const ext = path.extname(input);
        options.output = input.replace(ext, '.html');
      }

      // 显示处理信息
      console.log(chalk.gray('输入文件:'), input);
      console.log(chalk.gray('输出文件:'), options.output);
      console.log(chalk.gray('使用模板:'), options.template);
      console.log(chalk.gray('主题配色:'), options.theme);
      console.log(chalk.gray('图片来源:'), options.images);
      console.log('');

      // 执行美化
      const startTime = Date.now();
      
      const result = await beautifier.process(input, {
        output: options.output,
        template: options.template,
        theme: options.theme,
        images: options.images,
        animations: options.animations,
        configPath: options.config,
        verbose: options.verbose
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      // 显示结果
      console.log(chalk.green('\n✓ 美化完成!'));
      console.log(chalk.gray(`  耗时: ${duration}s`));
      console.log(chalk.gray(`  输出: ${result.outputPath}`));
      console.log(chalk.gray(`  章节数: ${result.stats.sections}`));
      console.log(chalk.gray(`  图片数: ${result.stats.images}`));
      
      // 启动服务器（如果需要）
      if (options.serve) {
        console.log(chalk.blue('\n🚀 启动预览服务器...'));
        const server = require('../scripts/dev-server');
        await server.start(result.outputPath);
      }

    } catch (error) {
      console.error(chalk.red('\n✗ 错误:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program.parse();
