# RWA Mart - Frontend Design Specification

## 1. Visual Identity & Theme
**Objective**: "Premium, State-of-the-Art, Dynamic"
- **Theme**: Dark Mode (Default)
- **Color Palette**:
    - **Background**: Deep Blue/Black (`#0A0F1C`)
    - **Surface**: Glassmorphism Panels (`rgba(255, 255, 255, 0.05)` with blur)
    - **Primary Accent**: Gold/Amber (Representing RWA/Yield) (`#F59E0B` to `#D97706`)
    - **Secondary Accent**: Electric Blue (Tech/Data) (`#3B82F6`)
    - **Success**: Emerald Green (`#10B981`)
    - **Danger**: Rose Red (`#F43F5E`)
    - **Text**: White (Primary), Slate-400 (Secondary)
- **Typography**: `Inter` (sans-serif) for numbers/UI, `Outfit` (display) for headers.

## 2. Layout Structure
- **Mobile First**: Optimized for Luffa SuperBox mini-program.
- **Navigation**: Bottom Tab Bar (Fixed)
    1.  **Home** (Market Overview)
    2.  **Discovery** (Assets Browser)
    3.  **Portfolio** (My Assets)
- **Header**: Dynamic based on page.
    - **Home/Discovery**: Brand Logo/Title + Wallet Connection Status.
    - **Details**: Back Button + Protocol Name.

## 3. Page Designs

### 3.1 Home (Market Overview)
**Goal**: Immediate market pulse.
- **Top Section**:
    - **Total RWA TVL**: Large counter with 24h change (Green/Red indicator).
    - **Macro Ticker**: Horizontal scrolling carousel of global macro data (Fed Rate, CPI, US 10Y). Card style.
- **Categories Grid**:
    - "Total RWA Value" broken down by category (Treasury, Commodities, Private Credit).
    - Visual: Grid of small cards with Icons + TVL.
- **Hot Protocols**:
    - "Trending" Section.
    - Horizontal scroll of Top 3 protocols by APY/TVL Growth.
    - Card content: Protocol Logo, Name, high-contrast APY value.

### 3.2 Discovery (Asset List)
**Goal**: Find investment opportunities.
- **Filters (Sticky Header)**:
    - Pills for Categories: "All", "Treasury", "Private Credit", "Real Estate".
    - Sort Dropdown: TVL (High-Low), APY (High-Low).
- **List Item (Card)**:
    - **Left**: Protocol Icon + Name + Chain Token (e.g., Eth logo).
    - **Right**: APY (Highlighted) + TVL (Smaller, muted).
    - **Bottom**: Credit Rating Badge (e.g., "AA+"), Loan Value.
    - **Interaction**: Tap to open Protocol Details.

### 3.3 Protocol Details
**Goal**: Deep dive & Conversion.
- **Header**: Large Chart (Yield History) - using `recharts`.
- **Info Section**:
    - Description.
    - **Asset Composition**: List/Pie chart of underlying assets.
    - **Key Metrics**: Min Investment, Lock-up period, Risk Score.
- **Action Bar (Fixed Bottom)**:
    - "Invest" Button (Primary Gradient).
    - Opens Luffa Transaction modal or External Link (if pure information).

### 3.4 Portfolio (My Assets) - *Requires Luffa SDK*
**Goal**: Track personal performance.
- **Summary Card**: Total Value ($), Total Earnings ($).
- **Holdings List**: List of active investments.
    - Shows: Protocol Name, Staked Amount, Current Value, Pending Yield.
- **State**:
    - **Not Connected**: "Connect Luffa Wallet" prominent button.
    - **Connected**: Data view.

## 4. Component Architecture (React/Vite)

### Core Components
- `Layout`: Wrapped around pages, handles BottomNav.
- `BottomNav`: Navigation logic.
- `WalletConnect`: Handles Luffa SDK connection/state.
- `PageHeader`: Reusable header.

### UI Library (Tailwind + Framer Motion)
- `Card`: Base glassmorphism container.
- `Button`: Primary (Gold), Secondary (Outline), Ghost.
- `Badge`: For Risk Ratings, APY tags.
- `MacroTicker`: Auto-scroll component.
- `AssetRow`: Reusable list item.

## 5. Mock Data Strategy
Since backend API is "Phase 2", use robust mock data `mock/rwaData.ts`:
- Mock Global Macro Data.
- Mock Protocols List (at least 10 items).
- Mock User Portfolio.

## 6. Luffa Integration Plan
- Re-implement `useLuffaWallet` hook (based on `IMPLEMENTATION_SUMMARY.md`).
- Ensure `miniprogram` folder structure is created for bridging (WebView).
