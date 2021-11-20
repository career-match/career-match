import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#search-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const searchPage = new SearchPage();
