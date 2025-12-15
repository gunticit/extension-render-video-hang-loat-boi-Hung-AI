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
        error: 'Không tìm thấy tab Flow. Vui lòng mở trang Flow trước.'
      });
      return;
    }

    const flowTab = tabs[0];

    // Try to send message with retry logic
    const response = await sendMessageWithRetry(flowTab.id, {
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

// Send message with retry and auto-inject
async function sendMessageWithRetry(tabId, message, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`[Background] Attempt ${attempt + 1}/${maxRetries} to send message:`, message.type);

      // First, ping to check if content script is ready
      if (attempt === 0 || message.type !== 'PING') {
        try {
          await chrome.tabs.sendMessage(tabId, { type: 'PING', payload: {} });
          console.log('[Background] Content script is ready');
        } catch (pingError) {
          console.warn('[Background] Ping failed, content script not ready');
          throw pingError; // Will trigger injection logic below
        }
      }

      // Send actual message
      const response = await chrome.tabs.sendMessage(tabId, message);

      console.log('[Background] Message sent successfully');
      return response;

    } catch (error) {
      console.warn(`[Background] Attempt ${attempt + 1} failed:`, error.message);

      // If "receiving end does not exist", try to inject content script
      if (error.message.includes('Receiving end does not exist')) {
        if (attempt < maxRetries - 1) {
          console.log('[Background] Injecting content script...');

          try {
            // Inject content script
            await chrome.scripting.executeScript({
              target: { tabId: tabId },
              files: ['content.js']
            });

            console.log('[Background] Content script injected, waiting 1.5s...');
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Try again after injection
            continue;

          } catch (injectionError) {
            console.error('[Background] Failed to inject content script:', injectionError);

            // If injection fails, wait and retry
            if (attempt < maxRetries - 1) {
              const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
              console.log(`[Background] Waiting ${waitTime}ms before retry...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
            }
          }
        }
      } else {
        // For other errors, wait and retry
        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`[Background] Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }

      // If this is the last attempt, throw the error
      if (attempt === maxRetries - 1) {
        throw new Error(
          `Không thể kết nối với trang Flow sau ${maxRetries} lần thử. ` +
          `Vui lòng REFRESH (F5) trang Flow và thử lại. (${error.message})`
        );
      }
    }
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
