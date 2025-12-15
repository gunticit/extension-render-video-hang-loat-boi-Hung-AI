# 🎬 FLOW VIDEO AUTOMATION EXTENSION

## 📦 Project Overview

**Name**: Flow Video Automation  
**Version**: 1.0.0  
**Type**: Chrome Extension (Manifest V3)  
**Purpose**: Tự động hóa việc tạo video hàng loạt trên Google Labs Flow  
**Created**: December 14, 2024  
**License**: MIT  

---

## 📁 File Structure

```
veo3/
├── 📄 manifest.json           # Extension config (Manifest V3)
│
├── 🔧 Core Files
│   ├── background.js          # Service Worker (3.6 KB)
│   ├── content.js             # DOM interaction (15.1 KB)
│   ├── panel.html             # UI structure (5.1 KB)
│   ├── panel.css              # Styling (9.9 KB)
│   └── panel.js               # UI logic (20.2 KB)
│
├── 📚 Documentation
│   ├── README.md              # Main documentation (6.6 KB)
│   ├── QUICK_START.md         # Quick guide (4.8 KB)
│   ├── INSTALL.md             # Detailed install guide (16.7 KB)
│   └── TECHNICAL.md           # Technical documentation (22.2 KB)
│
└── 📝 Sample Data
    └── sample_prompts.txt     # 10 sample prompts (473 B)

Total: 11 files, ~104 KB
```

---

## ✨ Features

### Core Features
- ✅ **Batch Upload**: Load prompts from .txt file (1 prompt per line)
- ✅ **Auto Settings**: Configure Model, Aspect Ratio, Video Count
- ✅ **Pacing Control**: Throttle prompt submission (X% threshold)
- ✅ **Real-time Progress**: Track % completion every 3 seconds
- ✅ **Slot Management**: Handle Flow's 5 concurrent render limit
- ✅ **UUID Tracking**: Unique ID system for accurate progress

### UI Features
- ✅ **Side Panel**: Professional panel (not popup)
- ✅ **Prompt Table**: STT, Prompt, %, Actions
- ✅ **Edit Modal**: View/edit full prompt text
- ✅ **Control Buttons**: Start, Pause, Stop
- ✅ **Progress Bar**: Visual total progress
- ✅ **Color-coded**: 0% Gray, 1-49% Orange, 50-99% Light Green, 100% Dark Green

### Automation Features
- ✅ **Auto Zoom**: Shrink page to 25%
- ✅ **Auto Grid**: Enable grid mode
- ✅ **Auto Tune**: Apply all settings
- ✅ **Sequential Submit**: One by one with pacing
- ✅ **Retry**: Re-render individual prompts

---

## 🎯 How It Works

### Workflow
```
1. User uploads .txt file
   ↓
2. Extension parses prompts
   ↓
3. User clicks "Start"
   ↓
4. Extension:
   - Sets zoom to 25%
   - Clicks Grid button
   - Opens Tune panel
   - Sets Model, Count, Ratio
   ↓
5. For each prompt:
   - Wait for available slot (< 5 active)
   - Add UUID to prompt
   - Submit to Flow
   - Wait for pacing threshold (e.g., 10%)
   ↓
6. Polling (every 3s):
   - Find prompt by UUID in DOM
   - Calculate average % of videos
   - Update UI table
   ↓
7. When all 100%:
   - Stop automation
   - Notify user
```

### UUID Tracking System
```
Format: {UUID} {Prompt Text}
Example: 7d1b3e8c-0f5a-4b9d-8c1a-2e3f4d5a6b7c A cat riding a bicycle

Why UUID?
- Flow doesn't provide IDs
- Need to track which render belongs to which prompt
- UUID at start prevents truncation

How tracking works:
1. Submit: "uuid-123... Prompt text"
2. Flow renders in container
3. Extension searches DOM for "uuid-123..."
4. Finds parent div containing videos
5. Counts % indicators (50%, 60%, etc.)
6. Calculates average: (50+60+100+45)/4 = 64%
7. Updates UI
```

---

## 🔧 Technical Stack

### Technologies
- **Chrome Extension API** (Manifest V3)
- **Side Panel API** (Chrome 114+)
- **Vanilla JavaScript** (ES6+)
- **HTML5 + CSS3**
- **Chrome Storage API**

### Architecture
```
Panel (UI)
    ↓ chrome.runtime.sendMessage()
Background (Service Worker)
    ↓ chrome.tabs.sendMessage()
Content Script
    ↓ DOM Manipulation
Flow Website
```

### XPath/Selectors
| Element | Selector |
|---------|----------|
| Grid Button | `//button[.//i[text()='grid_on']]` |
| Tune Button | `button.sc-92c9e477-0` |
| Textarea | `#PINHOLE_TEXT_AREA_ELEMENT_ID` |
| Generate Button | `button.sc-408537d4-2` |
| Container | `.sc-c884da2c-6` |
| Dropdowns | `div[role="button"]` + text match |
| Options | `div[role="option"]` + text match |

---

## 🚀 Quick Start

### Installation
```bash
1. Open Chrome: chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select veo3/ folder
5. ✅ Extension installed!
```

### Usage
```bash
1. Open Flow: https://labs.google/fx/vi/tools/flow
2. Click "New Project"
3. Click Extension icon → Side Panel opens
4. Upload sample_prompts.txt
5. Click "▶️ Tạo video hàng loạt"
6. Watch automation work! 🎉
```

---

## 📊 Settings

| Setting | Default | Options |
|---------|---------|---------|
| **Model** | Veo 3.1 - Fast | Veo 3.1, + Lower Priority |
| **Aspect** | 16:9 | 9:16 |
| **Count** | 4 | 1, 2, 3, 4 |
| **Pacing** | 10% | 0-100% |

**Pacing explanation**:
- 10% = Submit next when previous reaches 10%
- 50% = Submit next when previous reaches 50%
- 100% = Submit next when previous completes

---

## 🎨 Design

### Color Scheme
```css
Primary Dark:    #003300 (Dark Green)
Primary Light:   #006600 (Light Green)
Background:      #ffffff (White)
Success:         #00cc66 (Green)
Warning:         #ff9933 (Orange)
Danger:          #ff4444 (Red)
```

### Gradient
```
Linear Gradient: #003300 → #006600 → #ffffff
Direction: 135deg (diagonal)
```

### Animations
- Fade in: 0.6s ease-out
- Slide in: 0.3s ease
- Hover effects: 0.3s ease
- Progress bar: 0.5s ease

---

## 📖 Documentation

### For Users
1. **README.md** - Main documentation (features, installation, usage)
2. **QUICK_START.md** - Quick setup guide (Vietnamese)
3. **INSTALL.md** - Detailed installation with troubleshooting

### For Developers
1. **TECHNICAL.md** - Full technical documentation
   - Architecture
   - Component deep dive
   - Message passing
   - UUID tracking
   - Timing & delays
   - Performance
   - Testing
   - Maintenance

---

## 🔍 Key Features Explained

### 1. Pacing Control
**Problem**: Submitting all prompts at once overwhelms Flow  
**Solution**: Wait for previous prompt to reach X% before submitting next  
**Benefit**: Smooth distribution, better monitoring

### 2. Slot Management
**Problem**: Flow has max 5 concurrent renders  
**Solution**: Count active slots, wait if full  
**Benefit**: No queue overflow, optimal throughput

### 3. UUID Tracking
**Problem**: Flow doesn't provide prompt IDs  
**Solution**: Prepend UUID to each prompt  
**Benefit**: Accurate progress tracking per prompt

### 4. Real-time Polling
**Problem**: Need to know progress without manual check  
**Solution**: Poll DOM every 3s, calculate average %  
**Benefit**: Live updates in Extension UI

### 5. Side Panel UI
**Problem**: Popups are intrusive and close easily  
**Solution**: Use Side Panel API (persistent sidebar)  
**Benefit**: Non-intrusive, always accessible

---

## ⚠️ Limitations

1. **Flow-dependent**: If Flow UI changes, selectors need update
2. **Single tab**: Only works with one Flow tab
3. **No resume**: Can't resume after browser crash
4. **Video preview**: Not implemented (shows placeholder)
5. **No auto-download**: Must download videos manually
6. **Chrome only**: Requires Chrome 114+ (Side Panel API)

---

## 🐛 Known Issues

1. **Zoom**: May affect some Flow layouts
2. **UUID visibility**: UUID shows in Flow (not hidden)
3. **Progress accuracy**: Depends on consistent DOM structure
4. **Slot counting**: May be inaccurate if DOM changes rapidly

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Auto-download completed videos
- [ ] Multi-tab support
- [ ] Resume after crash
- [ ] Video preview in modal
- [ ] Export video URLs to CSV
- [ ] Statistics dashboard
- [ ] Batch prompt editing
- [ ] Dark mode
- [ ] Notifications on completion
- [ ] Advanced scheduling

### Code Improvements
- [ ] Add TypeScript
- [ ] Use React for UI
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Better error handling
- [ ] Modularize large files
- [ ] Add telemetry (opt-in)

---

## 📝 Version History

### v1.0.0 (2024-12-14)
- ✨ Initial release
- ✅ Core automation features
- ✅ UUID tracking system
- ✅ Real-time progress polling
- ✅ Side Panel UI
- ✅ Full documentation

---

## 🤝 Contributing

This is currently a personal project. Contributions welcome:

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

## 📄 License

MIT License - Free to use and modify

---

## 👨‍💻 Developer Info

**Created by**: Flow Automation Team  
**Date**: December 14, 2024  
**Contact**: See INSTALL.md for support info  
**Repository**: /Users/hungdoan/Desktop/veo3  

---

## 📚 Learn More

- **User Guide**: Read QUICK_START.md
- **Installation**: Read INSTALL.md
- **Technical Details**: Read TECHNICAL.md
- **API Docs**: Read manifest.json comments

---

## 🎯 Use Cases

### Content Creators
- Generate multiple video variations quickly
- Test different prompts efficiently
- Batch produce content

### Developers
- Test Flow API limits
- Benchmark render times
- Automate repetitive tasks

### Researchers
- Gather data on video generation
- Compare prompt effectiveness
- Study Flow's rendering patterns

---

## 💡 Tips

### Speed Optimization
```
Model: Veo 3.1 - Fast
Pacing: 5-10%
Count: 1-2
→ Fastest render
```

### Quality Optimization
```
Model: Veo 3.1
Pacing: 50-100%
Count: 4
→ Best quality, most options
```

### Quota Conservation
```
Model: Lower Priority
Count: 1
Upload: 5-10 prompts/batch
→ Minimal quota usage
```

---

## 🔗 Resources

- **Flow**: https://labs.google/fx/tools/flow
- **Chrome Extensions**: https://developer.chrome.com/docs/extensions/
- **Side Panel API**: https://developer.chrome.com/docs/extensions/reference/sidePanel/

---

## ⭐ Star Features

1. **🎯 UUID Tracking** - Unique innovation for accurate progress
2. **⚡ Pacing Control** - Smart throttling for optimal flow
3. **🎨 Premium UI** - Beautiful gradient design
4. **📊 Real-time Updates** - Live progress every 3s
5. **🔧 Auto-everything** - Zoom, Grid, Settings all automated

---

**🚀 Ready to automate? Install and start creating! 🎬**

---

*Last updated: December 14, 2024*  
*Extension Version: 1.0.0*  
*Documentation Version: 1.0*
