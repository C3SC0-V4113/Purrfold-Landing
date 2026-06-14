import { describe, expect, it } from 'vitest';

import Home from '@/app/page';

describe('Home page smoke test', () => {
  it('renders no root content because proxy owns locale redirects', () => {
    expect(Home()).toBeNull();
  });
});
