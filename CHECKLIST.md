# ✅ CHECKLIST - Flow Video Automation Extension

## 📋 Pre-Installation Checklist

### System Requirements
- [ ] Chrome version >= 114 (check: `chrome://version/`)
- [ ] Developer mode enabled in Chrome
- [ ] Sufficient disk space (>100MB for videos)
- [ ] Stable internet connection

### Files Verification
- [ ] `manifest.json` exists and valid
- [ ] `background.js` exists (3.6 KB)
- [ ] `content.js` exists (15.1 KB)
- [ ] `panel.html` exists (5.1 KB)
- [ ] `panel.css` exists (9.9 KB)
- [ ] `panel.js` exists (20.2 KB)
- [ ] All 11 files present in `veo3/` folder

---

## 🔧 Installation Checklist

### Loading Extension
- [ ] Opened `chrome://extensions/`
- [ ] Enabled "Developer mode" (top-right toggle)
- [ ] Clicked "Load unpacked"
- [ ] Selected `veo3/` folder
- [ ] Extension card appeared without errors
- [ ] Extension ID generated (e.g., `abcdefgh...`)

### Verification
- [ ] Extension name: "Flow Video Automation"
- [ ] Version: 1.0.0
- [ ] No errors in "Errors" button
- [ ] Icon appears in Extensions menu (puzzle icon)
- [ ] Can pin extension to toolbar (optional)

---

## 🌐 Flow Page Setup Checklist

### Account & Access
- [ ] Google account ready
- [ ] Can access `https://labs.google`
- [ ] Can access Flow tool
- [ ] Successfully logged in
- [ ] Created new project / entered Flow workspace

### Flow Interface
- [ ] Can see prompt textarea
- [ ] Can see "Tạo" (Generate) button
- [ ] Can see settings (Tune) button
- [ ] Can type and submit prompts manually (test)
- [ ] No blocking popups or modals

---

## 🎮 Extension UI Checklist

### Opening Panel
- [ ] Clicked extension icon
- [ ] Side Panel opened on the right
- [ ] Panel title: "🎬 Flow Video Automation"
- [ ] Panel doesn't overlap Flow page
- [ ] Flow page visible on left (may be zoomed out)

### UI Elements Present
- [ ] "📁 Tải file prompts (.txt)" button
- [ ] File info text: "Chưa có file nào được chọn"
- [ ] Settings section with 4 dropdowns
  - [ ] Model dropdown
  - [ ] Aspect ratio dropdown
  - [ ] Video count dropdown
  - [ ] Pacing input (number)
- [ ] Control buttons (all disabled initially)
  - [ ] "▶️ Tạo video hàng loạt" (disabled)
  - [ ] "⏸️ Tạm dừng" (disabled)
  - [ ] "⏹️ Dừng" (disabled)
- [ ] Status text: "⏳ Chờ tải prompts..."
- [ ] Progress bar (0%)
- [ ] Prompts table (empty)

### UI Styling
- [ ] Gradient background (green to white)
- [ ] Smooth animations on load
- [ ] Professional, clean design
- [ ] All text readable
- [ ] Tooltips work (hover "?" icon)

---

## 📁 File Upload Checklist

### Prepare File
- [ ] Created or have `.txt` file
- [ ] File contains prompts (1 per line)
- [ ] No empty lines (or acceptable)
- [ ] UTF-8 encoding
- [ ] File size < 1MB

### Upload Process
- [ ] Clicked upload area
- [ ] File dialog opened
- [ ] Selected `.txt` file
- [ ] File info updated: "✅ Đã tải X prompts từ ..."
- [ ] Table populated with prompts
- [ ] All prompts show in table
- [ ] "▶️ Tạo video hàng loạt" button enabled

### Table Verification
- [ ] Correct number of rows (matches prompts)
- [ ] STT column: 1, 2, 3, ...
- [ ] Prompt column: Shows first 40 chars + "..."
- [ ] % column: All 0% (gray)
- [ ] Action buttons: 🔄 👁️ ✏️ all present
- [ ] Click prompt text opens modal
- [ ] Modal shows full prompt text
- [ ] Can edit and save prompt

---

## ⚙️ Settings Checklist

### Default Values
- [ ] Model: Veo 3.1 - Fast
- [ ] Aspect: Ngang (16:9)
- [ ] Video count: 4
- [ ] Pacing: 10

### Changing Settings
- [ ] Can change model dropdown
- [ ] Can change aspect ratio
- [ ] Can change video count (1-4)
- [ ] Can change pacing (0-100)
- [ ] Settings persist after panel close/reopen

---

## 🚀 Automation Start Checklist

### Pre-Start
- [ ] Flow page fully loaded
- [ ] Prompts loaded in Extension
- [ ] Settings configured
- [ ] Ready to start

### Start Button
- [ ] Clicked "▶️ Tạo video hàng loạt"
- [ ] Button disabled immediately
- [ ] Pause and Stop buttons enabled
- [ ] Status text changed

### Automation Steps (verify each)

#### Step 1: Zoom
- [ ] Status: "📐 Thu nhỏ trang Flow về 25%..."
- [ ] Flow page zoomed to 25%
- [ ] Page still usable (not broken)

#### Step 2: Grid
- [ ] Status: "🔲 Bật chế độ Grid..."
- [ ] Grid button clicked on Flow
- [ ] Grid mode activated

#### Step 3: Tune
- [ ] Status: "⚙️ Cài đặt thông số..."
- [ ] Tune panel opened
- [ ] Settings applied:
  - [ ] Model selected correctly
  - [ ] Video count selected
  - [ ] Aspect ratio selected

#### Step 4: First Prompt Submit
- [ ] Status: "📝 Đang tạo prompt 1/X..."
- [ ] Prompt appeared in Flow textarea
- [ ] Prompt has UUID at start (format: `xxxxxxxx-xxxx-...`)
- [ ] Generate button clicked
- [ ] Video render started on Flow

#### Step 5: Progress Polling Starts
- [ ] Status updates every 3 seconds
- [ ] Table updating
- [ ] First prompt % increasing (0% → X%)
- [ ] Progress bar filling

#### Step 6: Pacing (if multiple prompts)
- [ ] Status: "⏳ Đợi prompt 1 đạt 10%..."
- [ ] Extension waits for threshold
- [ ] Second prompt submitted after first reaches 10%

---

## 📊 Progress Tracking Checklist

### Real-time Updates
- [ ] Table updates every ~3 seconds
- [ ] % values increasing
- [ ] Colors changing:
  - [ ] 0%: Gray
  - [ ] 1-49%: Orange
  - [ ] 50-99%: Light green
  - [ ] 100%: Dark green
- [ ] Progress bar moving
- [ ] Status text accurate

### On Flow Page
- [ ] Can see prompts with UUIDs
- [ ] Videos rendering (% indicators)
- [ ] Extension tracking correct prompts
- [ ] % in Extension matches Flow

### Completion
- [ ] When 100%, color turns dark green
- [ ] View button (👁️) enabled
- [ ] Status: "✅ Hoàn tất!"
- [ ] Progress bar: 100%

---

## 🎛️ Control Buttons Checklist

### Pause Button
- [ ] Clicked "⏸️ Tạm dừng"
- [ ] Status: "⏸️ Đã tạm dừng"
- [ ] Button text: "▶️ Tiếp tục"
- [ ] No new prompts submitted
- [ ] Existing renders continue
- [ ] Clicked "▶️ Tiếp tục"
- [ ] Status: "▶️ Đang tiếp tục..."
- [ ] Automation resumed

### Stop Button
- [ ] Clicked "⏹️ Dừng"
- [ ] Status: "⏹️ Đã dừng"
- [ ] Automation stopped
- [ ] Start button re-enabled
- [ ] Pause/Stop buttons disabled
- [ ] Existing renders continue (can't cancel)

---

## 🔄 Individual Actions Checklist

### Retry Prompt
- [ ] Clicked 🔄 on a prompt row
- [ ] Prompt % reset to 0%
- [ ] Prompt re-submitted to Flow
- [ ] New UUID generated (or same?)
- [ ] Progress tracked again

### Edit Prompt
- [ ] Clicked ✏️ or prompt text
- [ ] Modal opened
- [ ] Full prompt text shown
- [ ] Can edit text
- [ ] Clicked "💾 Lưu"
- [ ] Modal closed
- [ ] Table updated with new text
- [ ] Changes persisted

### View Videos
- [ ] Prompt at 100%
- [ ] Clicked 👁️
- [ ] Modal opened
- [ ] Shows UUID (or placeholder)
- [ ] Can close modal

---

## 💾 Persistence Checklist

### Settings Persistence
- [ ] Changed settings
- [ ] Closed Side Panel
- [ ] Reopened Side Panel
- [ ] Settings retained

### Prompts Persistence
- [ ] Loaded prompts
- [ ] Closed Side Panel
- [ ] Reopened Side Panel
- [ ] Prompts still in table
- [ ] Progress % retained

### After Browser Restart
- [ ] Closed Chrome completely
- [ ] Reopened Chrome
- [ ] Opened Extension
- [ ] Settings retained
- [ ] Prompts retained (if not cleared)

---

## 🐛 Error Handling Checklist

### Common Errors Tested
- [ ] Upload non-.txt file → Error message
- [ ] Upload empty file → Error message
- [ ] Start without Flow tab → Error shown
- [ ] Start without prompts → Alert shown
- [ ] Network error during render → Graceful handling

### Console Logs
- [ ] Open DevTools on Flow page
- [ ] Check for `[Content]` logs
- [ ] No critical errors
- [ ] Logs are informative

### Extension Logs
- [ ] Right-click Side Panel → Inspect
- [ ] Check for `[Panel]` logs
- [ ] No critical errors
- [ ] State updates logged

---

## 🧪 Edge Cases Checklist

### Prompts
- [ ] Single prompt (1 prompt)
- [ ] Many prompts (20+ prompts)
- [ ] Very long prompt (500+ chars)
- [ ] Prompt with special chars (emoji, ?, !)
- [ ] Duplicate prompts

### Settings
- [ ] Pacing = 0% (instant submit)
- [ ] Pacing = 100% (wait for complete)
- [ ] Video count = 1 vs 4
- [ ] Different models tested

### Flow State
- [ ] Start with existing renders on Flow
- [ ] Refresh Flow page during render
- [ ] Close and reopen Flow tab
- [ ] Multiple Flow tabs (should error)

---

## 🔍 Final Verification Checklist

### Core Functionality
- [ ] Can upload prompts ✅
- [ ] Can configure settings ✅
- [ ] Can start automation ✅
- [ ] Automation completes successfully ✅
- [ ] Progress tracked accurately ✅
- [ ] Can pause/resume ✅
- [ ] Can stop ✅
- [ ] Can retry individual prompts ✅
- [ ] Can edit prompts ✅

### UI/UX
- [ ] UI loads without errors ✅
- [ ] Design is professional ✅
- [ ] Animations smooth ✅
- [ ] Tooltips helpful ✅
- [ ] Error messages clear ✅
- [ ] All buttons functional ✅

### Performance
- [ ] No lag during polling ✅
- [ ] Table updates smoothly ✅
- [ ] Memory usage acceptable (<100MB) ✅
- [ ] No memory leaks (long session) ✅

### Compatibility
- [ ] Works on Chrome 114+ ✅
- [ ] Works with Flow (as of Dec 2024) ✅
- [ ] No conflicts with other extensions ✅

---

## 📝 Documentation Checklist

### Files Present
- [ ] README.md (main docs)
- [ ] QUICK_START.md (Vietnamese guide)
- [ ] INSTALL.md (detailed setup)
- [ ] TECHNICAL.md (developer docs)
- [ ] PROJECT_SUMMARY.md (overview)
- [ ] CHECKLIST.md (this file)

### Documentation Quality
- [ ] All docs up-to-date
- [ ] Code examples work
- [ ] Screenshots/ASCII art clear
- [ ] Links work
- [ ] No typos (major)

---

## 🎯 Ready to Ship?

### All Checks Pass?
- [ ] Installation ✅
- [ ] UI ✅
- [ ] Upload ✅
- [ ] Settings ✅
- [ ] Automation ✅
- [ ] Progress ✅
- [ ] Controls ✅
- [ ] Persistence ✅
- [ ] Error Handling ✅
- [ ] Edge Cases ✅
- [ ] Final Verification ✅
- [ ] Documentation ✅

### If all ✅:
🎉 **Extension is ready for use!** 🎉

### If any ❌:
1. Note the failing items
2. Review relevant code/docs
3. Fix issues
4. Re-test
5. Repeat until all ✅

---

## 📊 Testing Summary

**Total Checks**: ~200+  
**Required Pass Rate**: 95%+  
**Critical Checks**: Installation, Upload, Automation, Progress  

**Result**: [ ] PASS / [ ] FAIL

**Notes**:
```
_____________________________________________
_____________________________________________
_____________________________________________
```

---

## 🔄 Version Testing

### v1.0.0 Testing
- [ ] Tested on Chrome 120
- [ ] Tested on Edge 120
- [ ] Tested on Brave
- [ ] Tested with 5 prompts
- [ ] Tested with 20 prompts
- [ ] Tested all models
- [ ] Tested both aspect ratios
- [ ] Tested all video counts (1-4)

**Tester**: _______________  
**Date**: _______________  
**Status**: [ ] PASS / [ ] FAIL

---

## 📞 Support

If issues found:
1. Check INSTALL.md troubleshooting
2. Check Console logs
3. Review TECHNICAL.md
4. Open issue with details

---

**Last Updated**: December 14, 2024  
**Checklist Version**: 1.0  
**For Extension Version**: 1.0.0
