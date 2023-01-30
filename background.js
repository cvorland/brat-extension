chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if ((changeInfo.status && changeInfo.status == 'complete')) {
        chrome.scripting.executeScript(
            {
                target: {tabId: tabId},
                files: ['contentscript.js'],
            }
        );
    }
});