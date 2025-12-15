// panel.js - Main logic for Side Panel UI

console.log('[Panel] Flow Automation Panel loaded');

// State Management
let state = {
    prompts: [],
    settings: {
        model: 'veo-3.1-fast',
        aspectRatio: '16:9',
        videoCount: 4,
        pacing: 10
    },
    automation: {
        isRunning: false,
        isPaused: false,
        currentIndex: 0,
        pollingInterval: null
    }
};

// DOM Elements
const elements = {
    fileUpload: document.getElementById('file-upload'),
    fileInfo: document.getElementById('file-info'),
    modelSelect: document.getElementById('model-select'),
    aspectSelect: document.getElementById('aspect-select'),
    countSelect: document.getElementById('count-select'),
    pacingInput: document.getElementById('pacing-input'),
    startBtn: document.getElementById('start-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    stopBtn: document.getElementById('stop-btn'),
    statusText: document.getElementById('status-text'),
    progressFill: document.getElementById('progress-fill'),
    promptsTbody: document.getElementById('prompts-tbody'),
    promptModal: document.getElementById('prompt-modal'),
    videoModal: document.getElementById('video-modal'),
    modalPromptText: document.getElementById('modal-prompt-text'),
    modalPromptIndex: document.getElementById('modal-prompt-index'),
    savePromptBtn: document.getElementById('save-prompt-btn'),
    videoPreviewContainer: document.getElementById('video-preview-container')
};

// Initialize
async function init() {
    console.log('[Panel] Initializing...');

    // Load saved settings
    await loadSettings();

    // Setup event listeners
    setupEventListeners();

    // Update UI
    updateSettingsUI();
    updateStatusText('⏳ Sẵn sàng. Vui lòng tải file prompts.');
}

// Load settings from storage
async function loadSettings() {
    try {
        const result = await chrome.storage.local.get(['settings', 'prompts']);

        if (result.settings) {
            state.settings = { ...state.settings, ...result.settings };
        }

        if (result.prompts && result.prompts.length > 0) {
            state.prompts = result.prompts;
            renderPromptsTable();
            elements.startBtn.disabled = false;
        }
    } catch (error) {
        console.error('[Panel] Error loading settings:', error);
    }
}

// Save settings to storage
async function saveSettings() {
    try {
        await chrome.storage.local.set({
            settings: state.settings,
            prompts: state.prompts
        });
    } catch (error) {
        console.error('[Panel] Error saving settings:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // File upload
    elements.fileUpload.addEventListener('change', handleFileUpload);
    document.querySelector('.upload-box').addEventListener('click', () => {
        elements.fileUpload.click();
    });

    // Settings
    elements.modelSelect.addEventListener('change', (e) => {
        state.settings.model = e.target.value;
        saveSettings();
    });

    elements.aspectSelect.addEventListener('change', (e) => {
        state.settings.aspectRatio = e.target.value;
        saveSettings();
    });

    elements.countSelect.addEventListener('change', (e) => {
        state.settings.videoCount = parseInt(e.target.value);
        saveSettings();
    });

    elements.pacingInput.addEventListener('change', (e) => {
        state.settings.pacing = parseInt(e.target.value);
        saveSettings();
    });

    // Control buttons
    elements.startBtn.addEventListener('click', handleStart);
    elements.pauseBtn.addEventListener('click', handlePause);
    elements.stopBtn.addEventListener('click', handleStop);

    // Modal
    document.querySelectorAll('.close-modal').forEach(el => {
        el.addEventListener('click', () => {
            elements.promptModal.style.display = 'none';
        });
    });

    document.querySelectorAll('.close-video-modal').forEach(el => {
        el.addEventListener('click', () => {
            elements.videoModal.style.display = 'none';
        });
    });

    elements.savePromptBtn.addEventListener('click', handleSavePrompt);

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === elements.promptModal) {
            elements.promptModal.style.display = 'none';
        }
        if (e.target === elements.videoModal) {
            elements.videoModal.style.display = 'none';
        }
    });
}

// Update settings UI
function updateSettingsUI() {
    elements.modelSelect.value = state.settings.model;
    elements.aspectSelect.value = state.settings.aspectRatio;
    elements.countSelect.value = state.settings.videoCount;
    elements.pacingInput.value = state.settings.pacing;
}

// Handle file upload
async function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.name.endsWith('.txt')) {
        alert('⚠️ Vui lòng chọn file .txt');
        return;
    }

    try {
        const text = await file.text();
        const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        if (lines.length === 0) {
            alert('⚠️ File không có nội dung');
            return;
        }

        // Create prompts with UUIDs
        state.prompts = lines.map((prompt, index) => ({
            id: index,
            uuid: generateUUID(),
            text: prompt,
            progress: 0,
            status: 'pending' // pending, rendering, completed, error
        }));

        elements.fileInfo.textContent = `✅ Đã tải ${lines.length} prompts từ ${file.name}`;

        // Render table
        renderPromptsTable();

        // Enable start button
        elements.startBtn.disabled = false;

        // Save to storage
        await saveSettings();

        updateStatusText(`✅ Đã tải ${lines.length} prompts. Sẵn sàng tạo video.`);

    } catch (error) {
        console.error('[Panel] Error reading file:', error);
        alert('❌ Lỗi đọc file: ' + error.message);
    }
}

// Generate UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Render prompts table
function renderPromptsTable() {
    elements.promptsTbody.innerHTML = '';

    state.prompts.forEach((prompt, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index;

        // STT
        const sttCell = document.createElement('td');
        sttCell.textContent = index + 1;

        // Prompt (truncated)
        const promptCell = document.createElement('td');
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt-text';
        promptSpan.textContent = prompt.text.length > 40
            ? prompt.text.substring(0, 40) + '...'
            : prompt.text;
        promptSpan.addEventListener('click', () => openPromptModal(index));
        promptCell.appendChild(promptSpan);

        // Progress
        const progressCell = document.createElement('td');
        progressCell.className = 'progress-cell';
        progressCell.textContent = `${prompt.progress}%`;

        // Set color based on progress
        if (prompt.progress === 0) {
            progressCell.classList.add('progress-0');
        } else if (prompt.progress < 50) {
            progressCell.classList.add('progress-low');
        } else if (prompt.progress < 100) {
            progressCell.classList.add('progress-high');
        } else {
            progressCell.classList.add('progress-complete');
        }

        // Actions
        const actionsCell = document.createElement('td');
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'action-buttons';

        // Retry button
        const retryBtn = document.createElement('button');
        retryBtn.className = 'action-btn action-btn-retry';
        retryBtn.textContent = '🔄';
        retryBtn.title = 'Tạo lại';
        retryBtn.addEventListener('click', () => handleRetry(index));

        // View button
        const viewBtn = document.createElement('button');
        viewBtn.className = 'action-btn action-btn-view';
        viewBtn.textContent = '👁️';
        viewBtn.title = 'Xem video';
        viewBtn.addEventListener('click', () => handleViewVideos(index));
        viewBtn.disabled = prompt.progress < 100;

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn';
        editBtn.textContent = '✏️';
        editBtn.title = 'Sửa';
        editBtn.addEventListener('click', () => openPromptModal(index));

        actionsDiv.appendChild(retryBtn);
        actionsDiv.appendChild(viewBtn);
        actionsDiv.appendChild(editBtn);
        actionsCell.appendChild(actionsDiv);

        row.appendChild(sttCell);
        row.appendChild(promptCell);
        row.appendChild(progressCell);
        row.appendChild(actionsCell);

        elements.promptsTbody.appendChild(row);
    });
}

// Update prompts table (progress only)
function updatePromptsTable() {
    state.prompts.forEach((prompt, index) => {
        const row = elements.promptsTbody.querySelector(`tr[data-index="${index}"]`);
        if (!row) return;

        const progressCell = row.querySelector('.progress-cell');
        const viewBtn = row.querySelector('.action-btn-view');

        if (progressCell) {
            progressCell.textContent = `${prompt.progress}%`;

            // Update color
            progressCell.className = 'progress-cell';
            if (prompt.progress === 0) {
                progressCell.classList.add('progress-0');
            } else if (prompt.progress < 50) {
                progressCell.classList.add('progress-low');
            } else if (prompt.progress < 100) {
                progressCell.classList.add('progress-high');
            } else {
                progressCell.classList.add('progress-complete');
            }
        }

        if (viewBtn) {
            viewBtn.disabled = prompt.progress < 100;
        }
    });
}

// Open prompt modal
function openPromptModal(index) {
    const prompt = state.prompts[index];
    elements.modalPromptText.value = prompt.text;
    elements.modalPromptIndex.value = index;
    elements.promptModal.style.display = 'block';
}

// Save prompt edit
function handleSavePrompt() {
    const index = parseInt(elements.modalPromptIndex.value);
    const newText = elements.modalPromptText.value.trim();

    if (!newText) {
        alert('⚠️ Prompt không được để trống');
        return;
    }

    state.prompts[index].text = newText;
    renderPromptsTable();
    saveSettings();
    elements.promptModal.style.display = 'none';
}

// Handle retry
async function handleRetry(index) {
    const prompt = state.prompts[index];

    // Reset progress
    prompt.progress = 0;
    prompt.status = 'pending';

    updatePromptsTable();
    saveSettings();

    // Submit this prompt
    await submitSinglePrompt(index);
}

// Handle view videos
function handleViewVideos(index) {
    const prompt = state.prompts[index];

    // This would need to query the Flow page for rendered videos
    // For now, show a placeholder
    elements.videoPreviewContainer.innerHTML = `
    <p style="padding: 20px; text-align: center;">
      🎥 Tính năng xem video đang phát triển.<br>
      Vui lòng xem video trực tiếp trên trang Flow.<br><br>
      UUID: <code>${prompt.uuid}</code>
    </p>
  `;

    elements.videoModal.style.display = 'block';
}

// Update status text
function updateStatusText(text) {
    elements.statusText.textContent = text;
}

// Update progress bar
function updateProgressBar() {
    const total = state.prompts.length;
    if (total === 0) {
        elements.progressFill.style.width = '0%';
        return;
    }

    const completed = state.prompts.filter(p => p.progress >= 100).length;
    const percentage = Math.round((completed / total) * 100);

    elements.progressFill.style.width = `${percentage}%`;
}

// Send message to content script
async function sendToContentScript(type, payload = {}) {
    try {
        const response = await chrome.runtime.sendMessage({
            type: 'EXECUTE_CONTENT_SCRIPT',
            data: {
                action: type,
                payload: payload
            }
        });

        if (!response) {
            throw new Error('Không nhận được phản hồi từ background script');
        }

        if (!response.success) {
            throw new Error(response.error || 'Unknown error');
        }

        return response.response;
    } catch (error) {
        console.error('[Panel] Error sending to content script:', error);

        // Provide helpful error messages
        let userMessage = error.message;

        if (error.message.includes('Receiving end does not exist')) {
            userMessage = '❌ Không thể kết nối với trang Flow.\n\n' +
                '📋 Hướng dẫn khắc phục:\n' +
                '1. Mở trang Google Labs Flow (https://labs.google/fx/tools/flow)\n' +
                '2. Nhấn F5 để refresh trang\n' +
                '3. Đợi trang load hoàn toàn\n' +
                '4. Thử lại';
        } else if (error.message.includes('Extension context invalidated')) {
            userMessage = '❌ Extension đã được cập nhật.\n\n' +
                'Vui lòng đóng panel này và mở lại.';
        }

        const enhancedError = new Error(userMessage);
        enhancedError.originalError = error;
        throw enhancedError;
    }
}

// Start automation
async function handleStart() {
    if (state.prompts.length === 0) {
        alert('⚠️ Vui lòng tải file prompts trước');
        return;
    }

    // Confirm with user about manual setup
    const confirmed = confirm(
        '⚠️ LƯU Ý:\n\n' +
        'Extension sẽ TỰ ĐỘNG:\n' +
        '✅ Click "New Project" (nếu cần)\n' +
        '✅ Submit tất cả prompts\n' +
        '✅ Track progress real-time\n\n' +
        'Extension KHÔNG tự động setup:\n' +
        '❌ Model (Veo 3.1, Fast, etc.)\n' +
        '❌ Tỷ lệ (16:9 hoặc 9:16)\n' +
        '❌ Số lượng video (1-4)\n\n' +
        'Hãy SETUP THỦ CÔNG trước khi bấm OK!\n\n' +
        'Bạn đã setup xong chưa?'
    );

    if (!confirmed) {
        return;
    }

    try {
        updateStatusText('🚀 Bắt đầu quá trình tự động...');

        // Disable start button
        elements.startBtn.disabled = true;
        elements.pauseBtn.disabled = false;
        elements.stopBtn.disabled = false;

        state.automation.isRunning = true;
        state.automation.isPaused = false;

        // Step 0: Click "New Project" if on landing page
        updateStatusText('📂 Kiểm tra workspace...');
        try {
            const newProjectResult = await sendToContentScript('CLICK_NEW_PROJECT');

            if (newProjectResult && !newProjectResult.alreadyInWorkspace) {
                console.log('[Panel] Clicked New Project, now in workspace');
                await sleep(2000);
            } else {
                console.log('[Panel] Already in workspace');
            }
        } catch (error) {
            console.log('[Panel] Skip New Project step:', error.message);
        }

        // Step 1: Set zoom to 25% (optional)
        try {
            updateStatusText('📐 Thu nhỏ trang Flow về 25%...');
            await chrome.runtime.sendMessage({
                type: 'SET_BROWSER_ZOOM',
                data: { zoomLevel: 0.25 }
            });
            await sleep(500);
        } catch (error) {
            console.log('[Panel] Skip zoom step:', error.message);
        }

        // Step 2: Click Grid button (optional)
        try {
            updateStatusText('🔲 Bật chế độ Grid...');
            await sendToContentScript('CLICK_GRID');
            await sleep(500);
        } catch (error) {
            console.log('[Panel] Skip grid step:', error.message);
        }

        // Skip Tune and settings - go directly to prompts
        updateStatusText('🎬 Bắt đầu tạo video...');

        // Start polling for progress
        startProgressPolling();

        // Process prompts sequentially with pacing
        await processPromptsWithPacing();

    } catch (error) {
        console.error('[Panel] Error in automation:', error);
        alert('❌ Lỗi: ' + error.message);
        handleStop();
    }
}

// Process prompts with pacing
async function processPromptsWithPacing() {
    for (let i = 0; i < state.prompts.length; i++) {
        if (!state.automation.isRunning) {
            break;
        }

        // Wait if paused
        while (state.automation.isPaused) {
            await sleep(500);
        }

        const prompt = state.prompts[i];

        // Skip if already completed
        if (prompt.progress >= 100) {
            continue;
        }

        state.automation.currentIndex = i;

        // Submit prompt
        updateStatusText(`📝 Đang tạo prompt ${i + 1}/${state.prompts.length}...`);
        await submitSinglePrompt(i);

        // Wait for pacing threshold if not the last prompt
        if (i < state.prompts.length - 1) {
            updateStatusText(`⏳ Đợi prompt ${i + 1} đạt ${state.settings.pacing}%...`);
            await waitForPacing(i);
        }
    }

    // Wait for all to complete
    updateStatusText('⏳ Đợi tất cả video hoàn tất...');
    await waitForAllComplete();

    // Done
    updateStatusText('✅ Hoàn tất! Tất cả video đã được tạo.');
    handleStop();
}

// Submit single prompt
async function submitSinglePrompt(index) {
    try {
        const prompt = state.prompts[index];

        // Check if there's available rendering slot
        await waitForAvailableSlot();

        const result = await sendToContentScript('SUBMIT_PROMPT', {
            prompt: prompt.text,
            uuid: prompt.uuid
        });

        if (result.success) {
            prompt.status = 'rendering';
            console.log(`[Panel] Submitted prompt ${index + 1}:`, prompt.text.substring(0, 50));
        } else {
            throw new Error(result.error);
        }

    } catch (error) {
        console.error('[Panel] Error submitting prompt:', error);
        state.prompts[index].status = 'error';
    }
}

// Wait for available rendering slot (max 5 concurrent)
async function waitForAvailableSlot() {
    const MAX_SLOTS = 5;

    while (true) {
        const result = await sendToContentScript('COUNT_SLOTS');

        if (result.activeSlots < MAX_SLOTS) {
            return;
        }

        // Wait 3 seconds before checking again
        await sleep(3000);
    }
}

// Wait for pacing threshold
async function waitForPacing(index) {
    const prompt = state.prompts[index];
    const threshold = state.settings.pacing;

    while (prompt.progress < threshold) {
        if (!state.automation.isRunning) {
            return;
        }

        await sleep(3000); // Check every 3 seconds
    }
}

// Wait for all prompts to complete
async function waitForAllComplete() {
    while (true) {
        const allComplete = state.prompts.every(p => p.progress >= 100);

        if (allComplete) {
            return;
        }

        if (!state.automation.isRunning) {
            return;
        }

        await sleep(5000);
    }
}

// Start progress polling
function startProgressPolling() {
    if (state.automation.pollingInterval) {
        clearInterval(state.automation.pollingInterval);
    }

    state.automation.pollingInterval = setInterval(async () => {
        await updateAllProgress();
    }, 3000); // Poll every 3 seconds
}

// Stop progress polling
function stopProgressPolling() {
    if (state.automation.pollingInterval) {
        clearInterval(state.automation.pollingInterval);
        state.automation.pollingInterval = null;
    }
}

// Update all prompts progress
async function updateAllProgress() {
    try {
        const uuids = state.prompts
            .filter(p => p.status === 'rendering')
            .map(p => p.uuid);

        if (uuids.length === 0) {
            return;
        }

        const result = await sendToContentScript('GET_PROGRESS', { uuids });

        if (result.success) {
            const progressData = result.data;

            state.prompts.forEach(prompt => {
                if (progressData[prompt.uuid]) {
                    const data = progressData[prompt.uuid];
                    if (data.found) {
                        prompt.progress = data.percentage;
                        prompt.status = data.status || 'rendering';
                    }
                }
            });

            updatePromptsTable();
            updateProgressBar();
            saveSettings();
        }

    } catch (error) {
        console.error('[Panel] Error updating progress:', error);
    }
}

// Handle pause
function handlePause() {
    state.automation.isPaused = !state.automation.isPaused;

    if (state.automation.isPaused) {
        elements.pauseBtn.textContent = '▶️ Tiếp tục';
        updateStatusText('⏸️ Đã tạm dừng');
    } else {
        elements.pauseBtn.textContent = '⏸️ Tạm dừng';
        updateStatusText('▶️ Đang tiếp tục...');
    }
}

// Handle stop
function handleStop() {
    state.automation.isRunning = false;
    state.automation.isPaused = false;

    stopProgressPolling();

    elements.startBtn.disabled = false;
    elements.pauseBtn.disabled = true;
    elements.stopBtn.disabled = true;
    elements.pauseBtn.textContent = '⏸️ Tạm dừng';

    updateStatusText('⏹️ Đã dừng');
}

// Sleep utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize on load
init();
