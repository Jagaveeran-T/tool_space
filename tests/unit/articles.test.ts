import { describe, expect, it } from 'vitest';

import {
  articles,
  getArticleBySlug,
  getArticleWordCount,
  getLatestArticles,
} from '@/data/articles';
import { getToolById } from '@/data/tools';

describe('Guides', () => {
  it('gives every guide a unique slug', () => {
    expect(new Set(articles.map((a) => a.slug)).size).toBe(articles.length);
  });

  it('uses URL-safe slugs', () => {
    articles.forEach((article) => {
      expect(article.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });
  });

  it('only links to tools that exist', () => {
    articles.forEach((article) => {
      article.relatedToolIds.forEach((id) => {
        expect(getToolById(id)).toBeDefined();
      });
    });
  });

  it('keeps meta descriptions a sensible length', () => {
    articles.forEach((article) => {
      expect(article.description.length).toBeGreaterThan(70);
      expect(article.description.length).toBeLessThanOrEqual(170);
    });
  });

  it('has real depth in every guide', () => {
    articles.forEach((article) => {
      expect(getArticleWordCount(article)).toBeGreaterThan(350);
    });
  });

  it('finds a guide by slug and lists the latest first', () => {
    expect(getArticleBySlug(articles[0].slug)).toBe(articles[0]);
    expect(getArticleBySlug('does-not-exist')).toBeUndefined();
    expect(getLatestArticles(2)).toHaveLength(Math.min(2, articles.length));
  });
});