// content.js - Tương tác với DOM của trang Flow

console.log('[Content Script] Flow Automation loaded');

// State
let isAutomationRunning = false;
let pollingInterval = null;

// XPath Helper
function getElementByXPath(xpath) {
    return document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;
}

// Utility: wait for element
function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const checkElement = () => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error(`Element ${selector} not found after ${timeout}ms`));
            } else {
                setTimeout(checkElement, 100);
            }
        };

        checkElement();
    });
}

// Utility: Generate UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 0. Click "New Project" button (if on landing page)
async function clickNewProject() {
    try {
        // Multiple ways to find the "+ New project" button
        let newProjectBtn = null;

        // Method 1: Find by text content "+ New project"
        const allButtons = Array.from(document.querySelectorAll('button, a, div[role="button"]'));
        newProjectBtn = allButtons.find(btn =>
            btn.textContent.includes('+ New project') ||
            btn.textContent.includes('New project') ||
            btn.textContent.includes('Dự án mới') ||
            btn.textContent.includes('+ Dự án mới') ||
            btn.getAttribute('aria-label')?.includes('New') ||
            btn.getAttribute('aria-label')?.includes('Dự án')
        );

        if (!newProjectBtn) {
            console.log('[Content] New Project button not found - assuming already in workspace');
            return { success: true, alreadyInWorkspace: true };
        }

        newProjectBtn.click();
        console.log('[Content] Clicked New Project button');

        // Wait for workspace to load
        await new Promise(r => setTimeout(r, 2000));

        return { success: true, alreadyInWorkspace: false };
    } catch (error) {
        console.error('[Content] Error clicking New Project:', error);
        return { success: false, error: error.message };
    }
}

// 1. Click Grid Button
async function clickGridButton() {
    try {
        // XPath: button with grid_on icon
        const gridButton = getElementByXPath("//button[.//i[text()='grid_on']]");

        if (!gridButton) {
            throw new Error('Không tìm thấy nút Grid');
        }

        gridButton.click();
        console.log('[Content] Clicked Grid button');

        await new Promise(r => setTimeout(r, 500));
        return { success: true };
    } catch (error) {
        console.error('[Content] Error clicking grid button:', error);
        return { success: false, error: error.message };
    }
}

// 2. Open Tune Settings
async function openTuneSettings() {
    try {
        const tuneButton = document.querySelector('button.sc-92c9e477-0');

        if (!tuneButton) {
            throw new Error('Không tìm thấy nút Tune');
        }

        tuneButton.click();
        console.log('[Content] Opened Tune settings');

        await new Promise(r => setTimeout(r, 800));
        return { success: true };
    } catch (error) {
        console.error('[Content] Error opening tune:', error);
        return { success: false, error: error.message };
    }
}

// 3. Set Model
async function setModel(modelType) {
    try {
        // Click model dropdown (support both Vietnamese and English)
        const modelButton = Array.from(document.querySelectorAll('div[role="button"]'))
            .find(el => el.textContent.includes('Mô hình') || el.textContent.includes('Model'));

        if (!modelButton) {
            throw new Error('Không tìm thấy dropdown Model');
        }

        modelButton.click();
        await new Promise(r => setTimeout(r, 500));

        // Select model option
        let modelOption;
        switch (modelType) {
            case 'veo-3.1-fast':
                modelOption = Array.from(document.querySelectorAll('div[role="option"]'))
                    .find(el => el.textContent.includes('Veo 3.1 - Fast') &&
                        !el.textContent.includes('[Lower Priority]'));
                break;
            case 'veo-3.1-fast-lower':
                modelOption = Array.from(document.querySelectorAll('div[role="option"]'))
                    .find(el => el.textContent.includes('Veo 3.1 - Fast') &&
                        el.textContent.includes('[Lower Priority]'));
                break;
            case 'veo-3.1':
                modelOption = Array.from(document.querySelectorAll('div[role="option"]'))
                    .find(el => el.textContent === 'Veo 3.1' ||
                        (el.textContent.includes('Veo 3.1') &&
                            !el.textContent.includes('Fast') &&
                            !el.textContent.includes('[Lower Priority]')));
                break;
            case 'veo-3.1-lower':
                modelOption = Array.from(document.querySelectorAll('div[role="option"]'))
                    .find(el => el.textContent.includes('Veo 3.1') &&
                        !el.textContent.includes('Fast') &&
                        el.textContent.includes('[Lower Priority]'));
                break;
            default:
                modelOption = Array.from(document.querySelectorAll('div[role="option"]'))
                    .find(el => el.textContent.includes('Veo 3.1 - Fast') &&
                        !el.textContent.includes('[Lower Priority]'));
        }

        if (!modelOption) {
            throw new Error('Không tìm thấy model option');
        }

        modelOption.click();
        console.log('[Content] Set model:', modelType);

        await new Promise(r => setTimeout(r, 300));
        return { success: true };
    } catch (error) {
        console.error('[Content] Error setting model:', error);
        return { success: false, error: error.message };
    }
}

// 4. Set Video Count
async function setVideoCount(count) {
    try {
        // Support both Vietnamese and English
        const countButton = Array.from(document.querySelectorAll('div[role="button"]'))
            .find(el => el.textContent.includes('Câu trả lời đầu ra') ||
                el.textContent.includes('Output') ||
                el.textContent.includes('videos'));

        if (!countButton) {
            throw new Error('Không tìm thấy dropdown số lượng video');
        }

        countButton.click();
        await new Promise(r => setTimeout(r, 500));

        const countOption = Array.from(document.querySelectorAll('div[role="option"]'))
            .find(el => el.querySelector('span')?.textContent === String(count));

        if (!countOption) {
            throw new Error(`Không tìm thấy option ${count}`);
        }

        countOption.click();
        console.log('[Content] Set video count:', count);

        await new Promise(r => setTimeout(r, 300));
        return { success: true };
    } catch (error) {
        console.error('[Content] Error setting video count:', error);
        return { success: false, error: error.message };
    }
}

// 5. Set Aspect Ratio
async function setAspectRatio(ratio) {
    try {
        // Support both Vietnamese and English
        const aspectButton = Array.from(document.querySelectorAll('div[role="button"]'))
            .find(el => el.textContent.includes('Tỷ lệ khung hình') ||
                el.textContent.includes('Aspect ratio') ||
                el.textContent.includes('Aspect'));

        if (!aspectButton) {
            throw new Error('Không tìm thấy dropdown tỷ lệ');
        }

        aspectButton.click();
        await new Promise(r => setTimeout(r, 500));

        let aspectOption;
        if (ratio === '16:9') {
            aspectOption = Array.from(document.querySelectorAll('div[role="option"]'))
                .find(el => el.textContent.includes('Khổ ngang') ||
                    el.textContent.includes('16:9') ||
                    el.textContent.includes('Landscape'));
        } else if (ratio === '9:16') {
            aspectOption = Array.from(document.querySelectorAll('div[role="option"]'))
                .find(el => el.textContent.includes('Khổ dọc') ||
                    el.textContent.includes('9:16') ||
                    el.textContent.includes('Portrait'));
        }

        if (!aspectOption) {
            throw new Error('Không tìm thấy aspect ratio option');
        }

        aspectOption.click();
        console.log('[Content] Set aspect ratio:', ratio);

        await new Promise(r => setTimeout(r, 300));
        return { success: true };
    } catch (error) {
        console.error('[Content] Error setting aspect ratio:', error);
        return { success: false, error: error.message };
    }
}

// 6. Submit Prompt
async function submitPrompt(promptText, uuid) {
    try {
        const textarea = document.getElementById('PINHOLE_TEXT_AREA_ELEMENT_ID');

        if (!textarea) {
            throw new Error('Không tìm thấy ô nhập prompt');
        }

        // Add UUID to prompt
        const fullPrompt = `${uuid} ${promptText}`;

        // Clear and set new value
        textarea.value = '';
        await new Promise(r => setTimeout(r, 100));

        textarea.value = fullPrompt;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        console.log('[Content] Set prompt:', fullPrompt.substring(0, 50) + '...');

        // Wait for Generate button to appear
        await new Promise(r => setTimeout(r, 800));

        // Click Generate button (support both Vietnamese and English)
        const generateBtn = Array.from(document.querySelectorAll('button'))
            .find(el => (el.textContent.includes('Tạo') || el.textContent.includes('Create') || el.textContent.includes('Generate')) &&
                (el.classList.contains('sc-408537d4-2') || el.innerHTML.includes('arrow_forward')));

        if (!generateBtn) {
            throw new Error('Không tìm thấy nút Tạo');
        }

        generateBtn.click();
        console.log('[Content] Clicked Generate button');

        await new Promise(r => setTimeout(r, 1000));

        return { success: true, uuid: uuid };
    } catch (error) {
        console.error('[Content] Error submitting prompt:', error);
        return { success: false, error: error.message };
    }
}

// 7. Find Prompt Parent Div by UUID
function findPromptParentDiv(uuid) {
    const container = document.querySelector('.sc-c884da2c-6');
    if (!container) return null;

    const allDivs = container.querySelectorAll('div');

    for (let div of allDivs) {
        if (div.innerText && div.innerText.includes(uuid)) {
            // Find parent that contains both prompt and video elements
            let parent = div;
            while (parent && parent !== container) {
                const hasPercentages = parent.querySelector('[class*="sc-c884da2c-10"]') ||
                    Array.from(parent.querySelectorAll('div'))
                        .some(d => d.innerText && d.innerText.includes('%'));
                if (hasPercentages) {
                    return parent;
                }
                parent = parent.parentElement;
            }
            // Return closest container div
            return div.closest('div[class*="sc-c884da2c"]');
        }
    }

    return null;
}

// 8. Calculate Progress Percentage
function calculateProgressPercentage(uuid) {
    const parentDiv = findPromptParentDiv(uuid);
    if (!parentDiv) {
        return { found: false, percentage: 0 };
    }

    const percentages = [];
    let completedCount = 0;
    const allDivs = parentDiv.querySelectorAll('div');

    // Find rendering videos (with %)
    for (let div of allDivs) {
        const text = div.innerText;
        if (text && text.includes('%')) {
            const match = text.match(/(\d+)\s*%/);
            if (match) {
                percentages.push(parseInt(match[1]));
            }
        }
    }

    // Find completed videos
    const hasVideos = parentDiv.querySelectorAll('video, img[src*="blob"], button[aria-label*="Play"]').length > 0;
    const hasDownloadButtons = parentDiv.querySelectorAll('button[aria-label*="download"], button[aria-label*="Tải"]').length;

    if (hasDownloadButtons > 0) {
        completedCount = hasDownloadButtons;
    }

    // If no percentages found but videos exist, assume completed
    if (percentages.length === 0 && hasVideos) {
        return { found: true, percentage: 100, status: 'completed' };
    }

    // If no percentages and no videos, not started yet
    if (percentages.length === 0 && !hasVideos) {
        return { found: true, percentage: 0, status: 'pending' };
    }

    // Calculate average
    // Completed videos count as 100%
    const totalPercentages = [...percentages];
    for (let i = 0; i < completedCount; i++) {
        totalPercentages.push(100);
    }

    if (totalPercentages.length === 0) {
        return { found: true, percentage: 0, status: 'pending' };
    }

    const sum = totalPercentages.reduce((a, b) => a + b, 0);
    const avgPercentage = Math.round(sum / totalPercentages.length);

    return {
        found: true,
        percentage: avgPercentage,
        status: avgPercentage >= 100 ? 'completed' : 'rendering'
    };
}

// 9. Get All Prompts Status
function getAllPromptsStatus(uuidList) {
    const results = {};

    uuidList.forEach(uuid => {
        const status = calculateProgressPercentage(uuid);
        results[uuid] = status;
    });

    return results;
}

// 10. Count Active Rendering Slots
function countActiveRenderingSlots() {
    const container = document.querySelector('.sc-c884da2c-6');
    if (!container) return 0;

    let activeSlots = 0;
    const allDivs = container.querySelectorAll('div');

    // Count divs with percentage indicators
    for (let div of allDivs) {
        if (div.innerText && div.innerText.match(/\d+\s*%/)) {
            activeSlots++;
        }
    }

    // Flow typically has 5 concurrent rendering slots
    return Math.min(activeSlots, 5);
}

// Message Listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[Content] Received message:', message.type);

    (async () => {
        try {
            switch (message.type) {
                case 'CLICK_NEW_PROJECT':
                    const newProjectResult = await clickNewProject();
                    sendResponse(newProjectResult);
                    break;

                case 'CLICK_GRID':
                    const gridResult = await clickGridButton();
                    sendResponse(gridResult);
                    break;

                case 'OPEN_TUNE':
                    const tuneResult = await openTuneSettings();
                    sendResponse(tuneResult);
                    break;

                case 'SET_MODEL':
                    const modelResult = await setModel(message.payload.model);
                    sendResponse(modelResult);
                    break;

                case 'SET_VIDEO_COUNT':
                    const countResult = await setVideoCount(message.payload.count);
                    sendResponse(countResult);
                    break;

                case 'SET_ASPECT_RATIO':
                    const aspectResult = await setAspectRatio(message.payload.ratio);
                    sendResponse(aspectResult);
                    break;

                case 'SUBMIT_PROMPT':
                    const submitResult = await submitPrompt(
                        message.payload.prompt,
                        message.payload.uuid
                    );
                    sendResponse(submitResult);
                    break;

                case 'GET_PROGRESS':
                    const progressResult = getAllPromptsStatus(message.payload.uuids);
                    sendResponse({ success: true, data: progressResult });
                    break;

                case 'COUNT_SLOTS':
                    const slotsCount = countActiveRenderingSlots();
                    sendResponse({ success: true, activeSlots: slotsCount });
                    break;

                case 'GENERATE_UUID':
                    const uuid = generateUUID();
                    sendResponse({ success: true, uuid: uuid });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            console.error('[Content] Error handling message:', error);
            sendResponse({ success: false, error: error.message });
        }
    })();

    return true; // Keep channel open for async response
});

console.log('[Content Script] Ready to receive messages');
