const { expect } = require("@playwright/test");
const dataUtils = require('../utils/dataUtils');

exports.CareersPage = class CareersPage {

    constructor(page) {
        this.page = page;
        this.buttonFindYourDreamJob = page.locator(`xpath=(//a[contains(text(), 'Find your dream job')])[1]`);
        this.listTeams = page.locator(`xpath=//section[@id='career-find-our-calling']/div/div/div[2]/div`);
        this.listLocations = page.locator(`xpath=//div[@id='location-slider']/div/ul/li`);
        this.listLifeAtInsider = page.locator(`xpath=//div[@class='swiper-wrapper']/div`);
        this.buttonSeeAllQaJobs = page.locator(`xpath=//a[@href='https://useinsider.com/careers/open-positions/?department=qualityassurance']`);
        this.openPositionsFilters = page.locator(`xpath=//form[@id='top-filter-form']`);
        this.selectLocation = page.locator(`xpath=//select[@id='filter-by-location']`);
        this.firstJob = page.locator(`xpath=//div[@id='jobs-list']/div[1]`);
        this.listJobs = page.locator(`xpath=//div[@id='jobs-list']/div`);
        this.listJobsDepartment = page.locator(`xpath=//div[@id='jobs-list']/div/div/span`);
        this.listJobsLocation = page.locator(`xpath=//div[@id='jobs-list']/div/div/div`);
        this.buttonViewRole = page.locator(`xpath=//div[@id='jobs-list']/div[1]/div/a`);
    }

    async checkPageLoaded(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.buttonFindYourDreamJob.waitFor({ state: 'visible'});
        await expect(this.listTeams).toHaveCount(3);
        await expect(this.listLocations).toHaveCount(25);
        await expect(this.listLifeAtInsider).toHaveCount(13);
        console.log("Careers sayfası yüklendi.");
    }

    async navigateToTeam(team){
        await this.page.goto(dataUtils.getVariable("BASE_URL") + 'careers/' + team, {waitUntil :'domcontentloaded'});
        console.log("Teams sayfasına geçiş yapıldı.");
    }

    async clickSeeAllQaJobs(){
        await this.buttonSeeAllQaJobs.click();
        console.log("See All Qa Jobs butonuna tıklandı.");
    }

    async checkOpenPositionsPageLoaded(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.openPositionsFilters.waitFor({ state: 'visible'});
        console.log("Open Positions sayfası yüklendi.");
    }

    async filterLocation(location){
        await this.selectLocation.selectOption(location);
        console.log("Location filtrelemesi yapıldı.");
    }

    async checkJobsList(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(5000);
        await this.firstJob.hover();
        await expect(await this.listJobs.count()).toBeGreaterThan(0);
        console.log("Açık pozisyonların listesi kontrol edildi.");
    }

    async checkJobsListDetails(location, department){
        await this.page.waitForTimeout(5000);
        await this.firstJob.hover();
        const listJobsCount = await this.listJobs.count();
        for (let i = 0; i < listJobsCount; i++) {
            await expect(this.listJobsLocation.nth(i)).toHaveText(location);
            await expect(this.listJobsDepartment.nth(i)).toHaveText(department);
        }
        console.log("Açık pozisyonlar lokasyon ve departmanlara göre kontrol edildi.");
    }

    async clickViewRole(){
        await this.buttonViewRole.click();
        console.log("View Role butonuna tıklandı.");
    }
}