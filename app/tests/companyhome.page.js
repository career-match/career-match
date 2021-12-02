import { Selector } from 'testcafe';

class CompanyHomePage {
  constructor() {
    this.pageId = '#company-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const companyHomePage = new CompanyHomePage();
