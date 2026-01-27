import {test , expect} from '@playwright/test';

test("Check If page is correct by verifying title", async function({page}){
    await page.goto("https://demoqa.com/login");
    const title = await page.locator("//div[@class='login-wrapper']/h1").textContent();
    if (title){
        await expect(title).toBe("Login");
    }
});

test("Check Each text", async function({page}){
    await page.goto("https://demoqa.com/login");
    const text1 = await page.locator("//div[@style='margin-bottom: 50px;']/h2").textContent();
    const text2 = await page.locator("//div[@style='margin-bottom: 50px;']/h5").textContent();
    if(text1 && text2){
        expect(text1).toBe("Welcome,");
        expect(text2).toBe("Login in Book Store");
    }
});

test("Check for invalid User Login", async function ({page}){
    await page.goto("https://demoqa.com/login");
    await page.locator("#userName").fill("RandomUser123");
    await page.locator("#password").fill("RandomUser123");
    await page.locator("#login").click();
    const text = await page.locator("#name").textContent();
    if (text){
        await expect(text).toBe("Invalid username or password!");
    }
});

test("Check Registration Page Info", async function({page}){
    await page.goto("https://demoqa.com/login");
    await page.locator("#newUser").click();
    const title = await page.locator("//h1[@class='text-center']").textContent();
    const underText = await page.locator("//div[@style='margin-bottom: 50px;']/h4").textContent();
    if (title && underText){
        await expect(title).toBe("Register");
        await expect(underText).toBe("Register to Book Store");
    }
});

test("Register New User UnSuccessfully", async function({page}){
    await page.goto("https://demoqa.com/login");
    await page.locator("#newUser").click();
    await page.locator("#firstname").fill("Random");
    await page.locator("#lastname").fill("User");
    await page.locator("#userName").fill("RandomUser");
    await page.locator("#password").fill("RA");
    await page.locator("//iframe[@title='reCAPTCHA']").click();
    await page.locator("#register").click();
    const result = await page.locator("#name").textContent();
    if (result){
        await expect(result).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    }
});

test("Register New User Successfully", async function({page}){
    await page.goto("https://demoqa.com/login");
    //await page.pause();
    await page.locator("#newUser").click();
    await page.locator("#firstname").fill("Random");
    await page.locator("#lastname").fill("User");
    await page.locator("#userName").fill("RandomUser123New");
    await page.locator("#password").fill("RandomUser@123New");
    await page.locator("//iframe[@title='reCAPTCHA']").click();
    // page.on('dialog', async dialog => {
    //     console.log(dialog.message());
    //     await expect(dialog.message()).toBe("User Register Successfully.");
    //     await dialog.accept();
    // });
    // await page.locator("#register").click();
    const [dialog] = await Promise.all([                                       // There is some problem here couldnt verify the user registered successfully dialog
        page.waitForEvent('dialog'),
        page.locator("#register").click()                                      // Dialog Issue
    ]);
    await expect(dialog.message()).toBe("User Register Successfully.");
    await dialog.accept();
});

test("Check for Valid User Login", async function ({page}){
    await page.goto("https://demoqa.com/login");
    await page.locator("#userName").fill("RandomUser123New");
    await page.locator("#password").fill("RandomUser@123New");
    await page.locator("#login").click();
    const userName = await page.locator("#userName-value").textContent();
    if (userName){
        await expect(userName).toBe("RandomUser123New");
    }
});

test("Check Book Store" , async function({page}){
    await page.goto("https://demoqa.com/login");
    await page.locator("#userName").fill("RandomUser123New");
    await page.locator("#password").fill("RandomUser@123New");
    await page.locator("#login").click();
    await page.locator("#gotoStore").click();
    await page.locator("#searchBox").fill("Git");
    await page.locator(".mr-2").click();
    
});