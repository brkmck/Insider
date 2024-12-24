const dataUtils = require('../utils/dataUtils');

exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
        this.navbar = page.locator(`xpath=//div[@id='navbarNavDropdown']`);
        this.company = page.locator(`xpath=(//a[@id='navbarDropdownMenuLink'])[5]`);
        this.careers = page.locator(`xpath=//a[contains(text(), 'Careers')]`);
        this.buttonAcceptCookies = page.locator(`xpath=//a[@id='wt-cli-accept-all-btn']`);
    }

    async navigateToHomePage(){
        await this.page.goto(dataUtils.getVariable("BASE_URL"), {waitUntil :'domcontentloaded'});
        console.log("Anasayfaya gidildi.");
    }

    async checkNavbar(){
        await this.navbar.waitFor({ state: 'visible'});
        console.log("Navbar kontrol edildi.");
    }

    async gotoCareersPage(){
        await this.company.click();
        await this.careers.click();
        console.log("Careers sayfasına geçiş yapıldı.");
    }

    async acceptCookies(){
        await this.buttonAcceptCookies.click();
        console.log("Cookies kabul edildi.");
    }
}