const { test, expect } = require('@playwright/test');
const iphoneList = []

test('Lazada', async ({ page }) => {
  test.setTimeout(120000)
  await page.goto('https://lazada.com.my/')
  await page.locator('//*[@id="q"]').fill('iPhone 15 Pro')
  await page.keyboard.press('Enter')
  for (let i = 1; i < 3; i++) {
      const iphoneObj = {
        website: 'Lazada',
        name: await page.locator(`//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[${i}]/div/div/div[2]/div[2]/a`).textContent(),
        price: await page.locator(`//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[${i}]/div/div/div[2]/div[3]/span`).textContent(),
        url: ''
      };

      const itemBlockSelector = page.locator(`//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]/div[${i}]`);
      await itemBlockSelector.click();

      iphoneObj.url = page.url();
      
      iphoneList.push(iphoneObj);
      await page.goBack();
    }
});

test('Zalora', async ({ page }) => {
  test.setTimeout(120000)
  await page.goto('https://zalora.com.my/')
  await page.locator('input[name="q"]').fill('iphone 15 pro');
  await page.locator('//*[@id="onsiteSearch"]/button').click();
  for (let i = 1; i < 3; i++) {
      const iphoneObj = {
        website: 'Zalora',
        name: await page.locator(`//*[@id="__next"]/div[3]/main/div/div[2]/div[2]/div[2]/div[2]/a[${i}]/div/div[2]/div[2]`).innerText(),
        price: await page.locator(`//*[@id="__next"]/div[3]/main/div/div[2]/div[2]/div[2]/div[2]/a[${i}]/div/div[2]/div[3]/div[1]`).innerText(),
        url: ''
      };

      const itemBlockSelector = page.locator(`//*[@id="__next"]/div[3]/main/div/div[2]/div[2]/div[2]/div[2]/a[${i}]/div/div[1]/span/img`);
      await itemBlockSelector.click();

      iphoneObj.url = page.url();
      
      iphoneList.push(iphoneObj);
      await page.goBack();
    }

    const sortedIphoneList = [...iphoneList].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('RM', '').replace(',', ''));
      const priceB = parseFloat(b.price.replace('RM', '').replace(',', ''));
      return priceA - priceB;
  });
  
  sortedIphoneList.forEach((iphone, index) => {
      console.log(`\n${index + 1}. Name of the Website: ${iphone.website}`);
      console.log(`   Name of the product: ${iphone.name}`);
      console.log(`   Price of the product: ${iphone.price}`);
      console.log(`   URL to the product: ${iphone.url}`);
  });
});