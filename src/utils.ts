/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function slugify(text: string): string {
  if (!text) return '';
  
  const trMap: Record<string, string> = {
    'ç':'c', 'Ç':'c', 
    'ğ':'g', 'Ğ':'g', 
    'ı':'i', 'I':'i', 'İ':'i', 
    'ö':'o', 'Ö':'o', 
    'ş':'s', 'Ş':'s', 
    'ü':'u', 'Ü':'u'
  };
  
  let result = text;
  for (const key in trMap) {
    result = result.replace(new RegExp(key, 'g'), trMap[key]);
  }
  
  return result
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // Remove punctuation
    .replace(/\s+/g, '-')           // Replace spaces with single hyphen
    .replace(/-+/g, '-');           // Collaps consecutive hyphens
}

/**
 * Resolves item search by either ID or slugify matched name
 */
export function findToolBySlug(tools: any[], slug: string) {
  return tools.find(t => t.id === slug || slugify(t.name) === slug);
}

export function findNewsBySlug(newsList: any[], slug: string) {
  return newsList.find(n => n.id === slug || slugify(n.title) === slug);
}
