describe('Sauce Demo iOS Test', () => {
    it('should open localhost via optimized tunnel', async () => {
        // Log a custom message to the Sauce Labs 'Commands' tab for Kieran
        await browser.execute('sauce:context=Testing local connectivity via Sauce Connect');

        // Navigate to your local python server
        await browser.url('http://stefano.local:8080');
        
        // Take a screenshot - this will show up in the Sauce Labs 'Screenshots' tab
        await browser.takeScreenshot();

        // Log the actual page title to the terminal
        const title = await browser.getTitle();
        console.log(`Successfully reached local server! Page title is: ${title}`);
        
        // Final breadcrumb in the Sauce video
        await browser.execute('sauce:context=Localhost reached successfully');
    });
});