export interface Protocol {
    id: string;
    name: string;
    symbol: string;
    icon: string; // URL or placeholder
    category: string;
    chain: string;
    tvl: number;
    tvlFormatted: string;
    apy: number;
    apyFormatted: string;
    risk: 'AAA' | 'AA' | 'A' | 'B' | 'C';
    description: string;
    assets: { name: string; value: number }[];
}

export const CATEGORIES = [
    { id: 'stablecoins', label: 'Stablecoins', value: '$156.2B', change: '+0.5%', icon: '🪙' },
    { id: 'us_treasuries', label: 'U.S. Treasuries', value: '$845.2M', change: '+12%', icon: '🏛️' },
    { id: 'non_us_debt', label: 'Non-U.S. Govt. Debt', value: '$124.5M', change: '-1.2%', icon: '🌍' },
    { id: 'corp_bonds', label: 'Corporate Bonds', value: '$45.2M', change: '+3.4%', icon: '🏢' },
    { id: 'private_credit', label: 'Private Credit', value: '$452.1M', change: '+5%', icon: '💳' },
    { id: 'commodities', label: 'Commodities', value: '$1.2B', change: '-2%', icon: '🛢️' },
    { id: 'institutional_funds', label: 'Institutional Funds', value: '$2.1B', change: '+8.5%', icon: '🏦' },
    { id: 'stocks', label: 'Stocks', value: '$145.2M', change: '+4.1%', icon: '📈' },
    { id: 'real_estate', label: 'Real Estate', value: '$156M', change: '+1.5%', icon: '🏠', badge: 'BETA' },
];

export const PROTOCOLS: Protocol[] = [
    {
        id: 'ondo',
        name: 'Ondo Finance',
        symbol: 'OUSG',
        icon: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/u6c1u2q5i22r5u2q5i22', // Placeholder
        category: 'Treasuries',
        chain: 'Ethereum',
        tvl: 450000000,
        tvlFormatted: '$450M',
        apy: 0.051,
        apyFormatted: '5.1%',
        risk: 'AA',
        description: 'Tokenized US Treasuries enabling global access to US government debt yields.',
        assets: [{ name: 'US Short-Term Treasuries', value: 100 }]
    },
    {
        id: 'goldfinch',
        name: 'Goldfinch',
        symbol: 'GFI',
        icon: '',
        category: 'Private Credit',
        chain: 'Ethereum',
        tvl: 120000000,
        tvlFormatted: '$120M',
        apy: 0.085,
        apyFormatted: '8.5%',
        risk: 'B',
        description: 'Decentralized credit protocol that allows for crypto borrowing without crypto collateral.',
        assets: [{ name: 'Emerging Market Loans', value: 60 }, { name: 'Fintech Credit', value: 40 }]
    },
    {
        id: 'maple',
        name: 'Maple Finance',
        symbol: 'MPL',
        icon: '',
        category: 'Private Credit',
        chain: 'Ethereum',
        tvl: 300000000,
        tvlFormatted: '$300M',
        apy: 0.092,
        apyFormatted: '9.2%',
        risk: 'A',
        description: 'Institutional capital marketplace powering the digital asset economy.',
        assets: [{ name: 'Corporate Loans', value: 100 }]
    },
    {
        id: 'matrixdock',
        name: 'Matrixdock',
        symbol: 'STBT',
        icon: '',
        category: 'Treasuries',
        chain: 'Ethereum',
        tvl: 85000000,
        tvlFormatted: '$85M',
        apy: 0.053,
        apyFormatted: '5.3%',
        risk: 'AA',
        description: 'Invest in US Treasury Bills on-chain.',
        assets: [{ name: 'T-Bills', value: 100 }]
    },
];
