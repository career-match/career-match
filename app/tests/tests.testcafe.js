import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { studentHomePage } from './studenthome.page';
import { companyHomePage } from './companyhome.page';
import { adminHomePage } from './adminhome.page';
import { signupPage } from './signup.page';
import { findCompaniesPage } from './findcompanies.page';
import { editStudentProfilePage } from './editstudentprofile.page';
import { editCompanyProfilePage } from './editcompanyprofile.page';
import { findStudentsPage } from './findstudents.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const student = { username: 'john@foo.com', password: 'changeme' };
const recruiter = { username: 'apple@foo.com', password: 'changeme' };
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
  await navBar.gotoEditProfilePage(testController);
  await editStudentProfilePage.isDisplayed(testController);
  await navBar.gotoFindCompaniesPage(testController);
  await findCompaniesPage.isDisplayed(testController);
  await navBar.gotoLandingPage(testController);
  await studentHomePage.gotoEditProfilePage(testController);
  await editStudentProfilePage.isDisplayed(testController);
  await navBar.gotoLandingPage(testController);
  await studentHomePage.gotoFindCompaniesPage(testController);
  await findCompaniesPage.isDisplayed(testController);

  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test pages accessible to recruiter', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, recruiter.username, recruiter.password);
  await navBar.isLoggedIn(testController, recruiter.username);

  await companyHomePage.isDisplayed(testController);
  await navBar.gotoEditProfilePage(testController);
  await editCompanyProfilePage.isDisplayed(testController);
  await navBar.gotoFindStudentsPage(testController);
  await findStudentsPage.isDisplayed(testController);

  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test pages accessible to admin', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.isLoggedIn(testController, admin.username);

  await adminHomePage.isDisplayed(testController);
  await navBar.gotoFindCompaniesPage(testController);
  await findCompaniesPage.isDisplayed(testController);
  await navBar.gotoFindStudentsPage(testController);
  await findStudentsPage.isDisplayed(testController);

  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
