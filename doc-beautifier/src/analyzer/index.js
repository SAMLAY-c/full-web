/**
 * 内容分析器入口
 */

const structureAnalyzer = require('./structure');
const typeClassifier = require('./type-classifier');
const sentimentAnalyzer = require('./sentiment');
const keywordAnalyzer = require('./keywords');

class Analyzer {
  async analyze(parsedContent) {
    const [structure, type, sentiment, keywords] = await Promise.all([
      structureAnalyzer.analyze(parsedContent),
      typeClassifier.classify(parsedContent),
      sentimentAnalyzer.analyze(parsedContent),
      keywordAnalyzer.analyze(parsedContent)
    ]);

    return {
      structure,
      type,
      sentiment,
      keywords,
      recommendedTemplate: this.recommendTemplate(type, sentiment),
      recommendedTheme: this.recommendTheme(sentiment)
    };
  }

  recommendTemplate(type, sentiment) {
    const mapping = {
      'tutorial': 'minimal',
      'tech-blog': 'tech',
      'story': 'literary',
      'report': 'corporate',
      'news': 'magazine'
    };
    return mapping[type] || 'magazine';
  }

  recommendTheme(sentiment) {
    if (sentiment.score > 0.5) return 'vibrant';
    if (sentiment.score < -0.3) return 'dark';
    return 'light';
  }
}

module.exports = Analyzer;
