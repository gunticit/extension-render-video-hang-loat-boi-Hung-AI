// background.js - Service Worker for Chrome Extension

// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Open side panel
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Message handler
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Received message:', message);

  switch (message.type) {
    case 'SET_BROWSER_ZOOM':
      handleSetZoom(message.data, sendResponse);
      return true; // Keep channel open for async response

    case 'GET_CURRENT_TAB':
      handleGetCurrentTab(sendResponse);
      return true;

    case 'EXECUTE_CONTENT_SCRIPT':
      handleExecuteContentScript(message.data, sendResponse);
      return true;

    default:
      sendResponse({ success: false, error: 'Unknown message type' });
      return false;
  }
});

// Set zoom level for Flow tab
async function handleSetZoom(data, sendResponse) {
  try {
    const { zoomLevel } = data;

    // Query for Flow tab
    const tabs = await chrome.tabs.query({
      url: [
        'https://labs.google/fx/tools/flow*',
        'https://labs.google/fx/*/tools/flow*'
      ]
    });

    if (tabs.length === 0) {
      sendResponse({
        success: false,
        error: 'Không tìm thấy tab Flow. Vui lòng mở trang Flow trước.'
      });
      return;
    }

    const flowTab = tabs[0];

    // Set zoom
    await chrome.tabs.setZoom(flowTab.id, zoomLevel);

    console.log(`[Background] Set zoom to ${zoomLevel * 100}% for tab ${flowTab.id}`);

    sendResponse({
      success: true,
      tabId: flowTab.id,
      zoomLevel: zoomLevel
    });
  } catch (error) {
    console.error('[Background] Error setting zoom:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Get current active tab
async function handleGetCurrentTab(sendResponse) {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    sendResponse({
      success: true,
      tab: tab
    });
  } catch (error) {
    console.error('[Background] Error getting current tab:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Execute content script action
async function handleExecuteContentScript(data, sendResponse) {
  try {
    const tabs = await chrome.tabs.query({
      url: [
        'https://labs.google/fx/tools/flow*',
        'https://labs.google/fx/*/tools/flow*'
      ]
    });

    if (tabs.length === 0) {
      sendResponse({
        success: false,
        error: 'Không tìm thấy tab Flow'
      });
      return;
    }

    const flowTab = tabs[0];

    // Send message to content script
    const response = await chrome.tabs.sendMessage(flowTab.id, {
      type: data.action,
      payload: data.payload
    });

    sendResponse({
      success: true,
      response: response
    });
  } catch (error) {
    console.error('[Background] Error executing content script:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Installation handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[Background] Extension installed successfully');

    // Set default settings
    chrome.storage.local.set({
      settings: {
        model: 'veo-3.1-fast',
        aspectRatio: '16:9',
        videoCount: 4,
        pacing: 10
      },
      prompts: [],
      activePrompts: []
    });
  } else if (details.reason === 'update') {
    console.log('[Background] Extension updated');
  }
});

console.log('[Background] Service worker loaded');
