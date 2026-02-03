/**
 * 智能搜索模块入口
 */

const imageSearch = require('./images');
const dataSearch = require('./data');
const enricher = require('./enricher');

class Search {
  async enrich(content, analysis, options) {
    // 搜索配图
    const images = await imageSearch.search(
      analysis.keywords,
      content.structure.sections,
      options.images
    );

    // 搜索补充数据
    const data = await dataSearch.search(analysis.keywords);

    // 增强内容
    const enriched = enricher.enrich(content, images, data);

    return {
      ...content,
      images,
      data,
      sections: enriched.sections
    };
  }
}

module.exports = Search;
