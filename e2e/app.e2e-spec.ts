import { Ng2FuzhutechAuthPage } from './app.po';

describe('ng2-fuzhutech-auth App', () => {
  let page: Ng2FuzhutechAuthPage;

  beforeEach(() => {
    page = new Ng2FuzhutechAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
