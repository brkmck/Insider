const { expect } = require("@playwright/test");
const dataUtils = require('../utils/dataUtils');

exports.LeverPage = class LeverPage {

    constructor(page) {
        this.page = page;
        this.buttonApplyForThisJob = page.locator(`xpath=(//a[text()='Apply for this job'])[1]`);
    }

    async switchToNewTab() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page')
        ]);
        this.page = newPage;
        console.log("Lever sayfasına geçiş yapıldı.");
        return new LeverPage(this.page);
    }

    async checkPageLoaded(){
        await this.page.waitForLoadState('domcontentloaded');
        await this.buttonApplyForThisJob.waitFor({ state: 'visible'}, { timeout: 5000 });
        console.log("Lever sayfası yüklendi.");
    }
}