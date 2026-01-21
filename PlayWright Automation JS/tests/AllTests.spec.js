const {test , expect, request} = require('@playwright/test');

test("Check page title", async function({page}){
    await page.goto("https://demoqa.com");
    console.log(await page.title());
});

test('Open Browser and check title', async function({page}){
    await page.goto('https://demoqa.com/text-box');
    await page.locator('#userName').fill('TestingInProgress');
    await page.locator('#userEmail').fill('Testing@gmail.com');
    await page.locator('#currentAddress').fill('Random Address Inserted');
    await page.locator('#permanentAddress').fill('Parmanent address inserted');
    await page.locator('#submit').click();
});

test('Switch to another browser window', async function({context,page}){
    await page.goto('https://demoqa.com/browser-windows');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('#tabButton').click()
    ]);
    const pageContent = await newPage.locator('#sampleHeading').textContent();
    console.log(pageContent);
});

test('Nested IFrame', async function({page}){
    await page.goto('https://demoqa.com/nestedframes');
    const frame1 = page.frameLocator('#frame1');
    const frame2 = frame1.frameLocator('iframe[xpath="1"]');
    console.log(await frame2.locator("//p[xpath='1']").textContent());
    //Not Working
});

test("Testing alert btn", async function({page}){
    await page.goto("https://demoqa.com/alerts");
    page.on('dialog',async dialog => {
        console.log(dialog.message()),
        await dialog.accept()
    });
    await page.locator('#alertButton').click();
});

test("Testing time alert", async function({page}){
    await page.goto("https://demoqa.com/alerts");
    //await page.pause();
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();

    });
    await page.locator('#timerAlertButton').click();
});

test("Testing confirm alert", async function({page}){
    await page.goto("https://demoqa.com/alerts");
    //await page.pause();
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();

    });
    await page.locator('#confirmButton').click();
});

test("Testing prompt alert", async function({page}){
    await page.goto("https://demoqa.com/alerts");
    await page.pause();
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept("ABCD");

    });
    await page.locator('#promtButton').click();
});

test("Singular frame", async function({page}){
    await page.goto("https://demoqa.com/frames");
    const frame = page.frameLocator("#frame1");
    console.log(await frame.locator('#sampleHeading').textContent());
});

test("Downloading a file", async function({page}){
    await page.goto("https://demoqa.com/upload-download");
    await page.pause();
    await page.locator("#downloadButton").click();
    await page.waitForEvent('download');
});

test("Uploading a file" , async function({page}){
    await page.goto("https://demoqa.com/upload-download");
    //await page.pause();
    await page.locator('#uploadFile').setInputFiles('C:/Users/2418102/Downloads/sampleFile.jpeg');
});

test("Valid Image Check", async function({page}){
    await page.goto("https://demoqa.com/broken");
    const displayedimg = page.locator("//img[@src = '/images/Toolsqa.jpg']").nth(0);
    expect(await displayedimg.screenshot()).toMatchSnapshot("toolsqa.png");
});

test("Invalid Image Check", async function({page}){
    await page.goto("https://demoqa.com/broken");
    const displayedimg = page.locator("//img[@src = '/images/Toolsqa_1.jpg']");
    expect(await displayedimg.screenshot()).toMatchSnapshot("toolsqa.png");
});

test("Check correct link", async function({page, request}){
    await page.goto('https://demoqa.com/broken');
    const link = await page.locator("//a[@href='http://demoqa.com']").getAttribute('href');
    const response = await request.get(link);
    //console.log(response.status());
    expect(response.status()).toBe(200);
});

test("Check incorrect link", async function({page , request}){
    await page.goto('https://demoqa.com/broken');
    const link = await page.locator("//a[@href='http://the-internet.herokuapp.com/status_codes/500']").getAttribute('href');
    const response = await request.get(link);
    //console.log(response.status());
    expect(response.status()).toBe(500);
});

test("Add element @RunTable", async function({page}){
    await page.goto("https://demoqa.com/webtables");
    await page.locator("#addNewRecordButton").click();
    await page.getByPlaceholder("First Name").fill("TEST");
    await page.getByPlaceholder("Last Name").fill("QA");
    await page.getByPlaceholder("name@example.com").fill("TestQA@gmail.com");
    await page.getByPlaceholder("Age").fill('22');
    await page.getByPlaceholder("Salary").fill('26249');
    await page.getByPlaceholder("Department").fill("QEA");
    await page.locator("#submit").click();
});

test("Check the last non empty row and print its value @RunTable", async function({page}){
    await page.goto("https://demoqa.com/webtables");
    const rows = page.locator(".rt-tr-group");
    const rowcount = await rows.count();
    var empty = 0;
    for (let i = 0 ; i < rowcount ; i++){
        var row = rows.nth(i);
        const [cell_data] = await row.locator("[role='gridcell']").allTextContents();
        if (cell_data.trim() == ""){                                                            //Trim is added to make sure that the spaces are removed so that i can easily show its null and find the number of empty rows
            empty = empty + 1;
        }
    }
    const hasData = (rowcount - empty) - 1;
    const lastRow = rows.nth(hasData);
    const cell = lastRow.locator("[role='gridcell']");
    const cell_datas = await cell.allTextContents();
    const numOfData = await cell.count();
    for (let i = 0 ; i < numOfData ; i++){
        console.log(cell_datas[i]);
    }
});

test("Check the last user added non empty row and print its value @RunTable", async function({page}){
    await page.goto("https://demoqa.com/webtables");
    await page.locator("#addNewRecordButton").click();
    await page.getByPlaceholder("First Name").fill("TEST");
    await page.getByPlaceholder("Last Name").fill("QA");
    await page.getByPlaceholder("name@example.com").fill("TestQA@gmail.com");
    await page.getByPlaceholder("Age").fill('22');
    await page.getByPlaceholder("Salary").fill('26249');
    await page.getByPlaceholder("Department").fill("QEA");
    await page.locator("#submit").click();
    const rows = page.locator(".rt-tr-group");
    const rowcount = await rows.count();
    var empty = 0;
    for (let i = 0 ; i < rowcount ; i++){
        var row = rows.nth(i);
        const [cell_data] = await row.locator("[role='gridcell']").allTextContents();
        if (cell_data.trim() == ""){                                                            //Trim is added to make sure that the spaces are removed so that i can easily show its null and find the number of empty rows
            empty = empty + 1;
        }
    }
    const hasData = (rowcount - empty) - 1;
    const lastRow = rows.nth(hasData);
    const cell = lastRow.locator("[role='gridcell']");
    const cell_datas = await cell.allTextContents();
    const numOfData = await cell.count();
    for (let i = 0 ; i < numOfData ; i++){
        console.log(cell_datas[i]);
    }
});

test("Change the web table dropdowns", async function({page}){
    await page.goto("https://demoqa.com/webtables");
    //await page.pause();
    await page.locator("//select[@aria-label='rows per page']").selectOption("100");
});

test("Dynamic Element", async function({page}){
    await page.goto("https://demoqa.com/dynamic-properties");
    //await page.pause();
    expect(page.locator("#enableAfter").isEnabled()).toBeTruthy();
    expect(await page.locator("#visibleAfter").isVisible()).toBeTruthy();
    //for colour ought to be learned
});

test("Double Click @TypesOfClick" ,async function({page}){
    await page.goto("https://demoqa.com/buttons");
    await page.locator("#doubleClickBtn").dblclick();
    await expect(page.locator("#doubleClickMessage")).toBeVisible();
});

test("Right Click @TypesOfClick" ,async function({page}){
    await page.goto("https://demoqa.com/buttons");
    await page.locator("#rightClickBtn").click({button : 'right'});
    await expect(page.locator("#rightClickMessage")).toBeVisible();
});

test("Click @TypesOfClick" ,async function({page}){
    await page.goto("https://demoqa.com/buttons");
    //await page.locator("//button[@type='button' and @class='btn btn-primary']").nth(2).click();
    await page.getByText('Click Me',{exact : true}).click();
    await expect(page.locator("#dynamicClickMessage")).toBeVisible();
});

test("Full form filling", async function({page}){
    await page.goto("https://demoqa.com/automation-practice-form");
    //await page.pause();
    await page.getByPlaceholder("First Name").fill("TEST");
    await page.getByPlaceholder("Last Name").fill("QA");
    await page.getByPlaceholder("name@example.com").fill("TESTQA@gmail.com");
    await page.locator("//label[@for='gender-radio-1']").check();
    await page.getByPlaceholder("Mobile Number").fill('0000000000');
    //await page.locator("#dateOfBirthInput").fill('12/05/2003');
    await page.locator("#dateOfBirthInput").click();
    await page.locator(".react-datepicker__month-select").selectOption("May");
    await page.locator(".react-datepicker__year-select").selectOption("2003");
    await page.locator("//div[@aria-label='Choose Monday, May 12th, 2003']").click();
    await page.locator("#subjectsInput").pressSequentially("Bio");
    await page.keyboard.press('Enter');
    //const dropdown = page.locator(".subjects-auto-complete__menu css-2613qy-menu");
    //const resultLocator = await page.locator(".subjects-auto-complete__menu css-2613qy-menu").allTextContents();
    //dropdown.locator("button").click();
    //await page.locator("#subjectsInput").click();
    await page.locator("//label[@for='hobbies-checkbox-1']").click();
    await page.locator("#uploadPicture").setInputFiles("C:/Users/2418102/Downloads/sampleFile.jpeg");
    await page.getByPlaceholder("Current Address").fill("Test QA There");
    await page.locator("#react-select-3-input").pressSequentially("Uttar");
    //await page.locator("#react-select-3-input").click();
    await page.keyboard.press('Enter');
    //await page.locator(".css-1g6gooi").last().pressSequentially("Ag");
    await page.locator("#react-select-4-input").pressSequentially("Ag");
    //await page.getByText("Select City").pressSequentially("Ag");
    //await page.locator("#react-select-7-input").click();
    await page.keyboard.press('Enter');
    await page.locator("#submit").click();
    expect(page.locator(".modal-content")).toBeVisible();
});

test("Check Small Modal", async function({page}){
    await page.goto("https://demoqa.com/modal-dialogs");
    const smallModelLocator = page.locator("#showSmallModal");
    await smallModelLocator.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    console.log(await page.locator("//div[@id='example-modal-sizes-title-sm' and @class='modal-title h4']").textContent());
    console.log(await page.locator("//div[@class = 'modal-body']").textContent());
});

test("Check Big Modal", async function({page}){
    await page.goto("https://demoqa.com/modal-dialogs");
    await page.locator("#showLargeModal").click();
    console.log(await page.locator("#example-modal-sizes-title-lg").textContent());
    console.log(await page.locator("//p[@class='']").textContent());
});

test("Accordian test first", async function({page}){
    await page.goto("https://demoqa.com/accordian");
    const header = await page.locator(".text-center").textContent();
    if (header !== "Accordian"){
        expect(header).toBe("Accordian");
        console.log("Failed Test");
    }
    //await page.locator("#section1Heading").click();
    console.log(await page.locator("//div[@id = 'section1Content']/p[@class = '']").textContent());
});

test("Accordian test second", async function({page}){
    await page.goto("https://demoqa.com/accordian");
    const header = await page.locator(".text-center").textContent();
    if (header !== "Accordian"){
        expect(header).toBe("Accordian");
        console.log("Failed Test");
    }
    await page.locator("#section2Heading").click();
    console.log(await page.locator("//div[@id = 'section2Content']/p[@class = '']").textContent());
});

test("Accordian test third", async function({page}){
    await page.goto("https://demoqa.com/accordian");
    const header = await page.locator(".text-center").textContent();
    if (header !== "Accordian"){
        expect(header).toBe("Accordian");
        console.log("Failed Test");
    }
    await page.locator("#section3Heading").click();
    console.log(await page.locator("//div[@id = 'section3Content']/p[@class = '']").textContent());
});

test("Checking AutoComplete Element #1", async function({page}){
    await page.goto("https://demoqa.com/auto-complete");
    //await page.pause();
    const firstLocator = page.locator("#autoCompleteMultipleInput");
    await firstLocator.pressSequentially('Re');
    await page.keyboard.press('Enter');
    await firstLocator.pressSequentially('Ye');
    await page.keyboard.press('Enter');
    await firstLocator.pressSequentially('Gr');
    await page.keyboard.press('Enter');
    await firstLocator.pressSequentially('Bl');
    await page.keyboard.press('Enter');
});

test("Checking AutoComplete Element #2", async function({page}){
    await page.goto("https://demoqa.com/auto-complete");
    //await page.pause();
    const firstLocator = page.locator("#autoCompleteSingleInput");
    await firstLocator.pressSequentially('Re');
    await page.keyboard.press('Enter');
});

test("Check Date Picker with time", async function({page}){
    await page.goto("https://demoqa.com/date-picker");
    await page.pause();
    await page.locator("#datePickerMonthYearInput").click();
    await page.locator(".react-datepicker__month-select").selectOption("January");
    await page.locator(".react-datepicker__year-select").selectOption("2000");
    await page.locator("//div[@aria-label='Choose Saturday, January 1st, 2000']").click();
    await page.locator("#dateAndTimePickerInput").click();
    await page.locator(".react-datepicker__month-read-view--selected-month").click(); //fix this (Not selecting the right month)
    await page.locator(".react-datepicker__month-option").first().click();
    const yearL = page.locator(".react-datepicker__year-read-view--selected-year");
    await yearL.click(); //fix this (Not selecting the right year)
    //const options = yearL.locator(".react-datepicker__year-option");
    const prevButton = page.locator("//a[@class='react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous']");
    for (let i = 0 ; i < 20 ; i++){
        await prevButton.click();
    }
    await page.getByText("2000").click();
    await page.getByText("10:00").click();
});

test("Check the slider", async function({page}){
    await page.goto("https://demoqa.com/slider");
    //await page.pause()
    const sliderL = page.locator("//input[@class='range-slider range-slider--primary']");
    const target = page.locator("#sliderValue");
    //await sliderL.dragTo(target); //only worked because i pulled it all the way wont be able to do if its in the middle or someother position.
    const property = await sliderL.boundingBox();
    await page.mouse.move(property.x, property.y + property.height /2);
    await page.mouse.down();
    await page.mouse.move(property.x + 50, property.y + property.height /2);
    await page.mouse.up();
});

test("Check Progress bar", async function({page}){
    await page.goto("https://demoqa.com/progress-bar");
    await page.locator("#startStopButton").click();
    await page.waitForTimeout(3000);
    await page.locator("#startStopButton").click();
});

test("Check Tabs", async function({page}){
    await page.goto("https://demoqa.com/tabs");
    await page.locator("#demo-tab-what").click();
    const text1 = await page.locator("//div[@id = 'demo-tabpane-what']/p[@class='mt-3']").textContent();
    console.log(text1);
    await page.locator("#demo-tab-origin").click();
    const text2 = await page.locator("//div[@id = 'demo-tabpane-origin']/p[@class='mt-3']").textContent();
    console.log(text2);
    await page.locator("#demo-tab-use").click();
    const text3 = await page.locator("//div[@id = 'demo-tabpane-use']/p[@class='mt-3']").textContent();
    console.log(text3);
});

//Not working fix this tooltip
test("Checking tooltip", async function({page}){
    await page.goto("https://demoqa.com/tool-tips");
    const LCT = page.locator("#toolTipButton");
    await LCT.hover();
    const tooltipp = page.locator("//button[@aria-describedby = 'buttonToolTip']");
    console.log(await tooltipp.getAttribute('tooltip'));     //Cannot extract the tooltip text
});

test("Checking Menu #1", async function({page}){
    await page.goto("https://demoqa.com/menu#");
    const L1 = page.locator("//a[@href='#']").first();
    console.log(await L1.textContent());
});

test("Checking Menu #2", async function({page}){
    await page.goto("https://demoqa.com/menu#");
    const L2 = page.locator("//a[@href='#']").nth(1);
    console.log(await L2.textContent());
    await L2.hover();
    const insideL2 = page.locator("//ul[@id='nav']/li/ul/li[1]/a");
    console.log(await insideL2.textContent());
});

test("Checking Menu #3", async function({page}){
    await page.goto("https://demoqa.com/menu#");
    const L3 = page.locator("//a[@href='#']").last();
    console.log(await L3.textContent());
});

test("Checking select menu", async function({page}){
    await page.goto("https://demoqa.com/select-menu");
    await page.pause();
    await page.locator("#withOptGroup").click();
    await page.getByText("Group 2, option 1").click();
    await page.locator("#selectOne").click();
    await page.getByText("Dr.").last().click();
    await page.locator("#oldSelectMenu").selectOption("Black");
    await page.locator(".css-tlfecz-indicatorContainer").last().click();
    await page.getByText("Red").last().click();
    await page.locator("#cars").selectOption("Opel");
});

test("Checking sortable Menu", async function({page}){
    await page.goto("https://demoqa.com/sortable");
    //await page.pause();
    const Initial = page.getByText("One").first();
    const Target = page.getByText("Six").first();
    await Initial.dragTo(Target);
});

test("Checking sortable Menu #AlternateMethod", async function({page}){
    await page.goto("https://demoqa.com/sortable");
    //await page.pause();
    const Initial = page.getByText("One").first();
    const Target = page.getByText("Six").first();
    const InitialBox = await Initial.boundingBox();
    const TargetBox = await Target.boundingBox();
    await page.mouse.move(InitialBox.x + InitialBox.width/2 , InitialBox.y + InitialBox.height/2);
    await page.mouse.down();
    await page.mouse.move(TargetBox.x + TargetBox.width/2 , TargetBox.y + TargetBox.height/2);
    await page.mouse.up();
});

test("Checking Selectable Menu", async function({page}){
    await page.goto("https://demoqa.com/selectable");
    //await page.pause();
    await page.getByText("Cras justo odio").click();
    await page.getByText("Porta ac consectetur ac").click();
    await page.getByText("Dapibus ac facilisis in").click();
});

test("Checking Resizable Menu #1", async function({page}){
    await page.goto("https://demoqa.com/resizable");
    await page.pause();
    const Object = page.locator("//span[@class='react-resizable-handle react-resizable-handle-se']").first();
    const ObjectBox = await Object.boundingBox();
    await page.mouse.move(ObjectBox.x + ObjectBox.width/2 , ObjectBox.y + ObjectBox.height/2);
    await page.mouse.down();
    await page.mouse.move(ObjectBox.x + ObjectBox.width/2 + 100 , ObjectBox.y + ObjectBox.height/2 + 100);
    await page.mouse.up();
});

test("Checking Resizable Menu #2", async function({page}){
    await page.goto("https://demoqa.com/resizable");
    await page.pause();
    const Object = page.locator("//span[@class='react-resizable-handle react-resizable-handle-se']").nth(1);
    const ObjectBox = await Object.boundingBox();
    await page.mouse.move(ObjectBox.x + ObjectBox.width/2 , ObjectBox.y + ObjectBox.height/2);
    await page.mouse.down();
    await page.mouse.move(ObjectBox.x + ObjectBox.width/2 + 100 , ObjectBox.y + ObjectBox.height/2 + 100);
    await page.mouse.up();
});

test("Checking Droppable Menu #1", async function({page}){
    await page.goto("https://demoqa.com/droppable");
    //await page.pause();
    const Initial = page.locator("#draggable");
    const Target = page.locator("#droppable").first();
    await Initial.dragTo(Target);
    const status = await page.locator("//div[@id='droppable']/p").first().textContent();
    await expect(status).toBe("Dropped!");
});

test("Checking Droppable Menu #2", async ({page}) => {
    await page.goto("https://demoqa.com/droppable");
    //await page.pause();
    await page.locator("#droppableExample-tab-accept").click();
    const nonAcceptableInitialLocator = page.locator("#notAcceptable");
    const UniversalTarget = page.locator("#droppable").nth(1);
    await nonAcceptableInitialLocator.dragTo(UniversalTarget);
    const Status = await page.locator("//div[@id = 'droppable']/p").nth(1).textContent();
    await expect(Status).toBe("Drop here");
});

test("Checking Droppable Menu #2P2", async ({page}) => {
    await page.goto("https://demoqa.com/droppable");
    //await page.pause();
    await page.locator("#droppableExample-tab-accept").click();
    const UniversalTarget = page.locator("#droppable").nth(1);
    const AcceptableInitialLocator = page.locator("#acceptable");
    await AcceptableInitialLocator.dragTo(UniversalTarget);
    const Status = await page.locator("//div[@id = 'droppable']/p").nth(1).textContent();
    await expect(Status).toBe("Dropped!");
});

test("Checking Droppable Menu #3", async function({page}){
    await page.goto("https://demoqa.com/droppable");
    //await page.pause();
    await page.locator("#droppableExample-tab-preventPropogation").click();
    const DragBoxLocator = page.locator("#dragBox");
    const DragBoxDimention = await DragBoxLocator.boundingBox();
    const OuterDropBoxLocator = page.locator("#notGreedyDropBox");
    const OuterDropBoxDimention = await OuterDropBoxLocator.boundingBox();
    const InnerDropBoxLocator = page.locator("#notGreedyInnerDropBox");
    const InnerDropBoxDimention = await InnerDropBoxLocator.boundingBox();
    await page.mouse.move(DragBoxDimention.x + DragBoxDimention.width/2 , DragBoxDimention.y + DragBoxDimention.height/2);
    await page.mouse.down();
    await page.mouse.move(OuterDropBoxDimention.x + OuterDropBoxDimention.width/2 , OuterDropBoxDimention.y + OuterDropBoxDimention.height/6);
    await page.mouse.up();
    const OuterStatusMsg = await page.locator("//div[@id = 'notGreedyDropBox']/p").textContent();
    const InsideStatusMsg = await page.locator("//div[@id = 'notGreedyInnerDropBox']/p").textContent();
    expect(OuterStatusMsg).toBe("Dropped!");
    expect(InsideStatusMsg).toBe("Inner droppable (not greedy)");
});