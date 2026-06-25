export type EcosystemCategoryId = 'foundation' | 'community';

export type EcosystemResourceId = 'shadcn-ui' | 'chanh-dai' | 'magic-ui' | 'coss-ui' | 'remocn';

export type EcosystemCategory = {
  id: EcosystemCategoryId;
};

export type EcosystemResource = {
  id: EcosystemResourceId;
  category: EcosystemCategoryId;
  href: string;
};

export const ecosystemCategories: EcosystemCategory[] = [{ id: 'foundation' }, { id: 'community' }];

export const ecosystemResources: EcosystemResource[] = [
  { id: 'shadcn-ui', category: 'foundation', href: 'https://ui.shadcn.com/' },
  { id: 'chanh-dai', category: 'community', href: 'https://chanhdai.com/' },
  { id: 'magic-ui', category: 'community', href: 'https://magicui.design/' },
  { id: 'coss-ui', category: 'community', href: 'https://coss.com/ui' },
  { id: 'remocn', category: 'community', href: 'https://www.remocn.dev/' },
];
