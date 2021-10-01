import { LinkGuard } from './link.guard';

describe('LinkGuard', () => {
  let linkGuard: LinkGuard;

  beforeEach(() => {
    linkGuard = new LinkGuard();
  });

  it('should be defined', () => {
    expect(linkGuard).toBeDefined();
  });
});
