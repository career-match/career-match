import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#admin-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditStudents(testController) {
    await testController.click('#edit-students-button');
  }

  async gotoFindCompanies(testController) {
    await testController.click('#find-companies-button');
  }
}

export const adminHomePage = new AdminHomePage();
