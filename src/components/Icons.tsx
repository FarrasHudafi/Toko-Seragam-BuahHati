import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const UserIcon = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>);
export const TagIcon = (p: P) => (<svg {...base} {...p}><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1" /></svg>);
export const SearchIcon = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>);
export const BagIcon = (p: P) => (<svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>);
export const HeartIcon = ({ filled, ...p }: P & { filled?: boolean }) => (<svg {...base} {...p} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10z" /></svg>);
export const ChevronLeft = (p: P) => (<svg {...base} {...p}><path d="m15 5-7 7 7 7" /></svg>);
export const ChevronRight = (p: P) => (<svg {...base} {...p}><path d="m9 5 7 7-7 7" /></svg>);
export const ChevronDown = (p: P) => (<svg {...base} {...p}><path d="m5 9 7 7 7-7" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const PlusIcon = (p: P) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const MinusIcon = (p: P) => (<svg {...base} {...p}><path d="M5 12h14" /></svg>);
export const TruckIcon = (p: P) => (<svg {...base} {...p}><path d="M2 6h11v9H2zM13 9h4l3 3v3h-7" /><circle cx="6.500" cy="17" r="1.800" /><circle cx="16.500" cy="17" r="1.800" /></svg>);
export const ReturnIcon = (p: P) => (<svg {...base} {...p}><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-3" /></svg>);
export const RulerIcon = (p: P) => (<svg {...base} {...p}><rect x="2" y="8" width="20" height="8" /><path d="M6 8v3M10 8v4M14 8v3M18 8v4" /></svg>);
export const GridIcon = (p: P) => (<svg {...base} {...p}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></svg>);
export const ListIcon = (p: P) => (<svg {...base} {...p}><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></svg>);
export const MenuIcon = (p: P) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const MailIcon = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" /><path d="m3 7 9 6 9-6" /></svg>);
export const PinIcon = (p: P) => (<svg {...base} {...p}><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.500" /></svg>);
export const WhatsAppIcon = (p: P) => (<svg {...base} {...p}><path d="M4 20l1.300-4.200A8 8 0 1 1 8.300 18.800L4 20z" /><path d="M9 9c0 3 3 6 6 6l1.200-1.500-2-1-1 .700c-1-.400-2-1.400-2.400-2.400l.700-1-1-2L9 9z" /></svg>);
export const InstagramIcon = (p: P) => (<svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.500" /><circle cx="17" cy="7" r=".6" /></svg>);
export const FacebookIcon = (p: P) => (<svg {...base} {...p}><path d="M14 8h2V4h-2.500A3.500 3.500 0 0 0 10 7.500V10H8v4h2v6h4v-6h2l.5-4H14V8z" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base} {...p}><path d="m5 12 5 5 9-10" /></svg>);
