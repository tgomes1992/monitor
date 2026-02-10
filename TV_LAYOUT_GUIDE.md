# TV Display Layout Guide

## Current Grid Configuration

### Card Grid Layout (6 columns on large screens)
```
┌─────────────────────────────────────────────────────────┐
│  MONITOR DASHBOARD                                      │
└─────────────────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┬──────────────┐
│   Total      │   Urgente    │  Completado  │    Fila      │
│   1000       │     120      │     780      │     250      │
│ Fundos Ativos│ Requerem Ação│ Últimas 24h  │  Aguardando  │
└──────────────┴──────────────┴──────────────┴──────────────┘

=================================================================

CARD GRID (24 cards per page = 4 rows x 6 columns)

Row 1:  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
        │ 1001 │ │ 1002 │ │ 1003 │ │ 1004 │ │ 1005 │ │ 1006 │
        └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘

Row 2:  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
        │ 1007 │ │ 1008 │ │ 1009 │ │ 1010 │ │ 1011 │ │ 1012 │
        └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘

Row 3:  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
        │ 1013 │ │ 1014 │ │ 1015 │ │ 1016 │ │ 1017 │ │ 1018 │
        └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘

Row 4:  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
        │ 1019 │ │ 1020 │ │ 1021 │ │ 1022 │ │ 1023 │ │ 1024 │
        └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘

=================================================================

PAGINATION SECTION (Sticky at bottom)

   ← Anterior [1] [2] [3] [4] [5] [6] ... [42] Próxima →

   Showing: 1 / 42 • 24 per page • Total: 1000    [Go to page: __ Ir]

=================================================================
```

## Responsive Breakpoints

### Mobile (< 640px)
- 2 columns of cards
- Reduced padding and fonts
- Pagination buttons stack vertically if needed
- Compact stat cards (1 column)

### Tablet (640px - 1024px)
- 3-4 columns of cards
- Medium padding and fonts
- 2 column stat cards layout
- Pagination adapts width

### Desktop (1024px - 1536px)
- 4-5 columns of cards
- Full padding and fonts
- 4 column stat cards layout
- Full pagination display

### Large TV / 4K (1536px+)
- 6 columns of cards (optimal for TV)
- Extra padding for spacing
- Large fonts (18px base)
- Full featured pagination with quick jump

## Color Distribution

The 8 colors cycle through cards:
1. Cyan (#06b6d4) - Primary
2. Red (#e74c3c) - Error/Urgent
3. Green (#27ae60) - Success
4. Orange (#f39c12) - Warning
5. Purple (#8b5cf6) - Info
6. Pink (#ec4899) - Custom
7. Teal (#14b8a6) - Secondary
8. Blue (#3b82f6) - Primary alt

Pattern: Card 1 = Cyan, Card 2 = Red, Card 3 = Green, ..., Card 9 = Cyan (repeats)

## Pagination Performance

For 1000 cards:
- Total Pages: 42
- Cards per page: 24
- Cards rendered at once: 24 (NOT 1000)
- Page change: Instant with smooth scroll
- Memory efficient: Only current page data in DOM

## Interactive Features

1. **Hover on Card**: 
   - Scale up slightly (-translate-y-2)
   - Enhanced shadow effect
   - Highlight inner rows

2. **Click on Card**:
   - Pop animation (scale-125 with opacity fade)
   - Card disappears from grid

3. **Page Navigation**:
   - Previous/Next buttons (disabled on edges)
   - Click page number to jump
   - Type page number and press Enter
   - Automatic scroll to top

## Typography Scaling

### Header Text
- Mobile: 24px
- Tablet: 32px  
- Desktop: 36px
- 4K TV: 40px+

### Card Values
- Mobile: 18px
- Tablet: 20px
- Desktop: 24px
- 4K TV: 28px+

### Labels
- Mobile: 10px
- Tablet: 12px
- Desktop: 12px
- 4K TV: 14px+

## CSS Grid Classes Used

```css
/* Cards Grid */
grid-cols-2          /* Mobile: 2 columns */
sm:grid-cols-3       /* Tablet: 3 columns */
md:grid-cols-4       /* Desktop: 4 columns */
lg:grid-cols-6       /* Large: 6 columns (TV) */

/* Spacing */
gap-2 sm:gap-3 md:gap-4    /* Responsive gaps */

/* Height */
auto-rows-max        /* Cards fit their content */
```

## Performance Metrics

- Initial Load: ~100ms (generated data)
- Page Change: < 50ms (slice + render)
- Animation: 500ms (smooth transitions)
- Scroll to Top: 1000ms (smooth behavior)
- Total Cards Displayed: 24 per page
- Maximum DOM Cards: 24 (scales linearly)

## Notes for TV Display

1. **Viewing Distance**: Designed for 2-3 meter viewing distance
2. **Font Sizes**: Large enough for comfortable reading from distance
3. **Color Contrast**: High contrast colors for visibility
4. **Animation Speed**: Smooth but not distracting
5. **Click Targets**: Large enough for touch or remote control
6. **Layout Stability**: Fixed 24-card grid prevents jumping

## Accessibility Features

- Semantic HTML structure
- Color not the only indicator (text labels present)
- Keyboard navigation support (Enter in input)
- Focus states on buttons
- ARIA-ready structure (can be enhanced)
- High contrast backgrounds and text


