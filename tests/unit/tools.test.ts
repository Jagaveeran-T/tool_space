import { describe, expect, it } from 'vitest';

import {
  tools,
  getActiveTools,
  getFeaturedTools,
  getPopularTools,
  getToolById,
  getToolsByCategory,
} from '@/data/tools';
import { categories } from '@/data/categories';

describe('Tool Registry', () => {
  it('should contain every registered tool', () => {
    expect(tools).toHaveLength(6);
  });

  it('should return active tools', () => {
    expect(getActiveTools().length).toBe(6);
  });

  it('should give every tool a unique id and slug', () => {
    expect(new Set(tools.map((tool) => tool.id)).size).toBe(tools.length);
    expect(new Set(tools.map((tool) => tool.slug)).size).toBe(tools.length);
  });

  it('should only use categories that exist', () => {
    const categoryNames = new Set(categories.map((category) => category.name));

    tools.forEach((tool) => {
      expect(categoryNames.has(tool.category)).toBe(true);
    });
  });

  it('should not list a category that has no tools', () => {
    categories.forEach((category) => {
      expect(getToolsByCategory(category.name).length).toBeGreaterThan(0);
    });
  });

  it('should return featured tools', () => {
    expect(getFeaturedTools().length).toBeGreaterThan(0);
  });

  it('should return popular tools', () => {
    expect(getPopularTools().length).toBeGreaterThan(0);
  });

  it('should find the age calculator', () => {
    const tool = getToolById('age-calculator');

    expect(tool?.name).toBe('Age Calculator');
  });

  it('should return undefined for an invalid tool ID', () => {
    expect(getToolById('unknown-tool')).toBeUndefined();
  });
});