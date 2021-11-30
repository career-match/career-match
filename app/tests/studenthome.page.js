import { Selector } from 'testcafe';

class StudentHomePage {
  constructor() {
    this.pageId = '#student-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditProfilePage(testController) {
    await testController.click('#edit-student-profile-button');
  }

  async gotoFindCompaniesPage(testController) {
    await testController.click('#find-companies-button');
  }
}

export const studentHomePage = new StudentHomePage();
