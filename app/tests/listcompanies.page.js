import { Selector } from 'testcafe';

class ListCompaniesPage {
  constructor() {
    this.pageId = '#list-companies-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const listCompaniesPage = new ListCompaniesPage();
