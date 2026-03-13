# UI Improvements Plan

## Overview
Improve desktop interaction and clean up navigation/branding for the Agent Actions landing page.

## Changes Required

### 1. Remove GitHub Links
**Locations:**
- Header navigation (right side)
- Hero CTA buttons section
- Footer

**Impact:** Low — simple deletions

### 2. Make Desktop Items Interactive
**Current state:** 
- Table cells use `title` attribute + `cursor-help`
- Mobile has custom tap handler with styled tooltips

**Target state:**
- Desktop: proper hover/click tooltips
- Remove `cursor-help` cursor
- Cells should be visually interactive (hover states)

### 3. Tooltip Library Selection
**Requirements:**
- Styled tooltips (not browser default)
- Support hover AND click
- Customizable styling to match terminal theme
- Lightweight

**Options:**
- Radix UI Tooltip (headless, full control)
- Tippy.js (standalone, feature-rich)
- React Tooltip (simple, popular)

**Recommendation:** Radix UI Tooltip
- Headless (full styling control)
- Accessibility built-in
- Matches project's use of modern React patterns
- Small bundle size

### 4. Tooltip Implementation Strategy
**Architecture:**
- Create `<SecurityCell>` component wrapper
- Takes `title` (detail text), `value` (✅/❌/⚠️/text), `severity` (green/yellow/red)
- Renders Radix Tooltip with custom styling
- Mobile: keep existing tap handler OR use tooltip with click trigger

**Styling:**
- Match existing terminal theme (Gruvbox colors)
- Border color based on severity
- Dark background (#1d2021)
- Cream text (#ebdbb2)
- Smooth animations

### 5. Footer Update
**Change:** Remove "Built on Optimism" text
**Keep:** GitHub link → actually DELETE this too per requirements

## Implementation Steps

### Phase 1: Setup
1. Install Radix UI Tooltip: `npm install @radix-ui/react-tooltip`
2. Create `SecurityCell.tsx` component

### Phase 2: Component Development
1. Build `SecurityCell` with Radix Tooltip
2. Add custom styling matching terminal theme
3. Support both desktop (hover) and mobile (click) patterns
4. Test with different severity levels

### Phase 3: Integration
1. Replace all table cells with `<SecurityCell>`
2. Extract title text to props
3. Remove `cursor-help` classes
4. Remove mobile tap handler (if tooltip handles it)

### Phase 4: Cleanup
1. Remove GitHub links from header
2. Remove GitHub link from hero CTAs
3. Remove footer GitHub link
4. Remove "Built on Optimism" footer text
5. Remove unused mobile tap handler code (if applicable)

### Phase 5: Polish
1. Test responsive behavior
2. Verify tooltip positioning
3. Check accessibility (keyboard navigation)
4. Verify mobile tap still works

## Files to Modify
- `package.json` — add @radix-ui/react-tooltip
- `src/App.tsx` — remove links, integrate SecurityCell
- `src/components/SecurityCell.tsx` — new component
- `src/App.css` — tooltip styling (optional, can use inline)

## Testing Checklist
- [ ] Desktop hover shows tooltips
- [ ] Desktop click shows/hides tooltips  
- [ ] Mobile tap shows tooltips
- [ ] All severity colors render correctly
- [ ] No GitHub links visible
- [ ] Footer only shows what's needed (nothing?)
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

## Risk Assessment
**Low risk changes:**
- Removing links (pure deletion)
- Footer text removal

**Medium risk:**
- Tooltip library integration (new dependency)
- Mobile interaction changes (could break tap behavior)

**Mitigation:**
- Keep mobile tap handler initially, remove only after tooltip tested
- Test on actual mobile device before removing old code
