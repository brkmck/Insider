import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/homePage'
import { CareersPage } from '../../pages/careersPage'
import { LeverPage } from '../../pages/leverPage'

test('Search and View QA Role', async ({ page }) => {
  const homePage = new HomePage(page);
  const careersPage = new CareersPage(page);
  const leverPage = new LeverPage(page);

  //Anasayfaya gidilir, Navbar'ın yüklendiği görülür, Company menusunun altından Career tabı seçilir
  await homePage.navigateToHomePage();
  await homePage.acceptCookies();
  await homePage.checkNavbar();
  await homePage.gotoCareersPage();

  //Career sayfasının yüklendiği kontrol edilir, QA sayfasına gidilip bütün açık pozisyonlar listelenir
  await careersPage.checkPageLoaded();
  await careersPage.navigateToTeam("quality-assurance");
  await careersPage.clickSeeAllQaJobs();
  await careersPage.checkJobsList();

  //Location Istanbul,Turkey seçilip filtreleme işlemi yapılır ve açık pozisyonlar listelenir
  await careersPage.checkOpenPositionsPageLoaded();
  await careersPage.filterLocation("Istanbul, Turkey");
  await careersPage.checkJobsListDetails("Istanbul, Turkey", "Quality Assurance");

  //Açık pozisyona tıklanır ve lever sayfasına yönlendiği görülür
  await careersPage.clickViewRole();
  const switchLeverPage  = await leverPage.switchToNewTab();
  await switchLeverPage.checkPageLoaded();
});