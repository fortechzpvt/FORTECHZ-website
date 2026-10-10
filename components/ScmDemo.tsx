"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ACCENTS, themeVars, card, Stat, Pill, Btn, Table, Seg, Row, type AccentId } from "@/components/PosDemo";

/* ─── Demo credentials (frontend only, no backend) ──────────────────────────── */
const DEMO_USER = "demo";
const DEMO_PASS = "Fortechz@2026";

const DESIGN_W = 1200;
const DESIGN_H = 700;
const CHROME_H = 150;

type PageId =
  | "dashboard" | "inventory" | "warehouse" | "procurement" | "logistics" | "suppliers" | "orders"
  | "workflow" | "planning" | "manufacturing" | "quality" | "finance" | "reports"
  | "features" | "modules" | "notifications" | "roles" | "audit" | "settings";

type NavItem = { id: PageId; label: string; icon: string };

const OPS_NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "inventory", label: "Inventory", icon: "▤" },
  { id: "warehouse", label: "Warehouse", icon: "⌂" },
  { id: "procurement", label: "Procurement", icon: "✎" },
  { id: "logistics", label: "Logistics", icon: "⛟" },
  { id: "suppliers", label: "Suppliers", icon: "☺" },
  { id: "orders", label: "Customer Orders", icon: "☰" },
  { id: "workflow", label: "Workflow", icon: "⇢" },
];
const ENT_NAV: NavItem[] = [
  { id: "planning", label: "Planning", icon: "◔" },
  { id: "manufacturing", label: "Manufacturing", icon: "⚙" },
  { id: "quality", label: "Quality & Returns", icon: "✓" },
  { id: "finance", label: "Finance & Costing", icon: "₨" },
  { id: "reports", label: "Reports & BI", icon: "▥" },
  { id: "features", label: "Platform Features", icon: "✧" },
];
const ADMIN_NAV: NavItem[] = [
  { id: "modules", label: "Modules & Integrations", icon: "⧉" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
  { id: "roles", label: "Roles & Permissions", icon: "⚿" },
  { id: "audit", label: "Audit Log", icon: "☷" },
];

const TITLES: Record<PageId, [string, string]> = {
  dashboard: ["Dashboard", "Live operational overview of your supply chain"],
  inventory: ["Inventory", "Real-time stock levels, reservations, batches and valuation"],
  warehouse: ["Warehouse", "Zones, receiving, put-away, picking and capacity"],
  procurement: ["Procurement", "Requisitions, purchase orders and approvals"],
  logistics: ["Logistics & Delivery", "Shipments, carriers, routes and proof of delivery"],
  suppliers: ["Suppliers", "Profiles, scorecards, delivery reliability and risk"],
  orders: ["Customer Orders", "Sales orders, reservations, fulfilment and backorders"],
  workflow: ["End-to-End Workflow", "From stock requirement to customer delivery, fully connected"],
  planning: ["Demand & Supply Planning", "Forecasts, replenishment and purchase suggestions"],
  manufacturing: ["Manufacturing", "Bills of materials, work orders and finished goods (optional module)"],
  quality: ["Quality & Returns", "Inspections, non-conformances and return authorisations"],
  finance: ["Finance & Costing", "Supplier invoices, landed costs and payables"],
  reports: ["Reports & BI", "Filter, export and drill into every transaction"],
  features: ["Platform Features", "Everything the platform can do, all customisable to your preference"],
  modules: ["Modules & Integrations", "Switch optional modules on or off and monitor connected systems"],
  notifications: ["Notifications", "Alerts with severity, acknowledgement and history"],
  roles: ["Roles & Permissions", "Role-based access by module, action and data scope"],
  audit: ["Audit Log", "Who did what, when, with before and after values"],
  settings: ["Settings", "Make the system yours: theme, layout, approvals and numbering"],
};

/* ─── Roles (RBAC) ──────────────────────────────────────────────────────────── */
type Role = { name: string; duty: string; pages: PageId[]; limit: number; readOnly?: boolean };
const EVERY: PageId[] = ["dashboard", "inventory", "warehouse", "procurement", "logistics", "suppliers", "orders", "workflow", "planning", "manufacturing", "quality", "finance", "reports", "features", "modules", "notifications", "roles", "audit", "settings"];
const NO_ADMIN = EVERY.filter((p) => !["roles", "audit", "settings", "modules"].includes(p));

const ROLES: Role[] = [
  { name: "Super Administrator", duty: "System configuration, user administration, integrations", pages: EVERY, limit: Infinity },
  { name: "Business Owner / Executive", duty: "Company-wide dashboard, financial summaries, approvals", pages: ["dashboard", "reports", "finance", "procurement", "planning", "notifications", "audit", "features"], limit: Infinity },
  { name: "Supply Chain Manager", duty: "Procurement, inventory, logistics and operational oversight", pages: NO_ADMIN, limit: 2_000_000 },
  { name: "Procurement Officer", duty: "Requisitions, RFQs, suppliers and purchase orders", pages: ["dashboard", "procurement", "suppliers", "inventory", "planning", "workflow", "notifications"], limit: 250_000 },
  { name: "Procurement Approver", duty: "Review and approve purchases", pages: ["dashboard", "procurement", "suppliers", "finance", "notifications"], limit: 5_000_000 },
  { name: "Warehouse Manager", duty: "Warehouse operations, receiving, picking and stocktaking", pages: ["dashboard", "inventory", "warehouse", "quality", "logistics", "workflow", "notifications"], limit: 0 },
  { name: "Warehouse Staff", duty: "Assigned receiving, put-away, picking and packing tasks", pages: ["dashboard", "warehouse", "inventory"], limit: 0 },
  { name: "Inventory Controller", duty: "Stock adjustments, valuation, reconciliation", pages: ["dashboard", "inventory", "warehouse", "finance", "reports", "audit"], limit: 0 },
  { name: "Logistics Manager", duty: "Shipments, carriers, routes and delivery performance", pages: ["dashboard", "logistics", "orders", "reports", "notifications"], limit: 0 },
  { name: "Driver / Delivery Staff", duty: "Assigned deliveries, status updates and proof of delivery", pages: ["logistics"], limit: 0 },
  { name: "Sales / Order Officer", duty: "Customer records, sales orders and fulfilment requests", pages: ["dashboard", "orders", "inventory", "logistics"], limit: 0 },
  { name: "Finance Officer", duty: "Supplier invoices, costs, payment tracking and reconciliation", pages: ["dashboard", "finance", "procurement", "suppliers", "reports"], limit: 0 },
  { name: "Quality Inspector", duty: "Inspections, defects and quality approvals", pages: ["dashboard", "quality", "warehouse", "suppliers"], limit: 0 },
  { name: "Auditor / Read-only User", duty: "Read permitted records and audit reports", pages: ["dashboard", "audit", "reports", "finance", "inventory"], limit: 0, readOnly: true },
];

/* ─── Settings ──────────────────────────────────────────────────────────────── */
type Settings = {
  theme: "dark" | "light" | "system";
  accent: AccentId;
  textSize: 90 | 100 | 110;
  sidebar: "left" | "right";
  compact: boolean;
  name: string;
  role: string;
  officerLimit: number;
  poPrefix: string;
  allocation: "FIFO" | "FEFO" | "Manual";
  mfg: boolean;
  forecast: boolean;
};
const DEFAULTS: Settings = {
  theme: "dark", accent: "emerald", textSize: 100, sidebar: "left", compact: false, name: "Fortechz SCM",
  role: ROLES[0].name, officerLimit: 250_000, poPrefix: "PO", allocation: "FEFO", mfg: true, forecast: true,
};
const STORE_KEY = "fortechz-scm-demo-settings";

const Ctx = createContext<{ s: Settings; set: (p: Partial<Settings>) => void; reset: () => void; dark: boolean }>({
  s: DEFAULTS, set: () => {}, reset: () => {}, dark: true,
});
const useCfg = () => useContext(Ctx);

/* ─── Sample data (clearly labelled demo data) ──────────────────────────────── */
const lkr = (n: number) => `LKR ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const lkrShort = (n: number) => (n >= 1_000_000 ? `LKR ${(n / 1_000_000).toFixed(1)}M` : `LKR ${Math.round(n / 1000)}K`);

type Product = { sku: string; name: string; cat: string; loc: string; onHand: number; reserved: number; reorder: number; cost: number; batch: string };
const PRODUCTS: Product[] = [
  { sku: "SKU-1001", name: "Cordless Drill 18V", cat: "Tools", loc: "A-02-03", onHand: 142, reserved: 30, reorder: 40, cost: 18500, batch: "B-2406" },
  { sku: "SKU-1002", name: "Safety Helmet", cat: "Safety", loc: "B-01-02", onHand: 38, reserved: 20, reorder: 60, cost: 1850, batch: "B-2409" },
  { sku: "SKU-1003", name: "LED Panel 40W", cat: "Electrical", loc: "C-04-01", onHand: 520, reserved: 120, reorder: 150, cost: 3200, batch: "B-2403" },
  { sku: "SKU-1004", name: "PVC Pipe 2in x 3m", cat: "Plumbing", loc: "D-01-05", onHand: 0, reserved: 0, reorder: 80, cost: 1450, batch: "—" },
  { sku: "SKU-1005", name: "Industrial Adhesive 5L", cat: "Chemicals", loc: "E-02-01", onHand: 64, reserved: 12, reorder: 25, cost: 6400, batch: "B-2408" },
  { sku: "SKU-1006", name: "Pallet Wrap Roll", cat: "Packaging", loc: "B-03-04", onHand: 310, reserved: 40, reorder: 100, cost: 980, batch: "B-2407" },
  { sku: "SKU-1007", name: "Angle Grinder 850W", cat: "Tools", loc: "A-02-05", onHand: 22, reserved: 8, reorder: 30, cost: 12400, batch: "B-2405" },
  { sku: "SKU-1008", name: "Copper Cable 2.5mm 100m", cat: "Electrical", loc: "C-02-02", onHand: 96, reserved: 24, reorder: 40, cost: 14200, batch: "B-2410" },
];
const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.cat)))];
const stockOf = (p: Product) => { const a = p.onHand - p.reserved; return a <= 0 ? "Out" : a <= p.reorder ? "Low" : "OK"; };

type PO = { id: number; supplier: string; value: number; items: number; by: string; due: string; status: "Pending approval" | "Approved" | "Sent" | "Partially received" | "Received" };
const POS_SEED: PO[] = [
  { id: 4412, supplier: "Lanka Industrial Supplies", value: 185_000, items: 6, by: "S. Perera", due: "Oct 14", status: "Pending approval" },
  { id: 4411, supplier: "Pacific Electricals", value: 1_240_000, items: 14, by: "S. Perera", due: "Oct 18", status: "Pending approval" },
  { id: 4410, supplier: "Ceylon Packaging Co.", value: 96_500, items: 3, by: "D. Fernando", due: "Oct 12", status: "Sent" },
  { id: 4409, supplier: "Hardware Hub Ltd", value: 612_000, items: 9, by: "S. Perera", due: "Oct 11", status: "Partially received" },
  { id: 4408, supplier: "Pacific Electricals", value: 428_000, items: 5, by: "D. Fernando", due: "Oct 08", status: "Received" },
];

const SUPPLIERS = [
  { n: "Lanka Industrial Supplies", city: "Colombo", rating: 4.6, ontime: 96, defect: 0.8, lead: 6, risk: "Low", terms: "Net 30" },
  { n: "Pacific Electricals", city: "Kandy", rating: 4.2, ontime: 88, defect: 1.9, lead: 9, risk: "Medium", terms: "Net 45" },
  { n: "Hardware Hub Ltd", city: "Galle", rating: 3.8, ontime: 79, defect: 3.2, lead: 12, risk: "High", terms: "Net 30" },
  { n: "Ceylon Packaging Co.", city: "Negombo", rating: 4.8, ontime: 98, defect: 0.4, lead: 4, risk: "Low", terms: "Net 15" },
];

type Shipment = { id: string; to: string; carrier: string; driver: string; status: "Dispatched" | "In transit" | "Delivered" | "Delayed" | "Failed"; eta: string; cost: number };
const SHIPMENTS: Shipment[] = [
  { id: "SHP-8841", to: "BuildMart, Colombo 05", carrier: "Own fleet", driver: "K. Silva", status: "In transit", eta: "Today 15:30", cost: 4200 },
  { id: "SHP-8840", to: "Metro Hardware, Kandy", carrier: "Rapid Courier", driver: "—", status: "Delayed", eta: "Oct 11", cost: 9800 },
  { id: "SHP-8839", to: "Greenfield Projects, Galle", carrier: "Own fleet", driver: "N. Jayasuriya", status: "Delivered", eta: "Delivered 10:12", cost: 6100 },
  { id: "SHP-8838", to: "Prime Electric, Negombo", carrier: "Rapid Courier", driver: "—", status: "Failed", eta: "Reschedule Oct 12", cost: 3500 },
  { id: "SHP-8837", to: "City Contractors, Colombo 02", carrier: "Own fleet", driver: "K. Silva", status: "Dispatched", eta: "Today 17:00", cost: 3900 },
];
const TIMELINE = ["Order confirmed", "Picked and packed", "Dispatched from Main WH", "At Colombo hub", "Out for delivery", "Proof of delivery"];
const TL_DONE: Record<Shipment["status"], number> = { Dispatched: 3, "In transit": 5, Delivered: 6, Delayed: 4, Failed: 5 };

const ORDERS = [
  { id: "SO-7120", c: "BuildMart", lines: 5, value: 482_000, status: "Reserved", note: "Stock reserved (FEFO)" },
  { id: "SO-7119", c: "Metro Hardware", lines: 3, value: 214_500, status: "Picking", note: "Pick list PL-2208" },
  { id: "SO-7118", c: "Greenfield Projects", lines: 8, value: 1_120_000, status: "Partially shipped", note: "2 lines on backorder" },
  { id: "SO-7117", c: "Prime Electric", lines: 2, value: 96_000, status: "Backorder", note: "PVC Pipe out of stock" },
  { id: "SO-7116", c: "City Contractors", lines: 4, value: 318_400, status: "Delivered", note: "POD signed" },
];

const AUDIT = [
  ["10:42", "S. Perera", "Created purchase order", "PO-4412", "— → Pending approval"],
  ["10:15", "A. Wijesinghe", "Stock adjustment (damaged)", "SKU-1002", "42 → 38 · reason: crushed in transit"],
  ["09:58", "D. Fernando", "Goods receipt posted", "GRN-3108", "PO-4409 · 120 of 200 received"],
  ["09:30", "System", "Reservation released", "SO-7114", "Order cancelled · 40 units released"],
  ["09:05", "Admin", "Approval limit changed", "Role: Procurement Officer", "LKR 150,000 → LKR 250,000"],
  ["Yesterday", "M. Hassan", "Supplier risk updated", "Hardware Hub Ltd", "Medium → High"],
];

/* ─── Small helpers ─────────────────────────────────────────────────────────── */
const GREEN = ["OK", "Approved", "Received", "Delivered", "Passed", "Closed", "Matched", "Completed", "Restocked", "Packed"];
const AMBER = ["Low", "Pending approval", "Picking", "Reserved", "Dispatched", "Open", "Medium", "Sent", "Partially received", "Partially shipped", "In transit", "Inspecting", "Partial", "In progress"];
const RED = ["Out", "Delayed", "Failed", "Backorder", "High", "Failed inspection", "Critical", "Price variance"];
const tone = (s: string): "green" | "amber" | "red" | "slate" =>
  GREEN.includes(s) ? "green" : AMBER.includes(s) ? "amber" : RED.includes(s) ? "red" : "slate";

function Bars({ data, labels, fmt = (n: number) => String(n), h = "h-24" }: { data: number[]; labels: string[]; fmt?: (n: number) => string; h?: string }) {
  const max = Math.max(...data);
  return (
    <div>
      <div className={`flex items-end gap-2 ${h} border-l border-b border-pos/10 pl-2`}>
        {data.map((v, i) => <div key={i} className="flex-1 rounded-t bg-acc-600" style={{ height: `${Math.max(4, (v / max) * 100)}%`, opacity: 0.45 + 0.55 * (v / max) }} title={fmt(v)} />)}
      </div>
      <div className="flex gap-2 pl-2 mt-1 text-[8px] text-pos/40">{labels.map((l) => <span key={l} className="flex-1 text-center">{l}</span>)}</div>
    </div>
  );
}

function Meter({ pct, warn }: { pct: number; warn?: boolean }) {
  return (
    <div className="h-1.5 rounded-full bg-pos/[0.08] overflow-hidden">
      <div className={`h-full rounded-full ${warn ? "bg-amber-400" : "bg-acc-500"}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={on} disabled={disabled} onClick={() => onChange(!on)}
      className={`w-9 h-5 rounded-full p-0.5 transition-colors flex-shrink-0 ${on ? "bg-acc-600" : "bg-pos/20"} ${disabled ? "opacity-50" : ""}`}>
      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : ""}`} />
    </button>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-acc-500/30 bg-acc-500/10 px-4 py-2.5">
      <span className="w-7 h-7 rounded-full bg-acc-500/20 text-acc-300 flex items-center justify-center text-[12px]">✎</span>
      <p className="flex-1 text-[10px] text-pos/75 leading-relaxed">{children}</p>
    </div>
  );
}

function Panel({ title, sub, right, children, className = "" }: { title: string; sub?: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`${card} p-4 ${className}`}>
      <div className="flex justify-between items-start mb-3 gap-2">
        <div><p className="text-[12px] font-semibold text-pos">{title}</p>{sub && <p className="text-[9px] text-pos/35">{sub}</p>}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

type Act = (msg?: string) => void;

/* ─── Dashboard ─────────────────────────────────────────────────────────────── */
function Dashboard({ go, allowed }: { go: (p: PageId) => void; allowed: (p: PageId) => boolean }) {
  const inv = PRODUCTS.reduce((t, p) => t + p.onHand * p.cost, 0);
  const low = PRODUCTS.filter((p) => stockOf(p) === "Low").length;
  const out = PRODUCTS.filter((p) => stockOf(p) === "Out").length;
  const kpis: { label: string; value: string; sub: string; to: PageId; icon: string; tint: string }[] = [
    { label: "Inventory Value", value: lkrShort(inv * 12), sub: "Across 3 warehouses", to: "finance", icon: "₨", tint: "bg-acc-500/20 text-acc-300" },
    { label: "Active SKUs", value: "1,284", sub: "of 1,350 products", to: "inventory", icon: "▤", tint: "bg-acc-500/20 text-acc-300" },
    { label: "Low Stock", value: String(low * 9), sub: "Below reorder point", to: "inventory", icon: "!", tint: "bg-amber-500/20 text-amber-300" },
    { label: "Out of Stock", value: String(out * 4), sub: "Needs replenishment", to: "planning", icon: "×", tint: "bg-rose-500/20 text-rose-300" },
    { label: "Pending POs", value: "18", sub: "7 overdue", to: "procurement", icon: "✎", tint: "bg-violet-500/20 text-violet-300" },
    { label: "Pending Approvals", value: "2", sub: "LKR 1.4M awaiting", to: "procurement", icon: "✓", tint: "bg-amber-500/20 text-amber-300" },
    { label: "Awaiting Fulfilment", value: "26", sub: "Orders to pick and pack", to: "orders", icon: "☰", tint: "bg-acc-500/20 text-acc-300" },
    { label: "Shipments in Transit", value: "14", sub: "3 arriving today", to: "logistics", icon: "⛟", tint: "bg-acc-500/20 text-acc-300" },
    { label: "Delayed Deliveries", value: "3", sub: "Carrier delays", to: "logistics", icon: "◷", tint: "bg-rose-500/20 text-rose-300" },
    { label: "Invoices Due", value: lkrShort(2_340_000), sub: "9 supplier invoices", to: "finance", icon: "▥", tint: "bg-amber-500/20 text-amber-300" },
    { label: "Outstanding Orders", value: "41", sub: "LKR 8.6M open", to: "orders", icon: "☷", tint: "bg-violet-500/20 text-violet-300" },
    { label: "Inventory Turnover", value: "6.4x", sub: "Estimated, annualised", to: "reports", icon: "↻", tint: "bg-emerald-500/20 text-emerald-300" },
  ];
  return (
    <div className="space-y-3">
      <Note><b className="text-pos">Demo data.</b> Every card below opens its detailed page, and only shows what your role is permitted to see. Switch roles from the top bar to try it.</Note>
      <div className="grid grid-cols-6 gap-2.5">
        {kpis.map((k) => {
          const ok = allowed(k.to);
          return (
            <button key={k.label} onClick={() => ok && go(k.to)} title={ok ? `Open ${TITLES[k.to][0]}` : "Not permitted for this role"}
              className={`${card} p-3 text-left transition-colors ${ok ? "hover:border-acc-500/50" : "opacity-45 cursor-not-allowed"}`}>
              <div className="flex justify-between items-start">
                <p className="text-[10px] font-semibold text-pos/85">{k.label}</p>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${k.tint}`}>{k.icon}</span>
              </div>
              <p className="text-[17px] font-bold text-pos mt-1.5 truncate">{k.value}</p>
              <p className="text-[8px] text-pos/35 truncate">{k.sub}</p>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Panel title="Sales & Demand Trend" sub="Units per month, last 7 months">
          <Bars data={[820, 910, 760, 1040, 1180, 1090, 1260]} labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]} />
        </Panel>
        <Panel title="Purchase Spending" sub="LKR millions per month">
          <Bars data={[3.1, 4.2, 3.6, 5.4, 4.8, 6.1, 5.2]} labels={["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]} fmt={(n) => `LKR ${n}M`} />
        </Panel>
        <Panel title="Stock by Category" sub="Share of inventory value">
          <div className="space-y-2 mt-1">
            {[["Electrical", 38], ["Tools", 27], ["Plumbing", 14], ["Safety", 11], ["Chemicals", 6], ["Packaging", 4]].map(([n, v]) => (
              <div key={n as string} className="flex items-center gap-2 text-[9px] text-pos/70"><span className="w-14">{n}</span><div className="flex-1"><Meter pct={(v as number) * 2} /></div><span className="w-7 text-right">{v}%</span></div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Panel title="Pending Approvals" right={<button onClick={() => allowed("procurement") && go("procurement")} className="text-[10px] text-acc-400">Review →</button>}>
          <div className="space-y-2">
            {POS_SEED.filter((p) => p.status === "Pending approval").map((p) => (
              <div key={p.id} className="flex items-center gap-2 rounded-xl bg-posinset border border-pos/[0.07] p-2">
                <div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-pos truncate">PO-{p.id} · {p.supplier}</p><p className="text-[8px] text-pos/35">{lkr(p.value)} · by {p.by}</p></div>
                <Pill tone="amber">Pending</Pill>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Low-Stock Alerts" right={<button onClick={() => allowed("inventory") && go("inventory")} className="text-[10px] text-acc-400">Inventory →</button>}>
          <div className="space-y-2">
            {PRODUCTS.filter((p) => stockOf(p) !== "OK").slice(0, 3).map((p) => (
              <div key={p.sku} className="flex items-center gap-2 rounded-xl bg-posinset border border-pos/[0.07] p-2">
                <div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-pos truncate">{p.name}</p><p className="text-[8px] text-pos/35">{p.onHand - p.reserved} available · reorder at {p.reorder}</p></div>
                <Pill tone={tone(stockOf(p))}>{stockOf(p) === "Out" ? "Out" : "Low"}</Pill>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Upcoming Deliveries" right={<button onClick={() => allowed("logistics") && go("logistics")} className="text-[10px] text-acc-400">Logistics →</button>}>
          <div className="space-y-2">
            {SHIPMENTS.slice(0, 3).map((s) => (
              <div key={s.id} className="flex items-center gap-2 rounded-xl bg-posinset border border-pos/[0.07] p-2">
                <div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-pos truncate">{s.id} · {s.to}</p><p className="text-[8px] text-pos/35">{s.eta}</p></div>
                <Pill tone={tone(s.status)}>{s.status}</Pill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ─── Inventory ─────────────────────────────────────────────────────────────── */
function Inventory({ demo }: { demo: Act }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const rows = PRODUCTS.filter((p) => (cat === "All" || p.cat === cat) && `${p.name} ${p.sku}`.toLowerCase().includes(q.toLowerCase()));
  const val = PRODUCTS.reduce((t, p) => t + p.onHand * p.cost, 0);
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Stock Value" sub="At average cost" value={lkrShort(val)} tint="bg-acc-500/20 text-acc-300" icon="₨" />
        <Stat label="Units On Hand" sub="Sample of 8 SKUs" value={PRODUCTS.reduce((t, p) => t + p.onHand, 0).toLocaleString()} tint="bg-acc-500/20 text-acc-300" icon="▤" />
        <Stat label="Reserved" sub="Allocated to orders" value={PRODUCTS.reduce((t, p) => t + p.reserved, 0).toLocaleString()} tint="bg-violet-500/20 text-violet-300" icon="⚑" />
        <Stat label="Needs Attention" sub="Low or out of stock" value={String(PRODUCTS.filter((p) => stockOf(p) !== "OK").length)} tint="bg-amber-500/20 text-amber-300" icon="!" />
      </div>
      <div className="flex gap-2 items-center">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by product name or SKU, or scan a barcode…" className="flex-1 rounded-xl border border-pos/10 bg-posinset px-3 py-2 text-[11px] text-pos outline-none focus:border-acc-500" />
        <Seg value={cat} onChange={setCat} options={CATEGORIES.slice(0, 5).map((c) => ({ v: c, label: c }))} />
        <Btn onDemo={() => demo()}>Adjust Stock</Btn>
        <Btn primary onDemo={() => demo()}>+ Receive Stock</Btn>
      </div>
      <div className={card}>
        <Table
          head={["Product", "SKU", "Location", "On hand", "Reserved", "Available", "Batch", "Value", "Status"]}
          empty="No products match your search."
          rows={rows.map((p) => [
            <b key="n" className="text-pos">{p.name}</b>, p.sku, p.loc, p.onHand, p.reserved, p.onHand - p.reserved, p.batch, lkr(p.onHand * p.cost),
            <Pill key="s" tone={tone(stockOf(p))}>{stockOf(p)}</Pill>,
          ])}
        />
      </div>
    </div>
  );
}

/* ─── Warehouse ─────────────────────────────────────────────────────────────── */
function Warehouse({ demo }: { demo: Act }) {
  const zones = [
    { z: "Zone A · Tools", used: 71, bins: "184 / 260 bins" },
    { z: "Zone B · Safety & Packaging", used: 58, bins: "120 / 206 bins" },
    { z: "Zone C · Electrical", used: 86, bins: "224 / 260 bins" },
    { z: "Zone D · Plumbing", used: 44, bins: "88 / 200 bins" },
    { z: "Zone E · Chemicals (controlled)", used: 63, bins: "50 / 80 bins" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Receiving Today" sub="3 deliveries expected" value="3" tint="bg-acc-500/20 text-acc-300" icon="↓" />
        <Stat label="Put-away Tasks" sub="Awaiting staff" value="11" tint="bg-amber-500/20 text-amber-300" icon="⇅" />
        <Stat label="Pick Lists Open" sub="Orders being picked" value="6" tint="bg-violet-500/20 text-violet-300" icon="☰" />
        <Stat label="Pick Accuracy" sub="Last 30 days" value="99.2%" tint="bg-emerald-500/20 text-emerald-300" icon="✓" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Capacity by Zone" sub="Zone → aisle → rack → shelf → bin" right={<Btn onDemo={() => demo()}>Start Cycle Count</Btn>}>
          <div className="space-y-2.5">
            {zones.map((z) => (
              <div key={z.z}>
                <div className="flex justify-between text-[10px] text-pos/80 mb-1"><span>{z.z}</span><span className="text-pos/45">{z.bins} · {z.used}%</span></div>
                <Meter pct={z.used} warn={z.used > 80} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Put-away Recommendations" sub="Suggested from zone, size and pick frequency">
          <Table head={["Item", "From", "Suggested bin", ""]}
            rows={[
              ["LED Panel 40W ×200", "GRN-3108", "C-04-02", <Btn key="a" primary onDemo={() => demo()}>Confirm</Btn>],
              ["Safety Helmet ×120", "GRN-3107", "B-01-03", <Btn key="b" primary onDemo={() => demo()}>Confirm</Btn>],
              ["Adhesive 5L ×30", "GRN-3105", "E-02-02", <Btn key="c" primary onDemo={() => demo()}>Confirm</Btn>],
            ]} />
        </Panel>
      </div>
      <Panel title="Active Pick Lists" sub="Barcode scan confirms each pick" right={<Btn onDemo={() => demo()}>Print Packing Slips</Btn>}>
        <Table head={["Pick list", "Order", "Lines", "Picker", "Progress", "Status"]}
          rows={[
            ["PL-2208", "SO-7119", 3, "R. Kumar", "2 / 3 picked", <Pill key="a" tone="amber">Picking</Pill>],
            ["PL-2207", "SO-7120", 5, "A. Silva", "5 / 5 picked", <Pill key="b" tone="green">Packed</Pill>],
            ["PL-2206", "SO-7118", 8, "R. Kumar", "6 / 8 picked", <Pill key="c" tone="red">2 short</Pill>],
          ]} />
      </Panel>
    </div>
  );
}

/* ─── Procurement (approval limits really work) ─────────────────────────────── */
function Procurement({ toast }: { toast: Act }) {
  const { s } = useCfg();
  const role = ROLES.find((r) => r.name === s.role) ?? ROLES[0];
  const limit = role.name === "Procurement Officer" ? s.officerLimit : role.limit;
  const [pos, setPos] = useState(POS_SEED);

  const approve = (po: PO) => {
    if (role.readOnly) return toast("Read-only role: approvals are not permitted");
    if (po.value > limit) return toast(`${lkr(po.value)} is above your ${limit ? lkr(limit) : "LKR 0"} approval limit. Escalated to a Procurement Approver`);
    setPos((l) => l.map((p) => (p.id === po.id ? { ...p, status: "Approved" } : p)));
    toast(`${s.poPrefix}-${po.id} approved. It is recorded in the audit log`);
  };
  const pending = pos.filter((p) => p.status === "Pending approval");
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Open Requisitions" sub="Awaiting a PO" value="9" tint="bg-acc-500/20 text-acc-300" icon="✎" />
        <Stat label="Pending Approval" sub={lkrShort(pending.reduce((t, p) => t + p.value, 0))} value={String(pending.length)} tint="bg-amber-500/20 text-amber-300" icon="✓" />
        <Stat label="Your Approval Limit" sub={role.name} value={limit === Infinity ? "Unlimited" : lkr(limit)} tint="bg-violet-500/20 text-violet-300" icon="⚿" />
        <Stat label="Avg Approval Time" sub="Last 30 days" value="5.2 hrs" tint="bg-emerald-500/20 text-emerald-300" icon="◷" />
      </div>
      <Note><b className="text-pos">Try it:</b> approve a purchase order. Orders above your role&apos;s limit are escalated instead of approved. Change your role in the top bar, or the officer limit in Settings.</Note>
      <div className={card}>
        <div className="flex justify-between items-center px-4 pt-3">
          <p className="text-[12px] font-semibold text-pos">Purchase Orders</p>
          <div className="flex gap-2"><Btn onDemo={() => toast()}>New Requisition</Btn><Btn primary onDemo={() => toast()}>+ Create PO</Btn></div>
        </div>
        <Table head={["PO", "Supplier", "Items", "Raised by", "Due", "Value", "Status", ""]}
          rows={pos.map((p) => [
            <b key="i" className="text-pos">{s.poPrefix}-{p.id}</b>, p.supplier, p.items, p.by, p.due, lkr(p.value),
            <Pill key="s" tone={tone(p.status)}>{p.status}</Pill>,
            p.status === "Pending approval" ? <Btn key="a" primary onDemo={() => approve(p)}>Approve</Btn> : <span key="x" className="text-pos/30">—</span>,
          ])} />
      </div>
    </div>
  );
}

/* ─── Logistics ─────────────────────────────────────────────────────────────── */
function Logistics({ demo }: { demo: Act }) {
  const [sel, setSel] = useState(SHIPMENTS[0].id);
  const ship = SHIPMENTS.find((x) => x.id === sel) ?? SHIPMENTS[0];
  const done = TL_DONE[ship.status];
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="In Transit" sub="Across 4 routes" value="14" tint="bg-acc-500/20 text-acc-300" icon="⛟" />
        <Stat label="On-time Delivery" sub="Last 30 days" value="93.4%" tint="bg-emerald-500/20 text-emerald-300" icon="✓" />
        <Stat label="Failed Deliveries" sub="Awaiting reschedule" value="2" tint="bg-rose-500/20 text-rose-300" icon="×" />
        <Stat label="Shipping Cost" sub="This month" value={lkrShort(412_000)} tint="bg-violet-500/20 text-violet-300" icon="₨" />
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className={`${card} col-span-3`}>
          <div className="flex justify-between items-center px-4 pt-3"><p className="text-[12px] font-semibold text-pos">Shipments</p><Btn primary onDemo={() => demo()}>+ Create Shipment</Btn></div>
          <div className="p-2">
            {SHIPMENTS.map((x) => (
              <button key={x.id} onClick={() => setSel(x.id)} className={`w-full grid grid-cols-[1fr_1.6fr_1fr_1fr] gap-2 items-center text-left text-[10px] px-2 py-2.5 rounded-lg border ${sel === x.id ? "border-acc-500/50 bg-acc-500/10" : "border-transparent hover:bg-pos/[0.04]"}`}>
                <b className="text-pos">{x.id}</b><span className="text-pos/70 truncate">{x.to}</span><span className="text-pos/50">{x.carrier}</span><span className="text-right"><Pill tone={tone(x.status)}>{x.status}</Pill></span>
              </button>
            ))}
          </div>
        </div>
        <Panel title={`${ship.id} status history`} sub={`${ship.carrier} · ${ship.eta}`} className="col-span-2">
          <ol className="space-y-2.5">
            {TIMELINE.map((t, i) => {
              const ok = i < done;
              const stuck = i === done && (ship.status === "Delayed" || ship.status === "Failed");
              return (
                <li key={t} className="flex items-center gap-2.5 text-[10px]">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${ok ? "bg-acc-600 text-white" : stuck ? "bg-rose-500 text-white" : "bg-pos/10 text-pos/30"}`}>{ok ? "✓" : stuck ? "!" : ""}</span>
                  <span className={ok ? "text-pos" : stuck ? "text-rose-400" : "text-pos/35"}>{t}{stuck ? ` (${ship.status.toLowerCase()})` : ""}</span>
                </li>
              );
            })}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

/* ─── Suppliers ─────────────────────────────────────────────────────────────── */
function Suppliers({ demo }: { demo: Act }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {SUPPLIERS.map((s) => (
          <div key={s.n} className={`${card} p-4`}>
            <div className="flex justify-between items-start">
              <div><p className="text-[12px] font-semibold text-pos">{s.n}</p><p className="text-[9px] text-pos/40">{s.city} · {s.terms}</p></div>
              <Pill tone={tone(s.risk)}>{s.risk} risk</Pill>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3 text-center">
              {[["Rating", `${s.rating} / 5`], ["On-time", `${s.ontime}%`], ["Defects", `${s.defect}%`], ["Lead time", `${s.lead} d`]].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-posinset border border-pos/[0.07] py-2"><p className="text-[12px] font-bold text-pos">{v}</p><p className="text-[8px] text-pos/40">{l}</p></div>
              ))}
            </div>
            <div className="mt-3"><Meter pct={s.ontime} warn={s.ontime < 85} /></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2"><Btn onDemo={() => demo()}>Compare Quotations</Btn><Btn primary onDemo={() => demo()}>+ Add Supplier</Btn></div>
    </div>
  );
}

/* ─── Customer orders ───────────────────────────────────────────────────────── */
function Orders({ demo }: { demo: Act }) {
  const { s } = useCfg();
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Open Orders" sub="LKR 8.6M" value="41" tint="bg-acc-500/20 text-acc-300" icon="☰" />
        <Stat label="Fulfilment Rate" sub="Shipped complete" value="94.8%" tint="bg-emerald-500/20 text-emerald-300" icon="✓" />
        <Stat label="Backorders" sub="Waiting on stock" value="5" tint="bg-rose-500/20 text-rose-300" icon="◷" />
        <Stat label="Allocation Rule" sub="Configured in Settings" value={s.allocation} tint="bg-violet-500/20 text-violet-300" icon="⚑" />
      </div>
      <div className={card}>
        <div className="flex justify-between items-center px-4 pt-3"><p className="text-[12px] font-semibold text-pos">Sales Orders</p><div className="flex gap-2"><Btn onDemo={() => demo()}>Check Availability</Btn><Btn primary onDemo={() => demo()}>+ New Order</Btn></div></div>
        <Table head={["Order", "Customer", "Lines", "Value", "Fulfilment note", "Status"]}
          rows={ORDERS.map((o) => [<b key="i" className="text-pos">{o.id}</b>, o.c, o.lines, lkr(o.value), o.note, <Pill key="s" tone={tone(o.status)}>{o.status}</Pill>])} />
      </div>
    </div>
  );
}

/* ─── Workflow ──────────────────────────────────────────────────────────────── */
const STEPS = [
  { t: "Stock requirement", d: "Triggered by a sales order, a reorder point, or a manual request.", rule: "Reorder rules draft requisitions automatically. A human still approves.", rec: "Trigger: SKU-1004 PVC Pipe fell below reorder point (80)" },
  { t: "Purchase requisition", d: "Request items and quantities, with a reason and a cost centre.", rule: "Requisitions are linked to the demand that created them.", rec: "REQ-2291 · 200 × PVC Pipe 2in · requested by S. Perera" },
  { t: "Approval & quotation", d: "Compare supplier quotes and approve the spend within the role's limit.", rule: "Approval limits are configurable by role and purchase value.", rec: "3 quotes compared · Lanka Industrial Supplies is lowest landed cost" },
  { t: "Purchase order", d: "Issue the official order to the chosen supplier.", rule: "A PO never increases available stock before goods are received.", rec: "PO-4412 · LKR 185,000 · expected Oct 14" },
  { t: "Receiving & inspection", d: "Record quantities received, discrepancies and quality results.", rule: "A partial delivery leaves the remaining quantity open on the PO.", rec: "GRN-3109 · 120 of 200 received · 80 remain open" },
  { t: "Put-away & inventory", d: "Put stock away and update the balance through the stock movement ledger.", rule: "The movement ledger is the source of truth and balances reconcile to it.", rec: "+120 units to D-01-05 · ledger entry MOV-90812" },
  { t: "Order fulfilment", d: "Reserve, pick, pack, dispatch and deliver to the customer.", rule: "Cancelled orders release reservations. Every shipment keeps its status history.", rec: "SO-7117 released from backorder · PL-2209 created" },
];

function Workflow() {
  const [i, setI] = useState(3);
  const st = STEPS[i];
  return (
    <div className="space-y-3">
      <div className={`${card} p-4`}>
        <div className="flex items-center">
          {STEPS.map((s, n) => (
            <div key={s.t} className="flex items-center flex-1 last:flex-none">
              <button onClick={() => setI(n)} className="flex flex-col items-center gap-1.5 w-[110px]">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-colors ${n === i ? "bg-acc-600 border-acc-500 text-white" : n < i ? "bg-acc-500/20 border-acc-500/50 text-acc-300" : "border-pos/15 text-pos/50"}`}>{n + 1}</span>
                <span className={`text-[9px] text-center leading-tight ${n === i ? "text-pos font-semibold" : "text-pos/50"}`}>{s.t}</span>
              </button>
              {n < STEPS.length - 1 && <span className={`flex-1 h-px ${n < i ? "bg-acc-500/60" : "bg-pos/10"}`} />}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Panel title={`${i + 1}. ${st.t}`} sub="What happens here"><p className="text-[11px] text-pos/75 leading-relaxed">{st.d}</p></Panel>
        <Panel title="System rule" sub="Enforced on the server"><p className="text-[11px] text-pos/75 leading-relaxed">{st.rule}</p></Panel>
        <Panel title="Example record" sub="Demo data"><p className="text-[11px] text-pos/75 leading-relaxed">{st.rec}</p></Panel>
      </div>
      <Panel title="Reverse workflow" sub="Returns, rejected deliveries and refunds follow the same audited path">
        <div className="flex flex-wrap gap-1.5">
          {["Customer return", "Return authorisation", "Inspection", "Restock or scrap", "Replacement or refund", "Supplier return (PRN)", "Credit note", "Ledger and audit entry"].map((x, n) => (
            <span key={x} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-posinset border border-pos/[0.07] text-[10px] text-pos/80"><span className="text-acc-400">{n + 1}</span>{x}</span>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ─── Planning ──────────────────────────────────────────────────────────────── */
function Planning({ toast }: { toast: Act }) {
  const { s } = useCfg();
  return (
    <div className="space-y-3">
      <Panel title="Purchase Suggestions" sub="Drafted from stock levels, reorder points and open demand"
        right={<span className="text-[9px] text-pos/45">Sending to a supplier still needs approval</span>}>
        <Table head={["Product", "Available", "Reorder at", "Open demand", "Suggested qty", "Supplier", ""]}
          rows={PRODUCTS.filter((p) => stockOf(p) !== "OK").map((p) => [
            <b key="n" className="text-pos">{p.name}</b>, p.onHand - p.reserved, p.reorder, p.reserved + 20, p.reorder * 2,
            SUPPLIERS[p.sku.length % SUPPLIERS.length].n,
            <Btn key="b" primary onDemo={() => toast(`Draft ${s.poPrefix} created for ${p.name}. It needs approval before sending`)}>Draft PO</Btn>,
          ])} />
      </Panel>
      {s.forecast ? (
        <div className="grid grid-cols-2 gap-3">
          <Panel title="Demand Forecast" sub="Units per month · next 6 months (advanced forecasting module)">
            <Bars data={[1300, 1380, 1250, 1500, 1620, 1710]} labels={["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]} />
          </Panel>
          <Panel title="Seasonal Trends" sub="Index vs yearly average">
            <div className="space-y-2">
              {[["Electrical", 118], ["Tools", 104], ["Plumbing", 92], ["Packaging", 131]].map(([n, v]) => (
                <div key={n as string} className="flex items-center gap-2 text-[9px] text-pos/70"><span className="w-16">{n}</span><div className="flex-1"><Meter pct={Math.min(100, (v as number) / 1.4)} /></div><span className="w-8 text-right">{v}</span></div>
              ))}
            </div>
          </Panel>
        </div>
      ) : (
        <Note><b className="text-pos">Advanced forecasting is switched off.</b> Enable it from Modules &amp; Integrations. Companies that only buy, store and distribute are never forced to use it.</Note>
      )}
    </div>
  );
}

/* ─── Manufacturing ─────────────────────────────────────────────────────────── */
function Manufacturing({ demo }: { demo: Act }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Bill of Materials" sub="Assembly Kit AK-200" right={<Btn onDemo={() => demo()}>Edit BOM</Btn>}>
          <Table head={["Component", "Qty per unit", "Available", "Status"]}
            rows={[["Cordless Drill 18V", 1, 120, <Pill key="a" tone="green">OK</Pill>], ["Safety Helmet", 1, 18, <Pill key="b" tone="amber">Low</Pill>], ["Pallet Wrap Roll", 0.2, 270, <Pill key="c" tone="green">OK</Pill>]]} />
        </Panel>
        <Panel title="Work Orders" sub="Production consumes components and creates finished goods" right={<Btn primary onDemo={() => demo()}>+ Work Order</Btn>}>
          <Table head={["Work order", "Product", "Qty", "Status"]}
            rows={[["WO-512", "Assembly Kit AK-200", 60, <Pill key="a" tone="amber">In progress</Pill>], ["WO-511", "Assembly Kit AK-200", 40, <Pill key="b" tone="green">Completed</Pill>], ["WO-513", "Site Safety Pack", 100, <Pill key="c" tone="slate">Planned</Pill>]]} />
        </Panel>
      </div>
    </div>
  );
}

/* ─── Quality & returns ─────────────────────────────────────────────────────── */
function Quality({ demo }: { demo: Act }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Inspections Today" sub="Inbound goods" value="7" tint="bg-acc-500/20 text-acc-300" icon="✓" />
        <Stat label="Pass Rate" sub="Last 30 days" value="97.1%" tint="bg-emerald-500/20 text-emerald-300" icon="↗" />
        <Stat label="Open Non-conformances" sub="Corrective actions due" value="3" tint="bg-amber-500/20 text-amber-300" icon="!" />
        <Stat label="Open Returns" sub="Awaiting inspection" value="4" tint="bg-violet-500/20 text-violet-300" icon="↺" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Inspections" right={<Btn primary onDemo={() => demo()}>+ Inspection</Btn>}>
          <Table head={["Ref", "Goods", "Supplier", "Result"]}
            rows={[["QI-901", "GRN-3109", "Lanka Industrial", <Pill key="a" tone="green">Passed</Pill>], ["QI-900", "GRN-3108", "Pacific Electricals", <Pill key="b" tone="amber">Inspecting</Pill>], ["QI-899", "GRN-3105", "Hardware Hub", <Pill key="c" tone="red">Failed inspection</Pill>]]} />
        </Panel>
        <Panel title="Return Authorisations" right={<Btn onDemo={() => demo()}>+ Return</Btn>}>
          <Table head={["RMA", "From", "Reason", "Outcome"]}
            rows={[["RMA-318", "BuildMart", "Damaged in transit", <Pill key="a" tone="amber">Inspecting</Pill>], ["RMA-317", "Metro Hardware", "Wrong item", <Pill key="b" tone="green">Restocked</Pill>], ["RMA-316", "Supplier PRN", "Rejected batch", <Pill key="c" tone="slate">Credit note</Pill>]]} />
        </Panel>
      </div>
    </div>
  );
}

/* ─── Finance ───────────────────────────────────────────────────────────────── */
function Finance({ demo }: { demo: Act }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Outstanding Payables" sub="9 supplier invoices" value={lkrShort(2_340_000)} tint="bg-amber-500/20 text-amber-300" icon="₨" />
        <Stat label="Due This Week" sub="3 invoices" value={lkrShort(640_000)} tint="bg-rose-500/20 text-rose-300" icon="◷" />
        <Stat label="Landed Cost Added" sub="Freight, duty, handling" value="7.8%" tint="bg-violet-500/20 text-violet-300" icon="⛟" />
        <Stat label="Cost of Goods Sold" sub="This month" value={lkrShort(5_120_000)} tint="bg-acc-500/20 text-acc-300" icon="▥" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Panel title="Invoice Ageing" sub="Outstanding by days overdue" className="col-span-1">
          <Bars data={[1.4, 0.6, 0.3, 0.04]} labels={["Current", "1-30", "31-60", "60+"]} fmt={(n) => `LKR ${n}M`} />
        </Panel>
        <div className={`${card} col-span-2`}>
          <div className="flex justify-between items-center px-4 pt-3"><p className="text-[12px] font-semibold text-pos">Supplier Invoices · 3-way match</p><Btn onDemo={() => demo()}>Export to Accounting</Btn></div>
          <Table head={["Invoice", "Supplier", "PO", "GRN", "Amount", "Match"]}
            rows={[
              ["INV-5521", "Ceylon Packaging", "PO-4410", "GRN-3104", lkr(96_500), <Pill key="a" tone="green">Matched</Pill>],
              ["INV-5519", "Hardware Hub", "PO-4409", "GRN-3106", lkr(367_200), <Pill key="b" tone="amber">Partial</Pill>],
              ["INV-5517", "Pacific Electricals", "PO-4408", "GRN-3101", lkr(428_000), <Pill key="c" tone="red">Price variance</Pill>],
            ]} />
        </div>
      </div>
    </div>
  );
}

/* ─── Reports ───────────────────────────────────────────────────────────────── */
const REPORTS: Record<string, string[]> = {
  Inventory: ["Current stock and valuation", "Stock movement ledger", "Stock ageing", "Slow-moving and obsolete stock", "Stockout frequency", "Batch and serial traceability", "Expiry and damaged stock"],
  Procurement: ["Purchase spending over time", "Purchase orders by status", "Supplier price comparison", "On-time delivery percentage", "Supplier rejection and defect rates", "Purchase price variance", "Approval turnaround time"],
  Warehouse: ["Receiving performance", "Put-away time", "Picking accuracy", "Warehouse capacity utilisation", "Stock count accuracy", "Damaged goods and returns"],
  Logistics: ["On-time delivery percentage", "Average delivery time", "Shipping cost per order", "Carrier performance", "Failed delivery rate", "Proof-of-delivery completion"],
  Finance: ["Supplier invoice ageing", "Outstanding payables", "Landed costs", "Cost of goods sold", "Tax summaries", "Budget vs actual spending"],
  Orders: ["Orders by status", "Order fulfilment rate", "Backorders", "Cancellation rate", "Return rate", "Sales by customer and product"],
};

function Reports({ demo }: { demo: Act }) {
  const [tab, setTab] = useState("Inventory");
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Seg value={tab} onChange={setTab} options={Object.keys(REPORTS).map((k) => ({ v: k, label: k }))} />
        <div className="flex gap-2"><Btn onDemo={() => demo()}>Date range: This month</Btn><Btn onDemo={() => demo()}>Schedule</Btn></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {REPORTS[tab].map((r) => (
          <div key={r} className={`${card} p-3 flex items-center gap-3`}>
            <span className="w-8 h-8 rounded-lg bg-acc-500/15 text-acc-300 flex items-center justify-center text-[12px]">▥</span>
            <div className="flex-1 min-w-0"><p className="text-[11px] font-semibold text-pos truncate">{r}</p><p className="text-[9px] text-pos/40">Filters · export · drill into transactions</p></div>
            <Btn onDemo={() => demo()}>Run</Btn>
            <Btn onDemo={() => demo()}>Export</Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Platform features (from the SCM requirements) ─────────────────────────── */
const FEATURE_GROUPS: { title: string; sub: string; items: string[] }[] = [
  { title: "Inventory Management", sub: "Know what you have, where it is and what it is worth", items: ["Real-time stock levels", "Receiving, adjustments and transfers", "Categories, SKUs, barcodes and QR codes", "Batch, lot and serial tracking", "Reorder points and low-stock alerts", "Reservations and allocation", "Expiry and damaged stock", "Valuation and movement history"] },
  { title: "Warehouse Management", sub: "From the dock door to the dispatch bay", items: ["Zone, aisle, rack, shelf and bin", "Receiving and inspection", "Put-away recommendations", "Picking, packing and dispatch", "Cycle counts and stocktaking", "Barcode and QR scanning", "Capacity monitoring", "Returns and damaged goods"] },
  { title: "Procurement & Purchasing", sub: "Controlled spending with a clear paper trail", items: ["Purchase requisitions", "RFQs and supplier comparison", "Purchase orders", "Approval workflows", "Goods Received Notes", "Supplier invoices and payments", "Purchase returns", "Automatic purchase suggestions"] },
  { title: "Logistics & Delivery", sub: "Every shipment traceable end to end", items: ["Shipment creation and tracking", "Delivery scheduling", "Vehicles, drivers and carriers", "Route planning", "Proof of delivery", "Shipping costs", "Failed deliveries and rescheduling", "Delivery performance reports"] },
  { title: "Suppliers, Customers & Orders", sub: "Relationships and orders in one place", items: ["Supplier profiles and scorecards", "Contracts and certifications", "Risk assessments", "Customer profiles and pricing", "Sales orders and reservations", "Partial shipments and backorders", "Cancellations and returns", "Customer credit status"] },
  { title: "Enterprise Capabilities", sub: "Built to grow with the organisation", items: ["Role-based access control", "Audit trail on every change", "Configurable approval limits", "Notifications and automation", "API and integrations", "Mobile app for warehouse and drivers", "Optional manufacturing", "Analytics and BI"] },
];

function Features() {
  return (
    <div className="space-y-3">
      <Note><b className="text-pos">Fully customised to you.</b> Each capability can be switched on, hidden, renamed or extended. Nothing here is a fixed template.</Note>
      <div className="grid grid-cols-2 gap-3">
        {FEATURE_GROUPS.map((g) => (
          <div key={g.title} className={`${card} p-4`}>
            <p className="text-[12px] font-semibold text-pos">{g.title}</p>
            <p className="text-[9px] text-pos/40 mb-3">{g.sub}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => <span key={it} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-posinset border border-pos/[0.07] text-[10px] text-pos/80"><span className="text-acc-400">✓</span>{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Modules & integrations ────────────────────────────────────────────────── */
function Modules({ toast }: { toast: Act }) {
  const { s, set } = useCfg();
  const core = ["Inventory", "Warehouse", "Procurement", "Logistics", "Suppliers", "Customer orders"];
  const integ = [
    ["Accounting / ERP", "Synced 8 min ago", "green"], ["E-commerce store", "Synced 2 min ago", "green"], ["POS system", "Synced 1 min ago", "green"],
    ["Courier API", "Retrying (2 of 5)", "amber"], ["SMS provider", "Synced 14 min ago", "green"], ["Payment gateway", "Not connected", "slate"],
  ] as const;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Optional Modules" sub="Switch on only what your business needs">
          <Row label="Manufacturing" hint="BOMs, work orders and finished goods"><Toggle on={s.mfg} onChange={(mfg) => set({ mfg })} /></Row>
          <Row label="Advanced forecasting" hint="Demand forecasts and seasonal trends"><Toggle on={s.forecast} onChange={(forecast) => set({ forecast })} /></Row>
          {core.map((c) => <Row key={c} label={c} hint="Core module, always on"><Toggle on disabled onChange={() => {}} /></Row>)}
        </Panel>
        <Panel title="Integrations" sub="Sync status, retries and reconciliation">
          <div className="space-y-2">
            {integ.map(([n, st, t]) => (
              <div key={n} className="flex items-center gap-2 rounded-xl bg-posinset border border-pos/[0.07] p-2.5">
                <div className="flex-1"><p className="text-[10px] font-semibold text-pos">{n}</p><p className="text-[8px] text-pos/40">{st}</p></div>
                <Pill tone={t}>{t === "green" ? "Connected" : t === "amber" ? "Retrying" : "Off"}</Pill>
                <Btn onDemo={() => toast()}>Configure</Btn>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ─── Notifications ─────────────────────────────────────────────────────────── */
function Notifications() {
  const [list, setList] = useState([
    { id: 1, sev: "Critical", t: "PVC Pipe 2in is out of stock", m: "2 customer orders are on backorder", ack: false },
    { id: 2, sev: "High", t: "Shipment SHP-8840 delayed", m: "Rapid Courier reports a 1 day delay to Kandy", ack: false },
    { id: 3, sev: "Medium", t: "PO-4411 needs approval", m: "LKR 1,240,000 · above officer limit", ack: false },
    { id: 4, sev: "Medium", t: "GRN-3109 discrepancy", m: "120 of 200 received, 80 remain open", ack: false },
    { id: 5, sev: "Low", t: "Supplier certificate expiring", m: "Hardware Hub ISO cert expires in 21 days", ack: true },
  ]);
  return (
    <div className="space-y-2">
      {list.map((n) => (
        <div key={n.id} className={`${card} p-3 flex items-center gap-3 ${n.ack ? "opacity-55" : ""}`}>
          <Pill tone={n.sev === "Critical" || n.sev === "High" ? "red" : n.sev === "Medium" ? "amber" : "slate"}>{n.sev}</Pill>
          <div className="flex-1"><p className="text-[11px] font-semibold text-pos">{n.t}</p><p className="text-[9px] text-pos/40">{n.m}</p></div>
          {n.ack ? <span className="text-[10px] text-pos/40">Acknowledged</span> : <Btn onDemo={() => setList((l) => l.map((x) => (x.id === n.id ? { ...x, ack: true } : x)))}>Acknowledge</Btn>}
        </div>
      ))}
    </div>
  );
}

/* ─── Roles ─────────────────────────────────────────────────────────────────── */
function Roles({ toast }: { toast: Act }) {
  const { s, set } = useCfg();
  const [sel, setSel] = useState(s.role);
  const r = ROLES.find((x) => x.name === sel) ?? ROLES[0];
  const label = (id: PageId) => TITLES[id][0];
  return (
    <div className="grid grid-cols-5 gap-3">
      <div className={`${card} col-span-2 p-2 space-y-0.5`}>
        {ROLES.map((x) => (
          <button key={x.name} onClick={() => setSel(x.name)} className={`w-full flex justify-between items-center px-2.5 py-1.5 rounded-lg text-[10px] text-left border ${sel === x.name ? "border-acc-500/40 bg-acc-500/15 text-pos" : "border-transparent text-pos/65 hover:bg-pos/[0.04]"}`}>
            {x.name}{s.role === x.name && <Pill tone="green">You</Pill>}
          </button>
        ))}
      </div>
      <div className="col-span-3 space-y-3">
        <Panel title={r.name} sub={r.duty}>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded-lg bg-posinset border border-pos/[0.07] p-2.5"><p className="text-[8px] text-pos/40 uppercase tracking-wider">Approval limit</p><p className="text-[13px] font-bold text-pos">{r.limit === Infinity ? "Unlimited" : r.limit ? lkr(r.name === "Procurement Officer" ? s.officerLimit : r.limit) : "None"}</p></div>
            <div className="rounded-lg bg-posinset border border-pos/[0.07] p-2.5"><p className="text-[8px] text-pos/40 uppercase tracking-wider">Data scope</p><p className="text-[13px] font-bold text-pos">{r.readOnly ? "Read-only" : r.pages.length === EVERY.length ? "All branches" : "Assigned modules"}</p></div>
          </div>
          <p className="text-[9px] text-pos/40 mb-1.5">Can open</p>
          <div className="flex flex-wrap gap-1.5">
            {r.pages.map((p) => <span key={p} className="px-2 py-1 rounded-lg bg-posinset border border-pos/[0.07] text-[10px] text-pos/80"><span className="text-acc-400">✓ </span>{label(p)}</span>)}
          </div>
        </Panel>
        <div className="flex gap-2">
          <Btn primary onDemo={() => { set({ role: r.name }); toast(`Now viewing the system as ${r.name}`); }}>View system as this role</Btn>
          <Btn onDemo={() => toast()}>Edit permissions</Btn>
        </div>
        <p className="text-[9px] text-pos/40">Permissions are set per module, action and data scope. The server enforces them on every request, not just the buttons you see.</p>
      </div>
    </div>
  );
}

/* ─── Audit ─────────────────────────────────────────────────────────────────── */
function Audit({ demo }: { demo: Act }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center"><p className="text-[10px] text-pos/45">Completed transactions are never silently overwritten. Corrections keep the full trail.</p><Btn onDemo={() => demo()}>Export log</Btn></div>
      <div className={card}>
        <Table head={["When", "Actor", "Action", "Record", "Before → after"]}
          rows={AUDIT.map((a) => [a[0], <b key="u" className="text-pos">{a[1]}</b>, a[2], a[3], a[4]])} />
      </div>
    </div>
  );
}

/* ─── Settings ──────────────────────────────────────────────────────────────── */
function SettingsPage() {
  const { s, set, reset } = useCfg();
  const step = "w-7 h-7 rounded-lg border border-pos/10 bg-posinset text-pos/80 text-sm hover:bg-pos/[0.06]";
  return (
    <div className="space-y-3">
      <Note><b className="text-pos">These are only a few of the things you can change.</b> Branding, roles, approval chains, numbering, document templates and workflows are all built to your requirements.</Note>
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Appearance" sub="Changes apply instantly across the whole system">
          <Row label="Mode" hint="Dark, bright, or follow your device"><Seg value={s.theme} onChange={(theme) => set({ theme })} options={[{ v: "dark", label: "☾ Dark" }, { v: "light", label: "☀ Bright" }, { v: "system", label: "Auto" }]} /></Row>
          <Row label="Accent colour" hint="Buttons, highlights and active items">
            <div className="flex gap-2">
              {(Object.keys(ACCENTS) as AccentId[]).map((a) => (
                <button key={a} onClick={() => set({ accent: a })} aria-label={a} className={`w-6 h-6 rounded-full border-2 transition-transform ${s.accent === a ? "border-pos scale-110" : "border-transparent"}`} style={{ background: `rgb(${ACCENTS[a][2]})` }} />
              ))}
            </div>
          </Row>
          <Row label="Text size" hint="Make everything easier to read"><Seg value={s.textSize} onChange={(textSize) => set({ textSize })} options={[{ v: 90, label: "Small" }, { v: 100, label: "Normal" }, { v: 110, label: "Large" }]} /></Row>
        </Panel>
        <Panel title="Layout" sub="Arrange the workspace the way you work">
          <Row label="Sidebar position" hint="Left or right hand side"><Seg value={s.sidebar} onChange={(sidebar) => set({ sidebar })} options={[{ v: "left", label: "Left" }, { v: "right", label: "Right" }]} /></Row>
          <Row label="Compact sidebar" hint="Icons only, for more room"><Seg value={s.compact ? "on" : "off"} onChange={(v) => set({ compact: v === "on" })} options={[{ v: "off", label: "Off" }, { v: "on", label: "On" }]} /></Row>
          <Row label="Business name" hint="Shown in the sidebar">
            <input value={s.name} maxLength={22} onChange={(e) => set({ name: e.target.value })} className="w-40 rounded-lg bg-posinset border border-pos/10 px-3 py-1.5 text-[11px] text-pos outline-none focus:border-acc-500" />
          </Row>
        </Panel>
        <Panel title="Approvals & numbering" sub="Used by Procurement and Orders">
          <Row label="Officer approval limit" hint="Procurement Officers cannot approve above this">
            <div className="inline-flex items-center gap-2">
              <button onClick={() => set({ officerLimit: Math.max(0, s.officerLimit - 50_000) })} className={step} aria-label="Decrease">−</button>
              <span className="w-24 text-center text-[11px] font-bold text-pos">{lkr(s.officerLimit)}</span>
              <button onClick={() => set({ officerLimit: Math.min(2_000_000, s.officerLimit + 50_000) })} className={step} aria-label="Increase">+</button>
            </div>
          </Row>
          <Row label="PO number prefix" hint="Applied to every purchase order">
            <input value={s.poPrefix} maxLength={6} onChange={(e) => set({ poPrefix: e.target.value.toUpperCase() })} className="w-20 rounded-lg bg-posinset border border-pos/10 px-3 py-1.5 text-[11px] text-pos outline-none focus:border-acc-500" />
          </Row>
        </Panel>
        <Panel title="Stock allocation" sub="How customer orders reserve stock">
          <Row label="Allocation rule" hint="Which stock is reserved first"><Seg value={s.allocation} onChange={(allocation) => set({ allocation })} options={[{ v: "FIFO", label: "FIFO" }, { v: "FEFO", label: "FEFO" }, { v: "Manual", label: "Manual" }]} /></Row>
          <div className="pt-2"><button onClick={reset} className="px-3 py-1.5 rounded-lg border border-pos/10 text-[10px] font-semibold text-pos/80 hover:bg-pos/[0.06]">Reset to defaults</button></div>
        </Panel>
      </div>
    </div>
  );
}

/* ─── Shell ─────────────────────────────────────────────────────────────────── */
function Shell({ onLogout }: { onLogout: () => void }) {
  const { s: cfg, set, dark } = useCfg();
  const [page, setPage] = useState<PageId>("dashboard");
  const [msg, setMsg] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const bodyRef = useRef<HTMLDivElement>(null);

  const role = ROLES.find((r) => r.name === cfg.role) ?? ROLES[0];
  const allowed = (p: PageId) => {
    if (p === "manufacturing" && !cfg.mfg) return false;
    return role.pages.includes(p) || (p === "settings" && role === ROLES[0]);
  };
  const toast: Act = (m) => {
    setMsg(m ?? "Demo mode, this is a view only experience");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(""), 3200);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }); }, [page]);
  // if the role (or an optional module) changes and the current page is no longer permitted, fall back
  useEffect(() => {
    if (!allowed(page)) setPage(role.pages.find((p) => allowed(p)) ?? "dashboard");
  }, [cfg.role, cfg.mfg]);

  const navBtn = (n: NavItem) => (
    <button key={n.id} onClick={() => setPage(n.id)} title={n.label} className={`w-full flex items-center ${cfg.compact ? "justify-center" : "gap-2.5"} px-2.5 py-1 rounded-lg text-[10.5px] text-left transition-colors ${page === n.id ? "bg-acc-500/15 text-pos border border-acc-500/40" : "text-pos/60 border border-transparent hover:bg-pos/[0.04]"}`}>
      <span className="w-4 text-center text-[11px] opacity-80">{n.icon}</span>{!cfg.compact && <span className="truncate">{n.label}</span>}
    </button>
  );
  const group = (title: string, items: NavItem[]) => {
    const vis = items.filter((n) => allowed(n.id));
    if (!vis.length) return null;
    return (
      <div key={title}>
        {!cfg.compact && <p className="text-[8px] tracking-[0.15em] uppercase text-pos/30 px-2.5 mt-2.5 mb-1">{title}</p>}
        <nav className={`space-y-0.5 ${cfg.compact ? "mt-2" : ""}`}>{vis.map(navBtn)}</nav>
      </div>
    );
  };

  const [title, sub] = TITLES[page];
  const views: Record<PageId, ReactNode> = {
    dashboard: <Dashboard go={setPage} allowed={allowed} />,
    inventory: <Inventory demo={toast} />,
    warehouse: <Warehouse demo={toast} />,
    procurement: <Procurement toast={toast} />,
    logistics: <Logistics demo={toast} />,
    suppliers: <Suppliers demo={toast} />,
    orders: <Orders demo={toast} />,
    workflow: <Workflow />,
    planning: <Planning toast={toast} />,
    manufacturing: <Manufacturing demo={toast} />,
    quality: <Quality demo={toast} />,
    finance: <Finance demo={toast} />,
    reports: <Reports demo={toast} />,
    features: <Features />,
    modules: <Modules toast={toast} />,
    notifications: <Notifications />,
    roles: <Roles toast={toast} />,
    audit: <Audit demo={toast} />,
    settings: <SettingsPage />,
  };

  return (
    <div className={`flex h-full bg-posbg text-pos font-sans ${cfg.sidebar === "right" ? "flex-row-reverse" : ""}`}>
      <aside className={`${cfg.compact ? "w-[64px]" : "w-[186px]"} flex-shrink-0 ${cfg.sidebar === "right" ? "border-l" : "border-r"} border-pos/[0.06] flex flex-col p-3 bg-posside overflow-y-auto pos-scroll transition-[width] duration-200`}>
        <p className={`${cfg.compact ? "text-[18px] text-center" : "text-[18px] px-1"} font-light tracking-wide pb-1 pt-1 truncate`} title={cfg.name}>{cfg.compact ? (cfg.name || "F").charAt(0).toUpperCase() : cfg.name || "Your Business"}</p>
        {group("Operations", OPS_NAV)}
        {group("Enterprise", ENT_NAV)}
        {group("Administration", ADMIN_NAV)}
        <div className="mt-auto space-y-0.5 border-t border-pos/[0.06] pt-2">
          {allowed("settings") && navBtn({ id: "settings", label: "Settings", icon: "⚙" })}
          <button onClick={onLogout} title="Logout" className={`w-full ${cfg.compact ? "text-center" : "text-left"} px-2.5 py-1 text-[10.5px] text-pos/60 hover:bg-pos/[0.04] rounded-lg`}>⇥{!cfg.compact && " Logout"}</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between px-5 py-3 border-b border-pos/[0.06]">
          <div><h2 className="text-[15px] font-semibold">{title}</h2><p className="text-[10px] text-pos/40">{sub}</p></div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-[9px] text-pos/45">Viewing as
              <select value={cfg.role} onChange={(e) => set({ role: e.target.value })} aria-label="Switch demo role" className="rounded-full border border-pos/10 bg-posinset px-2.5 py-1.5 text-[10px] text-pos outline-none focus:border-acc-500 max-w-[170px]">
                {ROLES.map((r) => <option key={r.name} value={r.name}>{r.name}</option>)}
              </select>
            </label>
            <button onClick={() => set({ theme: dark ? "light" : "dark" })} title={dark ? "Switch to bright mode" : "Switch to dark mode"} aria-label="Toggle dark and bright mode" className="w-7 h-7 rounded-full bg-pos/[0.06] text-[11px]">{dark ? "☀" : "☾"}</button>
            {allowed("notifications") && <button onClick={() => setPage("notifications")} title="Notifications" aria-label="Notifications" className="relative w-7 h-7 rounded-full bg-pos/[0.06] text-[11px]">🔔<span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">4</span></button>}
            <span className="w-7 h-7 rounded-full bg-acc-600 text-white text-[11px] font-bold flex items-center justify-center">{role.name.charAt(0)}</span>
          </div>
        </header>
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 pos-scroll" style={{ zoom: cfg.textSize / 100 }}>{views[page]}</div>
      </div>
      <div role="status" className={`absolute bottom-5 left-1/2 -translate-x-1/2 max-w-[560px] text-center px-4 py-2 rounded-full bg-acc-600 text-white text-[11px] font-semibold shadow-lg transition-all duration-300 ${msg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        {msg}
      </div>
    </div>
  );
}

/* ─── Login ─────────────────────────────────────────────────────────────────── */
function Login({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNotice(true), 450);
    return () => clearTimeout(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() === DEMO_USER && pass === DEMO_PASS) onSuccess();
    else setError("Invalid username or password. Use the demo credentials.");
  };
  const input = "w-full rounded-lg bg-posinset border border-pos/[0.06] px-3 py-2.5 text-[12px] text-pos placeholder:text-pos/30 outline-none focus:border-acc-500";

  return (
    <div className="relative h-full bg-posbg text-pos flex flex-col items-center justify-center">
      <p className="text-[44px] font-light tracking-wide mb-1">Fortechz</p>
      <p className="text-[11px] tracking-[0.3em] uppercase text-pos/45 mb-5">Supply Chain Management</p>
      <form onSubmit={submit} className="w-[300px] rounded-2xl bg-poscard border border-pos/[0.06] p-6 space-y-3">
        <div><h3 className="text-lg font-bold">Sign in</h3><p className="text-[10px] text-pos/40">Please enter your credentials below to continue</p></div>
        <label className="block text-[11px] font-semibold">Username
          <input className={`${input} mt-1.5 font-normal`} placeholder="Enter your username" value={user} onChange={(e) => { setUser(e.target.value); setError(""); }} autoComplete="off" />
        </label>
        <label className="block text-[11px] font-semibold">Password
          <span className="relative block mt-1.5">
            <input className={`${input} font-normal pr-9`} type={show ? "text" : "password"} placeholder="Enter your password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} autoComplete="off" />
            <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pos/45 text-xs">{show ? "🙈" : "👁"}</button>
          </span>
        </label>
        {error && <p className="text-[10px] text-rose-400">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-acc-600 hover:bg-acc-500 text-white py-2.5 text-[12px] font-bold transition-colors">Sign in</button>
        <button type="button" onClick={() => setNotice(true)} className="w-full text-center text-[10px] text-acc-400">Need the demo credentials?</button>
      </form>
      <p className="mt-4 text-[10px] text-pos/45 text-center max-w-[300px]">Sample data only. Try different user roles, approval limits and layouts after you sign in.</p>

      <div className={`absolute top-5 right-5 w-[270px] rounded-2xl border border-pos/20 bg-pos/[0.09] backdrop-blur-xl p-4 shadow-[0_20px_50px_-12px_rgba(12,126,255,0.55)] transition-all duration-500 ${notice ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`} role="status">
        <div className="flex justify-between items-start">
          <p className="text-[12px] font-bold">Demo credentials</p>
          <button onClick={() => setNotice(false)} aria-label="Dismiss" className="text-pos/50 hover:text-pos text-sm leading-none">×</button>
        </div>
        <p className="text-[10px] text-pos/55 mt-1">Use these to sign in and explore the system.</p>
        <div className="mt-3 space-y-1.5 text-[11px]">
          <div className="flex justify-between rounded-lg bg-black/30 px-3 py-2"><span className="text-pos/45">Username</span><b className="font-mono">{DEMO_USER}</b></div>
          <div className="flex justify-between rounded-lg bg-black/30 px-3 py-2"><span className="text-pos/45">Password</span><b className="font-mono">{DEMO_PASS}</b></div>
        </div>
        <button onClick={() => { setUser(DEMO_USER); setPass(DEMO_PASS); setError(""); setNotice(false); }} className="mt-3 w-full rounded-lg bg-acc-600 hover:bg-acc-500 text-white py-2 text-[11px] font-semibold transition-colors">Fill them in for me</button>
      </div>
    </div>
  );
}

/* ─── Exported: scaled, glass-framed demo ───────────────────────────────────── */
export default function ScmDemo() {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [authed, setAuthed] = useState(false);
  const [cfg, setCfg] = useState<Settings>(DEFAULTS);
  const [sysDark, setSysDark] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setCfg({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch { /* storage blocked: keep defaults */ }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSysDark(mq.matches);
    const on = (e: MediaQueryListEvent) => setSysDark(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const save = (next: Settings) => {
    setCfg(next);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };
  const dark = cfg.theme === "system" ? sysDark : cfg.theme === "dark";

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const update = () => {
      const byWidth = (el.clientWidth - 40) / DESIGN_W;
      const byHeight = Math.max(0.5, (window.innerHeight - CHROME_H) / DESIGN_H);
      setScale(Math.min(1, byWidth, byHeight));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  return (
    <div ref={outer} className="relative mx-auto max-w-[1280px]">
      <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(12,126,255,0.35),transparent_70%)] blur-2xl" />
      <div className="relative mx-auto w-fit rounded-[2rem] p-3 sm:p-4 border border-pos/40 bg-pos/[0.12] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(255,255,255,0.12),0_40px_90px_-20px_rgba(6,14,28,0.55),0_14px_30px_-10px_rgba(12,126,255,0.35)]">
        <div className="rounded-[1.4rem] overflow-hidden border border-black/40 shadow-[inset_0_2px_14px_rgba(0,0,0,0.7)]">
          <div className="relative" style={{ width: DESIGN_W * scale, height: DESIGN_H * scale }}>
            <Ctx.Provider value={{ s: cfg, set: (patch) => save({ ...cfg, ...patch }), reset: () => save(DEFAULTS), dark }}>
              <div className={`absolute top-0 left-0 origin-top-left overflow-hidden ${dark ? "" : "pos-light"}`} style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, ...themeVars(dark ? "dark" : "light", cfg.accent) }}>
                {authed ? <Shell onLogout={() => setAuthed(false)} /> : <Login onSuccess={() => setAuthed(true)} />}
              </div>
            </Ctx.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
