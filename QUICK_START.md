# Quick Start Guide - TV Monitor Dashboard

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Running

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

3. **Build for Production**
```bash
npm build
```

## 📊 Features

### 1. **1000+ Card Support**
- Handles 1,000 cards without performance issues
- Smart pagination with 24 cards per page
- Total of 42 pages for 1,000 cards

### 2. **TV-Friendly Display**
- Optimized for 4K TVs (1920px width and above)
- Large, readable text from 2-3 meters distance
- Responsive design works on all screen sizes
- No layout shifting when navigating pages

### 3. **Interactive Pagination**
- **Previous/Next buttons** - Navigate between pages
- **Page numbers** - Click to jump to any page
- **Quick Jump** - Enter page number and press Enter
- **Sticky pagination** - Always accessible at bottom
- **Page info** - Shows current page, total pages, total cards

### 4. **Beautiful Cards**
- 8 color variations cycling through cards
- Hover effects with scale animation
- Click to remove cards (pop animation)
- Glass morphism design with gradients
- Responsive sizing for all devices

### 5. **Dashboard Stats**
- Total funds count
- Urgent items requiring action
- Completed items (last 24h)
- Pending items in queue
- Responsive stat cards grid

## 🎨 Customization

### Change Cards Per Page
Edit `src/MonitorProcessamento.jsx` line ~27:
```javascript
const CARDS_PER_PAGE = 24; // Change this number
```

### Modify Colors
Edit `src/MonitorProcessamento.jsx` line ~24:
```javascript
const COLORS = ['#06b6d4', '#e74c3c', '#27ae60', /* more colors */];
```

### Adjust Card Data
Edit the `generateTestData()` function in `src/MonitorProcessamento.jsx` to change:
- Number of cards generated
- Data fields (cd_fundo, data_jcot, data_amplis)
- Date generation logic

### Customize Styling
All styling uses Tailwind CSS classes. Find and replace:
- `from-slate-950` - Background color
- `text-cyan-400` - Primary accent color
- `rounded-xl sm:rounded-2xl` - Border radius

## 📱 Responsive Breakpoints

The dashboard automatically adapts to screen size:

| Size | Width | Columns | Cards/Page |
|------|-------|---------|-----------|
| Mobile | <640px | 2 | 8 (2x4) |
| Tablet | 640-1024px | 3-4 | 12-16 |
| Desktop | 1024-1536px | 4-5 | 16-20 |
| TV/4K | 1536px+ | 6 | 24 (4x6) |

## ⌨️ Keyboard Controls

- **Enter** in "Go to page" input → Jump to page
- **Tab** → Navigate through buttons
- **Click** on card → Remove it with pop animation
- **Scroll** → Smooth scrolling behavior

## 🎯 For TV Display

### Recommended Settings
1. Place TV at 2-3 meters viewing distance
2. Font sizes automatically scale for large displays
3. Use 4K resolution (3840x2160 or 1920x1080) for best experience
4. Landscape orientation recommended

### Ideal TV Configuration
- Resolution: 1920x1080 or 3840x2160
- Refresh Rate: 60Hz or higher
- Color Space: RGB
- Aspect Ratio: 16:9

## 📋 Project Structure

```
monitor/
├── src/
│   ├── components/
│   │   ├── BaseFundo/        # Card component
│   │   ├── HeaderCard/       # Stat cards
│   │   ├── HeaderText/       # Header with title
│   │   └── Pagination/       # Pagination controls
│   ├── MonitorProcessamento.jsx               # Main app component
│   ├── MonitorProcessamento.css               # MonitorProcessamento styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Entry point
├── package.json              # Dependencies
├── vite.config.js            # Vite config
├── tailwind.config.js        # Tailwind config
├── postcss.config.cjs         # PostCSS config
└── README.md
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Cards not showing?
- Check browser console for errors (F12)
- Verify data is being generated in generateTestData()
- Check that card grid classes are applied correctly

### Pagination not working?
- Check that totalPages > 1
- Verify setCurrentPage is called with valid page number
- Clear browser cache and reload

### Styling looks wrong?
- Make sure Tailwind is compiled (npm run dev)
- Check that @tailwind directives are in index.css
- Clear browser cache (Ctrl+Shift+Delete)

### Performance issues with 1000 cards?
- Currently renders 24 cards per page
- If adding more, use React.memo on BaseFundo component
- Consider virtual scrolling for 10k+ cards

## 📚 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 🎬 TV Display Optimization Details

See `TV_DISPLAY_IMPROVEMENTS.md` for detailed information about:
- Grid layout optimization
- Color distribution
- Responsive typography
- Performance metrics
- Accessibility features

See `TV_LAYOUT_GUIDE.md` for:
- Visual layout diagrams
- Responsive breakpoint details
- Performance metrics
- TV display recommendations

## 📝 Notes

- All 1000 cards are generated in memory
- Only current page (24 cards) rendered in DOM
- Smooth transitions between pages
- No flashing or layout shift
- Fully responsive design
- Keyboard and mouse support

## 🤝 Contributing

To modify the dashboard:
1. Edit component files in `src/components/`
2. Update MonitorProcessamento.jsx for layout changes
3. Modify colors/styling in component files
4. Test on different screen sizes
5. Run `npm run build` before deploying

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review the layout guides (TV_LAYOUT_GUIDE.md, TV_DISPLAY_IMPROVEMENTS.md)
- Check browser console for error messages
- Verify all dependencies are installed (npm install)

---

**Enjoy your new TV-optimized dashboard! 📺✨**

