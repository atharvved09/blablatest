# E-Commerce Dashboard Design System

## Color Palette

### Primary Colors
- **Navy Sidebar**: `#0F172A` - Used for the left navigation sidebar
- **Electric Indigo**: `#6366F1` - Primary accent color for CTAs, active states, and highlights
- **White**: `#FFFFFF` - Main content area background

### Secondary Colors
- **Slate 50**: `#F8FAFC` - Light background for subtle sections
- **Slate 100**: `#F1F5F9` - Secondary background
- **Slate 300**: `#CBD5E1` - Borders and dividers
- **Slate 600**: `#64748B` - Secondary text

### Semantic Colors
- **Success**: `#10B981` - Positive trends, delivered status
- **Warning**: `#F59E0B` - Low stock, pending actions
- **Error**: `#EF4444` - Errors, refunded status
- **Info**: `#3B82F6` - Informational states

## Typography

**Font Family**: Plus Jakarta Sans
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)

### Type Scale
- **Display**: 3xl (30px) - Page headers
- **Heading**: lg (18px) - Card titles
- **Body**: base (16px) - Default text
- **Caption**: sm (14px) - Secondary text
- **Small**: xs (12px) - Labels, badges

## Spacing (8pt Grid)

All spacing follows an 8-point grid system:
- **4px** (0.5) - Minimal spacing, badge padding
- **8px** (2) - Tight spacing, icon gaps
- **16px** (4) - Standard spacing, element gaps
- **24px** (6) - Section padding, card padding
- **32px** (8) - Large gaps between major sections
- **48px** (12) - Extra large spacing
- **64px** (16) - Header heights, sidebar collapsed width

## Components

### Status Badge (5 States)
1. **Pending** - Amber background, warm tones
2. **Processing** - Blue background, info tones
3. **Shipped** - Indigo background, primary tones
4. **Delivered** - Emerald background, success tones
5. **Refunded** - Gray background, neutral tones

### KPI Card
- White/Card background with border
- Icon in top-right with colored background (10% opacity)
- Large value display (2xl)
- Trend indicator with up/down arrow
- Percentage change with color coding

### Data Table Row States
1. **Default** - White background
2. **Hover** - Slate 50 background
3. **Selected** - Primary color (indigo) with 5% opacity

### Navigation
- **Collapsed width**: 64px (w-16)
- **Expanded width**: 256px (w-64)
- **Height**: Full screen with 64px header
- **Active state**: Indigo background (#6366F1)
- **Hover state**: Slate 800 with transition

## Dark Mode

Dark mode variants available with automatic class switching:
- Background shifts to Navy (#0F172A)
- Card backgrounds to Slate 800 (#1E293B)
- Borders to Slate 700 (#334155)
- Text to light tones

## Layout Structure

```
┌─────────────────────────────────────────┐
│  Sidebar (64px collapsed / 256px full)  │
│  ┌───────────────────────────────────┐  │
│  │  Top Nav (64px height)            │  │
│  ├───────────────────────────────────┤  │
│  │                                   │  │
│  │  Main Content (p-6 = 24px)       │  │
│  │                                   │  │
│  │  - KPI Cards (gap-6)             │  │
│  │  - Charts                         │  │
│  │  - Data Tables                    │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Interactive States

### Hover States
- **Cards**: Subtle shadow lift
- **Buttons**: Opacity 80%
- **Table rows**: Background change to slate-50
- **Product cards**: Overlay with quick actions

### Focus States
- **Inputs**: Ring with primary color
- **Buttons**: Ring with 50% opacity

### Active States
- **Navigation**: Full indigo background
- **Toggle buttons**: White/card background with shadow

## Charts

Using Recharts library with custom styling:
- **Line charts**: Indigo stroke (#6366F1)
- **Bar charts**: Rounded corners (8px top radius)
- **Pie charts**: Inner radius for donut style
- **Grid**: Slate color with dashed lines
- **Tooltips**: White background with border radius
