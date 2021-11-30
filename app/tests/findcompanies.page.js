import { Selector } from 'testcafe';

class FindCompaniesPage {
  constructor() {
    this.pageId = '#find-companies-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const findCompaniesPage = new FindCompaniesPage();
