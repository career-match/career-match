import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { studentHomePage } from './studenthome.page';
import { companyHomePage } from './companyhome.page';
import { adminHomePage } from './adminhome.page';
import { searchPage } from './search.page';
import { listCompaniesPage } from './listcompanies.page';
import { listStudentsPage } from './liststudents.page';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const student = { username: 'john@foo.com', password: 'changeme' };
const company = { username: 'alice@apple.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };

fixture('career-match localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that sign up page shows up', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
});

test('Test pages accessible to student', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, student.username, student.password);
  await navBar.isLoggedIn(testController, student.username);

  await studentHomePage.isDisplayed(testController);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
  await navBar.gotoListCompaniesPage(testController);
  await listCompaniesPage.isDisplayed(testController);

  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test pages accessible to company', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, company.username, company.password);
  await navBar.isLoggedIn(testController, company.username);

  await companyHomePage.isDisplayed(testController);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
  await navBar.gotoListCompaniesPage(testController);
  await listCompaniesPage.isDisplayed(testController);
  await navBar.gotoListStudentsPage(testController);
  await listStudentsPage.isDisplayed(testController);

  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test pages accessible to admin', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);

  await adminHomePage.isDisplayed(testController);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
  await navBar.gotoListCompaniesPage(testController);
  await listCompaniesPage.isDisplayed(testController);
  await navBar.gotoListStudentsPage(testController);
  await listStudentsPage.isDisplayed(testController);
  await navBar.gotoLandingPage(testController);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoEditStudents(testController);
  await listStudentsPage.isDisplayed(testController);
  await navBar.gotoLandingPage(testController);
  await adminHomePage.isDisplayed(testController);
  await adminHomePage.gotoFindCompanies(testController);
  await listCompaniesPage.isDisplayed(testController);

  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
