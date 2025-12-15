# 🔧 TECHNICAL DOCUMENTATION - Flow Video Automation Extension

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Chrome Extension                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐      ┌──────────────┐                    │
│  │  Side Panel  │      │  Background  │                    │
│  │  (panel.*)   │◄────►│  Service     │                    │
│  │              │      │  Worker      │                    │
│  └──────┬───────┘      └──────┬───────┘                    │
│         │                      │                            │
│         │   chrome.runtime.sendMessage()                    │
│         │                      │                            │
│         └──────────────────────┘                            │
│                │                                             │
│                │ chrome.tabs.sendMessage()                  │
│                ▼                                             │
│         ┌──────────────┐                                    │
│         │  Content     │                                    │
│         │  Script      │                                    │
│         └──────┬───────┘                                    │
└────────────────┼────────────────────────────────────────────┘
                 │
                 │ DOM Manipulation
                 ▼
        ┌────────────────┐
        │  Flow Website  │
        │  (labs.google) │
        └────────────────┘
```

## File Structure

```
veo3/
├── manifest.json          # Extension configuration (Manifest V3)
├── background.js          # Service Worker (zoom, messaging)
├── content.js            # Content Script (Flow DOM interaction)
├── panel.html            # Side Panel UI structure
├── panel.css             # Side Panel styling
├── panel.js              # Side Panel logic
├── README.md             # Full documentation
├── QUICK_START.md        # Quick setup guide (Vietnamese)
└── sample_prompts.txt    # Sample prompts for testing
```

## Components Deep Dive

### 1. manifest.json
**Purpose**: Extension configuration (Manifest V3)

**Key Features**:
- Side Panel API declaration
- Content script injection for Flow pages
- Background service worker
- Required permissions: `tabs`, `storage`, `sidePanel`, `scripting`
- Host permissions: `https://labs.google/*`

**Critical Settings**:
```json
{
  "manifest_version": 3,
  "side_panel": {
    "default_path": "panel.html"
  },
  "content_scripts": [{
    "matches": ["https://labs.google/fx/*/tools/flow*"],
    "js": ["content.js"]
  }]
}
```

---

### 2. background.js
**Purpose**: Service Worker for background tasks

**Responsibilities**:
- Open Side Panel on icon click
- Handle zoom level changes (`chrome.tabs.setZoom`)
- Message routing between panel ↔ content script
- Initialize default settings on install

**Message Types**:
- `SET_BROWSER_ZOOM`: Set zoom level (25%)
- `GET_CURRENT_TAB`: Get active tab info
- `EXECUTE_CONTENT_SCRIPT`: Forward messages to content script

**Key Function**:
```javascript
chrome.tabs.setZoom(tabId, 0.25); // 25% zoom
```

---

### 3. content.js
**Purpose**: Interact with Flow page DOM

**XPath/Selectors Used**:
| Element | Selector | Purpose |
|---------|----------|---------|
| Grid Button | `//button[.//i[text()='grid_on']]` | Enable grid mode |
| Tune Button | `button.sc-92c9e477-0` | Open settings panel |
| Prompt Textarea | `#PINHOLE_TEXT_AREA_ELEMENT_ID` | Input prompt |
| Generate Button | `button.sc-408537d4-2` | Submit prompt |
| Main Container | `.sc-c884da2c-6` | Video render container |
| Model Dropdown | `div[role="button"]` + text match | Select model |
| Options | `div[role="option"]` + text match | Select dropdown values |

**Core Functions**:

#### `clickGridButton()`
- Uses XPath to find grid button
- Clicks to enable grid view mode

#### `openTuneSettings()`
- Clicks tune button (CSS selector)
- Waits 800ms for panel to open

#### `setModel(modelType)`
- Maps modelType to option text:
  - `veo-3.1-fast` → "Veo 3.1 - Fast" (no Lower Priority)
  - `veo-3.1-fast-lower` → "Veo 3.1 - Fast [Lower Priority]"
  - `veo-3.1` → "Veo 3.1" (no Fast, no Lower Priority)
  - `veo-3.1-lower` → "Veo 3.1 [Lower Priority]"

#### `setVideoCount(count)`
- Finds "Câu trả lời đầu ra" dropdown
- Selects option with count (1-4)

#### `setAspectRatio(ratio)`
- Finds "Tỷ lệ khung hình" dropdown
- Selects:
  - `16:9` → "Khổ ngang (16:9)"
  - `9:16` → "Khổ dọc (9:16)"

#### `submitPrompt(promptText, uuid)`
- Constructs: `${uuid} ${promptText}`
- Sets textarea value
- Triggers input/change events
- Waits for Generate button (800ms)
- Clicks Generate button

#### `findPromptParentDiv(uuid)`
- Searches `.sc-c884da2c-6` container
- Finds div with innerText containing UUID
- Returns parent div containing video elements

#### `calculateProgressPercentage(uuid)`
- Finds parent div by UUID
- Searches for divs with `%` text (rendering)
- Counts completed videos (video tags, play buttons, download buttons)
- Calculates average:
  ```
  Average = (sum of all percentages + 100 * completedCount) / totalVideos
  ```
- Returns: `{ found: true/false, percentage: 0-100, status: 'pending'|'rendering'|'completed' }`

#### `getAllPromptsStatus(uuidList)`
- Calls `calculateProgressPercentage()` for each UUID
- Returns object: `{ uuid1: {found, percentage, status}, uuid2: {...}, ... }`

#### `countActiveRenderingSlots()`
- Counts divs with `\d+\s*%` pattern in `.sc-c884da2c-6`
- Max: 5 slots (Flow's concurrent limit)

**Message Handlers**:
- `CLICK_GRID` → `clickGridButton()`
- `OPEN_TUNE` → `openTuneSettings()`
- `SET_MODEL` → `setModel(payload.model)`
- `SET_VIDEO_COUNT` → `setVideoCount(payload.count)`
- `SET_ASPECT_RATIO` → `setAspectRatio(payload.ratio)`
- `SUBMIT_PROMPT` → `submitPrompt(payload.prompt, payload.uuid)`
- `GET_PROGRESS` → `getAllPromptsStatus(payload.uuids)`
- `COUNT_SLOTS` → `countActiveRenderingSlots()`
- `GENERATE_UUID` → UUID generation

---

### 4. panel.html
**Purpose**: Side Panel UI structure

**Sections**:
1. **Header**: Title, subtitle
2. **Upload Section**: File input (.txt)
3. **Settings Section**: Model, Aspect Ratio, Video Count, Pacing
4. **Control Section**: Start, Pause, Stop buttons
5. **Status Bar**: Current status + progress bar
6. **Prompts Table**: STT, Prompt, %, Actions
7. **Modals**: Edit prompt modal, Video preview modal

**Key Elements**:
- `#file-upload`: File input
- `#model-select`, `#aspect-select`, `#count-select`: Dropdowns
- `#pacing-input`: Number input (0-100%)
- `#start-btn`, `#pause-btn`, `#stop-btn`: Control buttons
- `#prompts-table`: Dynamic table
- `#prompt-modal`, `#video-modal`: Modals

---

### 5. panel.css
**Purpose**: Styling with premium aesthetics

**Design System**:
```css
--primary-dark: #003300;      /* Dark green */
--primary-light: #006600;     /* Light green */
--bg-white: #ffffff;          /* White background */
--success-green: #00cc66;     /* Success color */
--warning-orange: #ff9933;    /* Warning color */
--danger-red: #ff4444;        /* Danger color */
```

**Key Features**:
- Gradient background: `#003300` → `#006600` → `white`
- Smooth animations: `fadeIn`, `fadeInDown`, `slideIn`
- Hover effects on all interactive elements
- Progress colors:
  - 0%: Gray
  - 1-49%: Orange
  - 50-99%: Light green
  - 100%: Dark green
- Box shadows with green tint
- Glassmorphism on modal backgrounds

**Animations**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

### 6. panel.js
**Purpose**: Main UI logic and automation workflow

**State Management**:
```javascript
state = {
  prompts: [
    { id, uuid, text, progress, status }
  ],
  settings: {
    model, aspectRatio, videoCount, pacing
  },
  automation: {
    isRunning, isPaused, currentIndex, pollingInterval
  }
}
```

**Workflow**:

#### Initialization
1. Load saved settings from `chrome.storage.local`
2. Load saved prompts
3. Setup event listeners
4. Render UI

#### File Upload Flow
1. User selects `.txt` file
2. Read file content
3. Split by `\n`, trim, filter empty
4. Generate UUID for each prompt
5. Create prompt objects: `{ id, uuid, text, progress: 0, status: 'pending' }`
6. Render table
7. Enable Start button
8. Save to storage

#### Start Automation Flow
```
1. Disable Start, Enable Pause/Stop
2. Set isRunning = true

3. Set zoom to 25%
   └─> chrome.runtime.sendMessage({ type: 'SET_BROWSER_ZOOM', data: { zoomLevel: 0.25 } })
       └─> background.js: chrome.tabs.setZoom(tabId, 0.25)

4. Click Grid button
   └─> sendToContentScript('CLICK_GRID')
       └─> content.js: clickGridButton()

5. Open Tune settings
   └─> sendToContentScript('OPEN_TUNE')
       └─> content.js: openTuneSettings()

6. Set Model
   └─> sendToContentScript('SET_MODEL', { model })
       └─> content.js: setModel(model)

7. Set Video Count
   └─> sendToContentScript('SET_VIDEO_COUNT', { count })
       └─> content.js: setVideoCount(count)

8. Set Aspect Ratio
   └─> sendToContentScript('SET_ASPECT_RATIO', { ratio })
       └─> content.js: setAspectRatio(ratio)

9. Start progress polling (every 3 seconds)
   └─> setInterval(updateAllProgress, 3000)

10. Process prompts with pacing
    FOR each prompt:
      a. Check if running (break if stopped)
      b. Wait if paused
      c. Skip if already completed
      d. Wait for available slot (< 5 active)
      e. Submit prompt
         └─> sendToContentScript('SUBMIT_PROMPT', { prompt, uuid })
             └─> content.js: submitPrompt(prompt, uuid)
      f. Wait for pacing threshold
         └─> while (prompt.progress < pacing%) { wait 3s }
    
11. Wait for all prompts to complete (100%)

12. Stop automation
```

#### Progress Polling (Every 3 seconds)
```
1. Get UUIDs of prompts with status = 'rendering'
2. sendToContentScript('GET_PROGRESS', { uuids })
3. content.js: getAllPromptsStatus(uuids)
   └─> For each UUID:
       - Find parent div by UUID
       - Count divs with "%"
       - Count completed videos (video tags, buttons)
       - Calculate average percentage
       - Return { found, percentage, status }
4. Update state.prompts with new percentages
5. Update table UI
6. Update progress bar
7. Save to storage
```

#### Pacing Logic
```
Pacing = 10%

Prompt 1: Submit → 0%
  └─> Wait until Prompt 1 >= 10%
Prompt 2: Submit → 0%
  └─> Wait until Prompt 2 >= 10%
Prompt 3: Submit → 0%
  └─> Wait until Prompt 3 >= 10%
...

Benefits:
- Ensures prompts don't get queued all at once
- Allows monitoring of early progress
- Prevents overwhelming Flow's render queue
```

#### Slot Management
```
Flow supports max 5 concurrent renders.

Before submitting new prompt:
1. Count active slots
   └─> sendToContentScript('COUNT_SLOTS')
       └─> content.js: countActiveRenderingSlots()
           └─> Count divs with "\d+%" in container
2. If activeSlots >= 5:
   └─> Wait 3 seconds
   └─> Check again
3. Else:
   └─> Submit prompt
```

**Key Functions**:

#### `handleFileUpload(event)`
- Reads `.txt` file
- Parses lines
- Creates prompt objects with UUIDs
- Renders table
- Saves to storage

#### `handleStart()`
- Executes automation workflow
- Sets zoom → Grid → Tune → Settings → Submit prompts
- Starts polling

#### `processPromptsWithPacing()`
- Iterates through prompts
- Submits each with pacing delay
- Respects pause/stop

#### `submitSinglePrompt(index)`
- Waits for available slot
- Sends `SUBMIT_PROMPT` message
- Updates status to 'rendering'

#### `waitForAvailableSlot()`
- Polls slot count every 3s
- Returns when < 5 active

#### `waitForPacing(index)`
- Polls prompt progress every 3s
- Returns when >= pacing threshold

#### `updateAllProgress()`
- Gets progress for all rendering prompts
- Updates state and UI
- Runs every 3 seconds

#### `renderPromptsTable()`
- Clears table body
- Creates rows for each prompt
- Adds action buttons (Retry, View, Edit)
- Attaches event listeners

---

## UUID Tracking System

### Why UUID?
- Flow doesn't provide unique IDs for submitted prompts
- Need to track which render belongs to which prompt
- UUID at the start prevents truncation

### Format
```
{UUID} {Prompt Text}

Example:
7d1b3e8c-0f5a-4b9d-8c1a-2e3f4d5a6b7c A cat riding a bicycle on the moon
```

### Tracking Process
```
1. Generate UUID: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
2. Prepend to prompt text
3. Submit to Flow
4. Flow renders videos in container div
5. Extension searches DOM for UUID
6. Finds parent div containing:
   - Text with UUID
   - Child divs with % indicators (rendering)
   - Child divs with video/play buttons (completed)
7. Calculates average progress
8. Updates UI
```

### DOM Structure on Flow
```html
<div class="sc-c884da2c-6"> <!-- Main container -->
  <div> <!-- Prompt 1 parent -->
    <div>7d1b3e8c... A cat riding...</div> <!-- Prompt text -->
    <div>
      <div>50%</div> <!-- Video 1 rendering -->
      <div>60%</div> <!-- Video 2 rendering -->
      <div>        <!-- Video 3 completed -->
        <video src="blob:..."></video>
        <button aria-label="Play"></button>
      </div>
      <div>45%</div> <!-- Video 4 rendering -->
    </div>
  </div>
  
  <div> <!-- Prompt 2 parent -->
    <div>a1b2c3d4... A dog playing...</div>
    <div>...</div>
  </div>
</div>
```

### Progress Calculation Example
```
Prompt has 4 videos:
- Video 1: 50% (rendering, has "50%" text)
- Video 2: 60% (rendering, has "60%" text)
- Video 3: 100% (completed, has <video> tag, no %)
- Video 4: 45% (rendering, has "45%" text)

Percentages array: [50, 60, 100, 45]
Average: (50 + 60 + 100 + 45) / 4 = 63.75% → 64%
```

---

## Message Passing Architecture

### Flow Diagram
```
Panel (panel.js)
    ↓ chrome.runtime.sendMessage()
Background (background.js)
    ↓ chrome.tabs.sendMessage()
Content Script (content.js)
    ↓ DOM Manipulation
Flow Website
```

### Message Types

#### Panel → Background
```javascript
{
  type: 'SET_BROWSER_ZOOM',
  data: { zoomLevel: 0.25 }
}

{
  type: 'EXECUTE_CONTENT_SCRIPT',
  data: {
    action: 'SUBMIT_PROMPT',
    payload: { prompt: '...', uuid: '...' }
  }
}
```

#### Background → Content
```javascript
{
  type: 'SUBMIT_PROMPT',
  payload: { prompt, uuid }
}

{
  type: 'GET_PROGRESS',
  payload: { uuids: [...] }
}
```

#### Responses
```javascript
{
  success: true/false,
  error: 'Error message',
  data: { ... },
  response: { ... }
}
```

---

## Storage Schema

### chrome.storage.local
```javascript
{
  settings: {
    model: 'veo-3.1-fast',
    aspectRatio: '16:9',
    videoCount: 4,
    pacing: 10
  },
  
  prompts: [
    {
      id: 0,
      uuid: '7d1b3e8c-...',
      text: 'A cat riding...',
      progress: 64,
      status: 'rendering'
    },
    {
      id: 1,
      uuid: 'a1b2c3d4-...',
      text: 'A dog playing...',
      progress: 100,
      status: 'completed'
    }
  ]
}
```

### Persistence
- Settings saved on change
- Prompts saved on upload
- Progress saved every 3s during polling
- Restored on panel open

---

## Timing & Delays

| Action | Delay | Reason |
|--------|-------|--------|
| After zoom | 1000ms | Let page adjust |
| After Grid click | 500ms | Animation |
| After Tune open | 800ms | Panel slide-in |
| After dropdown change | 300-500ms | Dropdown close |
| Before Generate click | 800ms | Button appearance |
| After prompt submit | 1000ms | Render initialization |
| Progress polling | 3000ms | Balance freshness vs. load |
| Pacing check | 3000ms | Align with polling |
| Slot check | 3000ms | Align with polling |

---

## Error Handling

### Extension Level
- Try-catch on all async functions
- Error messages to user via `alert()`
- Console logging for debugging
- Graceful degradation (continue on non-critical errors)

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Tab not found" | Flow page not open | Open Flow page first |
| "Element not found" | DOM changed | Update selectors |
| "Timeout" | Slow network | Increase wait times |
| "UUID not found" | Prompt not rendered | Check if submitted correctly |

---

## Performance Considerations

### Optimization Strategies
1. **Polling interval**: 3s balance (not too frequent, not too slow)
2. **Batch progress updates**: Query all UUIDs in one message
3. **Lazy rendering**: Only update changed rows in table
4. **Storage throttling**: Save only on significant changes
5. **Slot management**: Prevent queue overflow

### Resource Usage
- **CPU**: Low (polling every 3s)
- **Memory**: ~10-20 MB for state
- **Network**: Minimal (no additional requests)
- **Storage**: ~1-5 KB (settings + prompts metadata)

---

## Security Considerations

1. **Permissions**: Minimal required (tabs, storage, sidePanel, scripting)
2. **Host permissions**: Only `labs.google/*`
3. **No external requests**: All operations local
4. **No data collection**: No telemetry, analytics, or tracking
5. **User data**: Stored locally only (`chrome.storage.local`)

---

## Browser Compatibility

- **Chrome**: 114+ (Side Panel API)
- **Edge**: 114+ (Chromium-based, Side Panel support)
- **Brave**: 114+ (Compatible)
- **Opera**: Not tested
- **Firefox**: ❌ (No Side Panel API)

---

## Testing Checklist

### Manual Tests
- [ ] Extension loads without errors
- [ ] Side Panel opens on icon click
- [ ] File upload works (.txt)
- [ ] Settings persist across sessions
- [ ] Zoom to 25% works
- [ ] Grid button clicks
- [ ] Tune settings apply correctly
- [ ] Prompts submit with UUID
- [ ] Progress polling updates every 3s
- [ ] Pacing delay works
- [ ] Slot management (max 5)
- [ ] Pause/Resume functions
- [ ] Stop terminates correctly
- [ ] Edit prompt modal
- [ ] Retry individual prompt
- [ ] Table updates in real-time

### Edge Cases
- [ ] Empty file upload
- [ ] File with 1 prompt
- [ ] File with 50+ prompts
- [ ] Very long prompt (500+ chars)
- [ ] Prompts with special characters
- [ ] Pause during submission
- [ ] Stop during submission
- [ ] Close Flow tab during render
- [ ] Refresh Flow page during render
- [ ] Multiple Flow tabs open

---

## Known Limitations

1. **Flow-dependent**: If Flow UI changes, selectors need update
2. **No multi-tab**: Only works with one Flow tab at a time
3. **No resume**: If browser crashes, must restart
4. **Video preview**: Not implemented (shows placeholder)
5. **Download**: No auto-download feature
6. **Quota**: Subject to Flow's daily limits

---

## Future Enhancements

### Potential Features
1. **Auto-download**: Download completed videos automatically
2. **Multi-tab**: Support multiple Flow tabs
3. **Resume**: Save state and resume after crash
4. **Advanced scheduling**: Time-based prompt submission
5. **Prompt templates**: Built-in prompt library
6. **Batch editing**: Edit multiple prompts at once
7. **Export results**: Export video URLs to CSV
8. **Statistics**: Track success rate, average time, etc.
9. **Notifications**: Browser notifications on completion
10. **Dark mode**: UI theme toggle

### Code Improvements
1. Add TypeScript for type safety
2. Use React for UI (better state management)
3. Add unit tests (Jest)
4. Add integration tests (Puppeteer)
5. Implement retry logic on failures
6. Add debug mode with verbose logging
7. Modularize content.js (too large)
8. Add error boundary in UI
9. Implement proper cleanup on stop
10. Add telemetry (opt-in) for debugging

---

## Maintenance Guide

### Updating Selectors
If Flow UI changes:

1. Open Flow page
2. Open DevTools (`F12`)
3. Inspect elements:
   - Tune button: Look for button with settings icon
   - Dropdowns: Look for `role="button"` or `role="option"`
   - Textarea: Check ID (currently `PINHOLE_TEXT_AREA_ELEMENT_ID`)
   - Generate button: Look for button with arrow icon
   - Container: Look for scrollable div with prompts

4. Update selectors in `content.js`:
   ```javascript
   const tuneButton = document.querySelector('NEW_SELECTOR');
   ```

5. Test thoroughly

### Updating Chrome APIs
- Monitor Chrome Extension API updates
- Check Side Panel API changes
- Update manifest version if needed
- Test on latest Chrome version

---

## Developer Notes

### Code Style
- Clear variable names (no abbreviations)
- Comments for complex logic
- Console logs for debugging (keep in production)
- Async/await preferred over .then()
- Error handling on all async functions

### Debugging
1. **Panel**: Right-click Side Panel → Inspect
2. **Content**: F12 on Flow page → Console
3. **Background**: `chrome://extensions/` → Service Worker → Inspect

### Version Control
- Commit after each feature
- Tag releases (v1.0.0, v1.1.0, etc.)
- Document breaking changes
- Keep CHANGELOG.md

---

## Credits

**Created by**: Flow Automation Team  
**Date**: December 14, 2024  
**Version**: 1.0.0  
**License**: MIT

**Technologies**:
- Chrome Extension API (Manifest V3)
- Side Panel API
- Vanilla JavaScript (ES6+)
- HTML5 + CSS3
- Chrome Storage API

**Acknowledgments**:
- Google Labs Flow team
- Chrome Extension documentation
- Community feedback and testing

---

**📚 For user documentation, see `README.md` and `QUICK_START.md`**
