"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Demo credentials (frontend only, no backend) ──────────────────────────── */
const DEMO_USER = "demo";
const DEMO_PASS = "Fortechz@2026";

const DESIGN_W = 1200;
const DESIGN_H = 700;

type PageId =
  | "dashboard" | "checkout" | "tables" | "preorders" | "menu" | "ingredients" | "suppliers"
  | "notifications" | "stock" | "stockhistory" | "history" | "returns" | "reports" | "staff";

const NAV: { id: PageId; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "checkout", label: "Checkout", icon: "🛒" },
  { id: "tables", label: "Tables", icon: "▭" },
  { id: "preorders", label: "Pre-Orders", icon: "◷" },
  { id: "menu", label: "Menu Items", icon: "✦" },
  { id: "ingredients", label: "Ingredients", icon: "❋" },
  { id: "suppliers", label: "Suppliers", icon: "⛟" },
  { id: "notifications", label: "Notifications", icon: "🔔" },
];
const ADMIN_NAV: typeof NAV = [
  { id: "stock", label: "Stock Control", icon: "⇅" },
  { id: "stockhistory", label: "Stock History", icon: "☰" },
  { id: "history", label: "Checkout History", icon: "▤" },
  { id: "returns", label: "Returns & Refunds", icon: "↺" },
  { id: "reports", label: "Reports", icon: "◔" },
  { id: "staff", label: "Staff Management", icon: "☺" },
];

const TITLES: Record<PageId, [string, string]> = {
  dashboard: ["Dashboard", "Welcome to your ForTechZ Cafe POS overview"],
  checkout: ["Checkout", "Take dine-in and takeaway orders and process payment"],
  tables: ["Tables", "See which tables are free and open their running orders"],
  preorders: ["Pre-Orders", "Track advance orders, pickup dates and customer deposits"],
  menu: ["Menu Items", "Drinks, food and bakery items with pictures, prices and recipes"],
  ingredients: ["Ingredients", "Raw materials, units and current stock levels"],
  suppliers: ["Suppliers", "Vendors you purchase stock from"],
  notifications: ["Notifications", "Low stock alerts and system messages"],
  stock: ["Stock Control", "Receive (GRN), return (PRN) and write off ingredients"],
  stockhistory: ["Stock History", "Audit trail of every GRN, PRN and wastage transaction"],
  history: ["Checkout History", "Every invoice, reprint and return in one place"],
  returns: ["Returns & Refunds", "Secure record of all refunds and restocked items"],
  reports: ["Reports", "Revenue, ingredient usage, pre-order and staff performance reports"],
  staff: ["Staff Management", "Cashiers, roles and shift activity"],
};

/* ─── Sample data ───────────────────────────────────────────────────────────── */
const lkr = (n: number) => `LKR ${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

const MENU = [
  { name: "Cappuchino", cat: "Hot Drinks", price: 1000, cost: 200, servings: 95, grad: "from-violet-600 to-fuchsia-500" },
  { name: "Iced Latte", cat: "Cold Drinks", price: 1100, cost: 260, servings: 80, grad: "from-sky-600 to-cyan-400" },
  { name: "Chocolate Croissant", cat: "Bakery", price: 650, cost: 210, servings: 24, grad: "from-amber-600 to-orange-400" },
  { name: "Club Sandwich", cat: "Food", price: 1450, cost: 520, servings: 30, grad: "from-emerald-600 to-lime-400" },
  { name: "Espresso", cat: "Hot Drinks", price: 700, cost: 120, servings: 140, grad: "from-rose-600 to-pink-400" },
  { name: "Cheesecake Slice", cat: "Bakery", price: 950, cost: 340, servings: 12, grad: "from-indigo-600 to-blue-400" },
];

const TRANSACTIONS = [
  { amt: 1000, who: "Uber Eats", by: "admin · Oct 7, 12:47 AM", pay: "Uber Eats", q: 1 },
  { amt: 2000, who: "Takeaway", by: "admin · Oct 5, 05:51 PM", pay: "Cash", q: 2 },
  { amt: 2000, who: "Table 1", by: "Pakaya · Oct 5, 04:40 PM", pay: "Cash", q: 2 },
  { amt: 2000, who: "Uber Eats", by: "Pakaya · Oct 5, 06:00 AM", pay: "Uber Eats", q: 2 },
];

const INVOICES = [
  ["10/7/2026", "12:47 AM", "INV-179131425240403", "admin", "Uber Eats", "", 1, "Uber Eats", 1000],
  ["10/5/2026", "5:51 PM", "INV-179120290092702", "admin", "Takeaway", "", 2, "Cash", 2000],
  ["10/5/2026", "4:40 PM", "INV-179119862341001", "Pakaya", "Dine-In", "Table 1", 2, "Cash", 2000],
  ["10/5/2026", "6:00 AM", "INV-179116024447", "Pakaya", "Uber Eats", "", 2, "Uber Eats", 2000],
  ["10/5/2026", "6:00 AM", "INV-179116020656", "Pakaya", "Dine-In", "Table 1", 2, "Cash", 2000],
  ["10/5/2026", "5:13 AM", "INV-179115740734", "admin", "Dine-In", "Table 1", 1, "Cash", 1000],
  ["10/5/2026", "5:10 AM", "INV-179115724510", "Pakaya", "PickMe", "", 2, "PickMe", 2000],
  ["10/5/2026", "5:10 AM", "INV-179115721712", "Pakaya", "Takeaway", "", 2, "Card", 2000],
] as const;

const STOCK_HISTORY = [
  ["10/7/2026", "12:46 AM", "GRN (In)", "Ceylon Dairy Co.", "Milk", "20", "1,000.00", "LKR 20,000.00"],
  ["10/5/2026", "2:54 PM", "Wastage", "—", "Milk", "0.4", "1,000.00", "LKR 400.00"],
  ["10/5/2026", "2:52 PM", "Wastage", "—", "Milk", "1", "1,000.00", "LKR 1,000.00"],
];

const INGREDIENTS = [
  ["Milk", "Litre", "46.2", "10", "OK"],
  ["Espresso Beans", "Kg", "8.5", "3", "OK"],
  ["Sugar", "Kg", "14", "5", "OK"],
  ["Chocolate Syrup", "Litre", "2.1", "2", "Low"],
  ["Croissant Dough", "Kg", "6", "4", "OK"],
];

const SUPPLIERS = [
  ["Ceylon Dairy Co.", "Colombo 07", "+94 11 234 5678", "LKR 20,000"],
  ["Hill Country Coffee", "Nuwara Eliya", "+94 52 222 1100", "LKR 64,500"],
  ["Golden Bake Supplies", "Kandy", "+94 81 220 4411", "LKR 18,200"],
];

const STAFF = [
  ["admin", "Manager", "Full access", "Active"],
  ["Pakaya", "Cashier", "Checkout, Tables", "Active"],
  ["Nimal", "Barista", "Checkout", "Off shift"],
];

/* ─── Small building blocks ─────────────────────────────────────────────────── */
const card = "rounded-2xl border border-white/[0.06] bg-[#12121f]";

function Stat({ label, sub, value, tint, icon }: { label: string; sub?: string; value: string; tint: string; icon: string }) {
  return (
    <div className={`${card} p-4 flex-1 min-w-0`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-white/85">{label}</p>
          {sub && <p className="text-[9px] text-white/35 mt-0.5">{sub}</p>}
        </div>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] ${tint}`}>{icon}</span>
      </div>
      <p className="text-xl font-bold text-white mt-3 truncate">{value}</p>
    </div>
  );
}

function Pill({ children, tone = "slate" }: { children: ReactNode; tone?: "green" | "amber" | "violet" | "blue" | "slate" | "red" }) {
  const tones = {
    green: "bg-emerald-500/15 text-emerald-300",
    amber: "bg-amber-500/15 text-amber-300",
    violet: "bg-violet-500/15 text-violet-300",
    blue: "bg-blue-500/15 text-blue-300",
    red: "bg-rose-500/15 text-rose-300",
    slate: "bg-white/[0.07] text-white/70",
  };
  return <span className={`px-2 py-0.5 rounded-md text-[9px] font-semibold whitespace-nowrap ${tones[tone]}`}>{children}</span>;
}

const payTone = (p: string) =>
  p === "Cash" ? "green" : p === "Card" ? "blue" : p === "Uber Eats" ? "violet" : p === "PickMe" ? "amber" : "slate";

function Btn({ children, primary, onDemo }: { children: ReactNode; primary?: boolean; onDemo: () => void }) {
  return (
    <button
      type="button"
      onClick={onDemo}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-colors ${
        primary ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-500" : "bg-[#12121f] border-white/10 text-white/80 hover:bg-white/[0.06]"
      }`}
    >
      {children}
    </button>
  );
}

function Table({ head, rows, empty }: { head: string[]; rows: ReactNode[][]; empty?: string }) {
  return (
    <div className="text-[10px]">
      <div className="grid px-3 py-2 text-[8px] uppercase tracking-wider text-white/35 font-semibold" style={{ gridTemplateColumns: `repeat(${head.length}, minmax(0,1fr))` }}>
        {head.map((h, i) => <span key={h} className={i === head.length - 1 ? "text-right" : ""}>{h}</span>)}
      </div>
      {rows.length === 0 ? (
        <p className="text-center text-white/40 py-6 text-[11px]">{empty}</p>
      ) : (
        rows.map((r, i) => (
          <div key={i} className="grid items-center px-3 py-2.5 border-t border-white/[0.05] text-white/80" style={{ gridTemplateColumns: `repeat(${head.length}, minmax(0,1fr))` }}>
            {r.map((c, j) => <span key={j} className={j === r.length - 1 ? "text-right" : ""}>{c}</span>)}
          </div>
        ))
      )}
    </div>
  );
}

/* ─── Pages ─────────────────────────────────────────────────────────────────── */
function Dashboard({ go }: { go: (p: PageId) => void }) {
  const channels = [
    { n: "Takeaway", today: 0, o: 0, m: "LKR 4,000.00 · 2 orders" },
    { n: "Dine-In", today: 0, o: 0, m: "LKR 33,000.00 · 12 orders" },
    { n: "PickMe", today: 0, o: 0, m: "LKR 12,000.00 · 2 orders", app: true },
    { n: "Uber Eats", today: 1000, o: 1, m: "LKR 3,000.00 · 2 orders", app: true },
  ];
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Daily Sales" sub="October 7, 2026" value={lkr(1000)} tint="bg-blue-500/20 text-blue-300" icon="↗" />
        <Stat label="Monthly Revenue" sub="Profit LKR 41,600.00" value={lkr(52000)} tint="bg-blue-500/20 text-blue-300" icon="▤" />
        <Stat label="Tables Occupied" sub="LKR 0.00 unpaid on tables" value="0 / 6" tint="bg-amber-500/20 text-amber-300" icon="▭" />
        <Stat label="Active Pre-Orders" sub="LKR 0.00 deposits held" value="0" tint="bg-violet-500/20 text-violet-300" icon="◷" />
      </div>
      <div className={`${card} p-4`}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-[12px] font-semibold text-white">Orders by Channel</p>
            <p className="text-[9px] text-white/35">Counter and delivery app orders · today and this month</p>
          </div>
          <button onClick={() => go("reports")} className="text-[10px] text-blue-400 hover:text-blue-300">View report →</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {channels.map((c) => (
            <div key={c.n} className="rounded-xl border border-white/[0.07] bg-[#0d0d18] p-3">
              <div className="flex justify-between text-[10px] font-semibold text-white/85">
                <span>{c.n}</span>
                {c.app && <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/[0.07] text-white/55">App</span>}
              </div>
              <p className="text-sm font-bold text-white mt-1.5">{lkr(c.today)}</p>
              <p className="text-[9px] text-white/35">{c.o} orders today</p>
              <p className="text-[9px] text-white/50 mt-2">This month: <b className="text-white/80">{c.m}</b></p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className={`${card} p-4`}>
          <div className="flex justify-between mb-3"><p className="text-[12px] font-semibold text-white">Top Selling Items (This Month)</p></div>
          <div className="flex items-center gap-3 rounded-xl bg-[#0d0d18] border border-white/[0.07] p-2.5">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500" />
            <div className="flex-1"><p className="text-[11px] font-semibold text-white">Cappuchino</p><p className="text-[9px] text-white/40">52 sold · LKR 52,000.00</p></div>
            <Pill tone="green">#1</Pill>
          </div>
        </div>
        <div className={`${card} p-4`}>
          <button onClick={() => go("ingredients")} className="flex justify-between w-full mb-3"><span className="text-[12px] font-semibold text-white">Stock Alerts</span><span className="text-[10px] text-blue-400">Ingredients →</span></button>
          <p className="text-center text-[10px] text-white/35 mt-6">Ingredients and ready-made items are well stocked.</p>
        </div>
        <div className={`${card} p-4`}>
          <button onClick={() => go("history")} className="flex justify-between w-full mb-3"><span className="text-[12px] font-semibold text-white">Recent Transactions</span><span className="text-[10px] text-blue-400">View all →</span></button>
          <div className="space-y-2">
            {TRANSACTIONS.map((t, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl bg-[#0d0d18] border border-white/[0.07] p-2">
                <span className="w-7 h-7 rounded-md bg-white/[0.06] text-[9px] text-white/60 flex items-center justify-center">{t.q}x</span>
                <div className="flex-1 min-w-0"><p className="text-[10px] font-bold text-white truncate">{lkr(t.amt)} <span className="font-normal text-white/45">· {t.who}</span></p><p className="text-[8px] text-white/35">{t.by}</p></div>
                <Pill tone={payTone(t.pay)}>{t.pay}</Pill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkout({ demo }: { demo: () => void }) {
  return (
    <div className="flex gap-3 h-[560px]">
      <div className="flex-1 min-w-0">
        <div className="flex gap-2 mb-3">
          <div className="px-4 py-2 rounded-xl bg-blue-600 text-white text-[10px] font-semibold">All<br /><span className="font-normal opacity-70">6 Items</span></div>
          <div className={`${card} px-4 py-2 text-[10px] text-white/80 font-semibold`}>Hot Drinks<br /><span className="font-normal text-white/40">2 Items</span></div>
          <div className={`${card} px-4 py-2 text-[10px] text-white/80 font-semibold`}>Bakery<br /><span className="font-normal text-white/40">2 Items</span></div>
        </div>
        <div className="rounded-xl border-2 border-blue-500 bg-[#0d0d18] px-4 py-2.5 text-[11px] text-white/40 mb-3">Search item or category, or scan a barcode… (Enter to add)</div>
        <div className="grid grid-cols-4 gap-3">
          {MENU.slice(0, 4).map((m) => (
            <div key={m.name} className={`${card} p-2`}>
              <div className={`h-20 rounded-lg bg-gradient-to-br ${m.grad} flex items-center justify-center text-white/80 text-xl`}>☕</div>
              <p className="text-[8px] text-blue-400 font-bold uppercase mt-2">{m.cat}</p>
              <p className="text-[11px] font-semibold text-white">{m.name}</p>
              <p className="text-[10px] font-bold text-white mt-1">{lkr(m.price)}</p>
              <div className="flex gap-1 mt-2"><button onClick={demo} className="flex-1 rounded bg-white/[0.06] text-white/60 text-[10px] py-1">−</button><button onClick={demo} className="flex-[2] rounded bg-blue-600 text-white text-[10px] py-1">+</button></div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${card} w-[250px] p-3 flex flex-col`}>
        <div className="flex justify-between items-center"><p className="text-[12px] font-semibold text-white">Current Order</p><span className="text-[9px] text-white/50 border border-white/10 rounded px-1.5 py-0.5">Drawer</span></div>
        <div className="grid grid-cols-4 gap-1.5 mt-3 text-[8px] text-center">
          {["Takeaway", "Dine-In", "PickMe", "Uber Eats"].map((c, i) => (
            <button key={c} onClick={demo} className={`rounded-lg border py-2 ${i === 0 ? "border-blue-500 bg-blue-500/10 text-white" : "border-white/10 text-white/60"}`}>{c}</button>
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-white/35 text-[10px]">
          <span className="text-2xl mb-1">🛍</span>No items yet<span className="text-[8px]">Tap an item on the menu to add it</span>
        </div>
        <div className="text-[10px] text-white/55 space-y-1 border-t border-white/[0.06] pt-2">
          <div className="flex justify-between"><span>Items</span><span>0</span></div>
          <div className="flex justify-between"><span>Subtotal</span><span>LKR 0.00</span></div>
          <div className="flex justify-between text-white font-bold text-xs"><span>Total</span><span className="text-blue-400">LKR 0.00</span></div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-3 text-[9px] text-center">
          {["Cash", "Card", "Split"].map((c, i) => <button key={c} onClick={demo} className={`rounded-lg border py-2 ${i === 0 ? "border-blue-500 bg-blue-500/10 text-white" : "border-white/10 text-white/60"}`}>{c}</button>)}
        </div>
        <button onClick={demo} className="mt-3 rounded-lg bg-blue-600/60 text-white/80 text-[10px] font-semibold py-2.5">Charge LKR 0.00</button>
      </div>
    </div>
  );
}

function Tables({ demo }: { demo: () => void }) {
  const seats = [2, 2, 4, 4, 4, 6];
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Tables" sub="22 seats in total" value="6" tint="bg-blue-500/20 text-blue-300" icon="▭" />
        <Stat label="Occupied" sub="0 unpaid · 0 paid" value="0" tint="bg-amber-500/20 text-amber-300" icon="◷" />
        <Stat label="Free" sub="Ready for customers" value="6" tint="bg-emerald-500/20 text-emerald-300" icon="✓" />
        <Stat label="Unpaid on Tables" sub="Running orders" value="LKR 0.00" tint="bg-violet-500/20 text-violet-300" icon="▤" />
      </div>
      <div className="flex justify-between items-center"><p className="text-[10px] text-white/45">Unpaid tables open their order in Checkout. Paid tables stay marked until you free them.</p><div className="flex gap-2"><Btn onDemo={demo}>↻ Refresh</Btn><Btn onDemo={demo}>Cafe Details</Btn><Btn primary onDemo={demo}>+ Add Table</Btn></div></div>
      <div className="grid grid-cols-4 gap-3">
        {seats.map((s, i) => (
          <div key={i} className={`${card} p-3`}>
            <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 flex items-center justify-center text-xs">▭</span><div className="flex-1"><p className="text-[12px] font-semibold text-white">Table {i + 1}</p><p className="text-[9px] text-white/40">{s} seats</p></div><Pill tone="green">Free</Pill></div>
            <p className="text-[9px] text-white/35 mt-3 mb-5">No open order.</p>
            <button onClick={demo} className="w-full rounded-lg border border-blue-500/50 text-blue-400 text-[10px] font-semibold py-1.5">Start Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Preorders() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Active Pre-Orders" sub="Waiting for pickup" value="0" tint="bg-blue-500/20 text-blue-300" icon="▤" />
        <Stat label="Overdue Pickups" sub="Past pickup date" value="0" tint="bg-rose-500/20 text-rose-300" icon="!" />
        <Stat label="Deposits Held" sub="Advance payments" value="LKR 0.00" tint="bg-emerald-500/20 text-emerald-300" icon="▣" />
        <Stat label="Balance to Collect" sub="On active pre-orders" value="LKR 0.00" tint="bg-amber-500/20 text-amber-300" icon="▭" />
      </div>
      <div className={`${card} p-4`}>
        <div className="flex gap-2 mb-3 text-[10px]"><span className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold">Active Pre-Orders 0</span><span className="px-3 py-1 rounded-md border border-white/10 text-white/70">Overdue 0</span><span className="px-3 py-1 rounded-md border border-white/10 text-white/70">Completed History 0</span></div>
        <Table head={["Customer & Ref", "Pickup Date", "Financials", "Status", "Actions"]} rows={[]} empty="No active reservations found." />
      </div>
    </div>
  );
}

function MenuItems({ demo }: { demo: () => void }) {
  return (
    <div className="flex gap-3">
      <div className={`${card} w-[190px] p-3 self-start text-[10px] text-white/70 space-y-3`}>
        <p className="text-xs font-semibold text-white">Filters</p>
        <div><p className="text-[9px] mb-1">Availability</p><div className="flex gap-1 flex-wrap"><span className="px-2 py-0.5 rounded bg-blue-600 text-white">All 6</span><span className="px-2 py-0.5 rounded border border-white/10">Available 6</span><span className="px-2 py-0.5 rounded border border-white/10">Low 0</span></div></div>
        <div><p className="text-[9px] mb-1">Type</p><div className="rounded-lg border border-white/10 bg-[#0d0d18] px-2 py-2">Type: All</div></div>
        <div><p className="text-[9px] mb-1">Category</p><div className="rounded-lg border border-white/10 bg-[#0d0d18] px-2 py-2">Category: All</div></div>
        <button onClick={demo} className="w-full rounded-lg border border-blue-500/50 text-blue-400 font-semibold py-2">Reset Filters</button>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-3"><p className="text-[10px] text-white/55">6 of 6 menu items</p><div className="flex gap-2"><div className="rounded-lg border border-white/10 bg-[#0d0d18] px-3 py-1.5 text-[10px] text-white/35 w-48">Search name, category or barcode…</div><Btn primary onDemo={demo}>+ Add Menu Item</Btn></div></div>
        <div className="grid grid-cols-3 gap-3">
          {MENU.map((m) => (
            <div key={m.name} className={`${card} p-2`}>
              <div className={`h-24 rounded-lg bg-gradient-to-br ${m.grad} relative flex items-center justify-center text-2xl text-white/80`}>☕<span className="absolute top-1.5 left-1.5 text-[8px] px-1.5 py-0.5 rounded bg-black/40 text-white">{m.cat}</span></div>
              <p className="text-[11px] font-semibold text-white mt-2">{m.name}</p>
              <div className="flex justify-between items-end mt-2"><Pill tone="green">~{m.servings} servings</Pill><div className="text-right"><p className="text-[8px] text-white/35">Cost LKR {m.cost}</p><p className="text-[11px] font-bold text-white">{lkr(m.price)}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Simple({ head, rows, action, demo }: { head: string[]; rows: ReactNode[][]; action?: string; demo: () => void }) {
  return (
    <div className={`${card} p-4`}>
      {action && <div className="flex justify-end mb-3"><Btn primary onDemo={demo}>{action}</Btn></div>}
      <Table head={head} rows={rows} />
    </div>
  );
}

function Notifications() {
  const items = [
    ["Low stock", "Chocolate Syrup is below the reorder level (2.1 / 2 Litre).", "amber", "2h ago"],
    ["GRN received", "20 Litre of Milk received from Ceylon Dairy Co.", "green", "Oct 7"],
    ["Wastage logged", "0.4 Litre of Milk written off by Pakaya.", "red", "Oct 5"],
  ] as const;
  return (
    <div className="space-y-2.5">
      {items.map(([t, d, tone, w]) => (
        <div key={t} className={`${card} p-3.5 flex items-center gap-3`}><Pill tone={tone}>{t}</Pill><p className="flex-1 text-[11px] text-white/75">{d}</p><span className="text-[9px] text-white/35">{w}</span></div>
      ))}
    </div>
  );
}

function StockControl({ demo }: { demo: () => void }) {
  return (
    <div className="flex gap-3">
      <div className={`${card} flex-1 p-4 space-y-3`}>
        <p className="text-[9px] text-white/45">Transaction Type</p>
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          {[["GRN — Stock In", "Receive stock from a supplier", true], ["PRN — Stock Out", "Return stock to a supplier", false], ["Wastage", "Write off expired or unsold stock", false]].map(([a, b, on]) => (
            <button key={String(a)} onClick={demo} className={`rounded-xl border p-3 text-left ${on ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-[#0d0d18]"}`}><p className="font-semibold text-white">{a}</p><p className="text-[8px] text-white/40">{b}</p></button>
          ))}
        </div>
        <div><p className="text-[9px] text-white/45 mb-1">Supplier *</p><div className="rounded-lg border border-white/10 bg-[#0d0d18] px-3 py-2 text-[10px] text-white/35">Type to search supplier…</div></div>
        <div><p className="text-[9px] text-white/45 mb-1">Notes</p><div className="rounded-lg border border-white/10 bg-[#0d0d18] px-3 py-2 h-16 text-[10px] text-white/35">Add transaction notes…</div></div>
        <div><p className="text-[9px] text-white/45 mb-1">Add Items</p><div className="rounded-lg border border-white/10 bg-[#0d0d18] px-3 py-2 text-[10px] text-white/35">Search ingredient or item, or scan a barcode…</div></div>
      </div>
      <div className={`${card} w-[340px] p-4 flex flex-col`}>
        <div className="flex justify-between"><p className="text-xs font-semibold text-white">Current Transaction</p><Pill tone="green">GRN</Pill></div>
        <div className="flex-1 flex flex-col items-center justify-center text-white/35 text-[10px] py-16"><span className="text-2xl">▣</span>Transaction is empty.</div>
        <div className="flex justify-between items-center mb-3"><span className="text-[10px] text-white/55">Total Value</span><span className="text-lg font-bold text-blue-400">LKR 0.00</span></div>
        <button onClick={demo} className="rounded-lg bg-blue-600 text-white text-[11px] font-semibold py-2.5">Confirm GRN</button>
      </div>
    </div>
  );
}

function StockHistory() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Purchases (GRN)" sub="1 entries" value="LKR 20,000.00" tint="bg-emerald-500/20 text-emerald-300" icon="↓" />
        <Stat label="Supplier Returns (PRN)" sub="0 entries" value="LKR 0.00" tint="bg-rose-500/20 text-rose-300" icon="↑" />
        <Stat label="Wastage Written Off" sub="2 entries" value="LKR 1,400.00" tint="bg-amber-500/20 text-amber-300" icon="🗑" />
      </div>
      <div className={`${card} p-4`}>
        <Table
          head={["Date & Time", "Type", "Supplier", "Item", "Qty", "Rate (LKR)", "Value"]}
          rows={STOCK_HISTORY.map((r) => [
            <span key="d">{r[0]}<br /><span className="text-white/35 text-[8px]">{r[1]}</span></span>,
            <Pill key="t" tone={r[2] === "Wastage" ? "amber" : "green"}>{r[2]}</Pill>, r[3],
            <span key="i">{r[4]} <Pill tone="violet">ingredient</Pill></span>, r[5], r[6], <b key="v" className="text-white">{r[7]}</b>,
          ])}
        />
      </div>
    </div>
  );
}

function CheckoutHistory() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Total Invoices" sub="All time" value="18" tint="bg-blue-500/20 text-blue-300" icon="▤" />
        <Stat label="Today's Invoices" sub="LKR 1,000.00" value="1" tint="bg-emerald-500/20 text-emerald-300" icon="◷" />
        <Stat label="Net Revenue" sub="After returns" value="LKR 52,000.00" tint="bg-violet-500/20 text-violet-300" icon="▣" />
        <Stat label="Refunded" sub="0 invoices" value="LKR 0.00" tint="bg-rose-500/20 text-rose-300" icon="↺" />
      </div>
      <div className={`${card} p-4`}>
        <div className="flex gap-2 mb-2 text-[10px]">{["All 18", "Cash 13", "Card 1", "Split 0", "PickMe / Uber 4", "With Returns 0"].map((t, i) => <span key={t} className={`px-3 py-1 rounded-md ${i === 0 ? "bg-blue-600 text-white font-semibold" : "border border-white/10 text-white/70"}`}>{t}</span>)}</div>
        <Table
          head={["Date & Time", "Invoice No", "Cashier", "Order", "Net Items", "Payment", "Net Total"]}
          rows={INVOICES.map((r) => [
            <span key="d">{r[0]}<br /><span className="text-white/35 text-[8px]">{r[1]}</span></span>,
            <span key="n" className="font-mono text-[9px]">{r[2]}</span>, r[3],
            <span key="o"><Pill tone={r[4] === "Dine-In" ? "amber" : "slate"}>{r[4]}</Pill>{r[5] && <span className="text-[8px] text-white/40 ml-1">{r[5]}</span>}</span>,
            `${r[6]} items`, <Pill key="p" tone={payTone(r[7])}>{r[7]}</Pill>, <b key="t" className="text-white">{lkr(r[8])}</b>,
          ])}
        />
      </div>
    </div>
  );
}

function Returns() {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Stat label="Total Returns" sub="All time" value="0" tint="bg-rose-500/20 text-rose-300" icon="↺" />
        <Stat label="Total Cash Refunded" sub="All time" value="LKR 0.00" tint="bg-amber-500/20 text-amber-300" icon="▣" />
        <Stat label="Returns This Month" sub="LKR 0.00" value="0" tint="bg-violet-500/20 text-violet-300" icon="▤" />
      </div>
      <div className={`${card} p-4`}>
        <p className="text-xs font-semibold text-white">Returns Audit Log</p>
        <p className="text-[9px] text-white/35 mb-2">Secure record of all cash refunded and items restocked</p>
        <Table head={["Refund Date & Time", "Original Invoice No", "Processed By", "Returned Items", "Total Cash Refunded"]} rows={[]} empty="No returns have been processed yet." />
      </div>
    </div>
  );
}

function Reports({ demo }: { demo: () => void }) {
  const [tab, setTab] = useState("Revenue Report");
  const [range, setRange] = useState("This Month");
  const slices = [
    { c: "#f59e0b", n: "Cash", v: 35000, p: 67 },
    { c: "#2563eb", n: "PickMe", v: 12000, p: 23 },
    { c: "#10b981", n: "Uber Eats", v: 3000, p: 6 },
    { c: "#8b5cf6", n: "Card", v: 2000, p: 4 },
  ];
  let acc = 0;
  const gradient = slices.map((s) => { const from = acc; acc += s.p; return `${s.c} ${from}% ${acc}%`; }).join(", ");
  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 text-[10px]">{["Revenue Report", "Ingredients & Categories", "Pre-Order Report", "Staff Report", "Audit Trail"].map((t) => <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded-md ${tab === t ? "bg-blue-600 text-white font-semibold" : "border border-white/10 text-white/70"}`}>{t}</button>)}</div>
      <div className="flex justify-between">
        <div className="flex gap-1.5 text-[10px]">{["Today", "Yesterday", "This Month", "Last Month", "This Year", "Custom"].map((t) => <button key={t} onClick={() => setRange(t)} className={`px-3 py-1 rounded-md ${range === t ? "bg-blue-600 text-white font-semibold" : "border border-white/10 text-white/70"}`}>{t}</button>)}</div>
        <div className="flex gap-2"><Btn onDemo={demo}>↻ Refresh</Btn><Btn onDemo={demo}>Export CSV</Btn><Btn primary onDemo={demo}>Export PDF</Btn></div>
      </div>
      <div className="flex gap-3">
        <Stat label="Gross Revenue" sub="This Month (October 2026)" value="LKR 52,000.00" tint="bg-blue-500/20 text-blue-300" icon="↗" />
        <Stat label="Total Cash Refunded" sub="Returns in this period" value="- LKR 0.00" tint="bg-rose-500/20 text-rose-300" icon="↺" />
        <Stat label="Net Profit" sub="80.0% margin · COGS LKR 10,400.00" value="LKR 41,600.00" tint="bg-emerald-500/20 text-emerald-300" icon="∿" />
        <Stat label="Units Sold" sub="1 different items" value="52" tint="bg-violet-500/20 text-violet-300" icon="☕" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`${card} p-4`}>
          <p className="text-xs font-semibold text-white">Payment Breakdown</p>
          <p className="text-[9px] text-white/35 mb-3">Revenue by payment method</p>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full flex-shrink-0" style={{ background: `conic-gradient(${gradient})` }}>
              <div className="absolute inset-[18px] rounded-full bg-[#12121f] flex flex-col items-center justify-center"><span className="text-[8px] text-white/40">Total</span><span className="text-[10px] font-bold text-white">LKR 52,000.00</span></div>
            </div>
            <div className="flex-1 space-y-1.5 text-[10px]">{slices.map((s) => <div key={s.n} className="flex items-center gap-2 text-white/75"><span className="w-2 h-2 rounded-full" style={{ background: s.c }} /><span className="flex-1">{s.n}</span><b className="text-white">{lkr(s.v)}</b><span className="text-white/35">({s.p}%)</span></div>)}</div>
          </div>
        </div>
        <div className={`${card} p-4`}>
          <p className="text-xs font-semibold text-white">Top 10 Selling Items</p>
          <p className="text-[9px] text-white/35 mb-3">Ranked by net revenue</p>
          <div className="flex items-end gap-3 h-28 border-l border-b border-white/10 pl-3">
            <div className="w-14 h-full rounded-t bg-blue-600" /><div className="w-14 h-[38%] rounded-t bg-blue-600/60" /><div className="w-14 h-[24%] rounded-t bg-blue-600/40" />
          </div>
          <div className="flex gap-3 pl-3 mt-1 text-[8px] text-white/40"><span className="w-14">Cappuchino</span><span className="w-14">Iced Latte</span><span className="w-14">Espresso</span></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shell ─────────────────────────────────────────────────────────────────── */
function Shell({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<PageId>("dashboard");
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const bodyRef = useRef<HTMLDivElement>(null);

  const demo = () => {
    setToast(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 2200);
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }); }, [page]);

  const navBtn = (n: (typeof NAV)[number]) => (
    <button key={n.id} onClick={() => setPage(n.id)} className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[11px] text-left transition-colors ${page === n.id ? "bg-blue-500/15 text-white border border-blue-500/40" : "text-white/60 border border-transparent hover:bg-white/[0.04]"}`}>
      <span className="w-4 text-center text-[11px] opacity-80">{n.icon}</span>{n.label}
    </button>
  );

  const [title, sub] = TITLES[page];
  const views: Record<PageId, ReactNode> = {
    dashboard: <Dashboard go={setPage} />,
    checkout: <Checkout demo={demo} />,
    tables: <Tables demo={demo} />,
    preorders: <Preorders />,
    menu: <MenuItems demo={demo} />,
    ingredients: <Simple demo={demo} action="+ Add Ingredient" head={["Ingredient", "Unit", "In stock", "Reorder level", "Status"]} rows={INGREDIENTS.map((r) => [<b key="n" className="text-white">{r[0]}</b>, r[1], r[2], r[3], <Pill key="s" tone={r[4] === "OK" ? "green" : "amber"}>{r[4]}</Pill>])} />,
    suppliers: <Simple demo={demo} action="+ Add Supplier" head={["Supplier", "Location", "Phone", "Total purchased"]} rows={SUPPLIERS.map((r) => [<b key="n" className="text-white">{r[0]}</b>, r[1], r[2], r[3]])} />,
    notifications: <Notifications />,
    stock: <StockControl demo={demo} />,
    stockhistory: <StockHistory />,
    history: <CheckoutHistory />,
    returns: <Returns />,
    reports: <Reports demo={demo} />,
    staff: <Simple demo={demo} action="+ Add Staff" head={["Name", "Role", "Access", "Status"]} rows={STAFF.map((r) => [<b key="n" className="text-white">{r[0]}</b>, r[1], r[2], <Pill key="s" tone={r[3] === "Active" ? "green" : "slate"}>{r[3]}</Pill>])} />,
  };

  return (
    <div className="flex h-full bg-[#0a0a14] text-white font-sans">
      <aside className="w-[170px] flex-shrink-0 border-r border-white/[0.06] flex flex-col p-3 bg-[#0c0c17]">
        <p className="text-[22px] font-light tracking-wide px-1 pb-4 pt-1">Fortechz</p>
        <nav className="space-y-0.5">{NAV.map(navBtn)}</nav>
        <p className="text-[8px] tracking-[0.15em] uppercase text-white/30 px-2.5 mt-4 mb-1.5">Admin Controls</p>
        <nav className="space-y-0.5">{ADMIN_NAV.map(navBtn)}</nav>
        <div className="mt-auto space-y-0.5 border-t border-white/[0.06] pt-2">
          <button onClick={demo} className="w-full text-left px-2.5 py-2 text-[11px] text-white/60 hover:bg-white/[0.04] rounded-lg">⎋ Close Shift</button>
          <button onClick={onLogout} className="w-full text-left px-2.5 py-2 text-[11px] text-white/60 hover:bg-white/[0.04] rounded-lg">⇥ Logout</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <div><h2 className="text-[15px] font-semibold">{title}</h2><p className="text-[10px] text-white/40">{sub}</p></div>
          <div className="flex items-center gap-2">
            <button onClick={demo} className="px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-white/80">⇥ Clock In</button>
            {["☀", "🔔", "⚙"].map((i) => <button key={i} onClick={demo} className="w-7 h-7 rounded-full bg-white/[0.06] text-[11px]">{i}</button>)}
            <div className="flex items-center gap-2 ml-2"><span className="w-7 h-7 rounded-full bg-cyan-600 text-[11px] font-bold flex items-center justify-center">A</span><div className="leading-tight"><p className="text-[10px] font-semibold">admin</p><p className="text-[8px] text-white/40">Manager</p></div></div>
          </div>
        </header>
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 pos-scroll">{views[page]}</div>
      </div>
      <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-blue-600 text-white text-[11px] font-semibold shadow-lg transition-all duration-300 ${toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}>
        Demo mode, this is a view only experience
      </div>
    </div>
  );
}

/* ─── Login + credentials notification ──────────────────────────────────────── */
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

  const input = "w-full rounded-lg bg-[#0d0d18] border border-white/[0.06] px-3 py-2.5 text-[12px] text-white placeholder:text-white/30 outline-none focus:border-blue-500";

  return (
    <div className="relative h-full bg-[#0a0a14] text-white flex flex-col items-center justify-center">
      <p className="text-[44px] font-light tracking-wide mb-5">Fortechz</p>
      <form onSubmit={submit} className="w-[300px] rounded-2xl bg-[#12121f] border border-white/[0.06] p-6 space-y-3">
        <div><h3 className="text-lg font-bold">Login!</h3><p className="text-[10px] text-white/40">Please enter your credentials below to continue</p></div>
        <label className="block text-[11px] font-semibold">Username
          <input className={`${input} mt-1.5 font-normal`} placeholder="Enter your username" value={user} onChange={(e) => { setUser(e.target.value); setError(""); }} autoComplete="off" />
        </label>
        <label className="block text-[11px] font-semibold">Password
          <span className="relative block mt-1.5">
            <input className={`${input} font-normal pr-9`} type={show ? "text" : "password"} placeholder="Enter your password" value={pass} onChange={(e) => { setPass(e.target.value); setError(""); }} autoComplete="off" />
            <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/45 text-xs">{show ? "🙈" : "👁"}</button>
          </span>
        </label>
        {error && <p className="text-[10px] text-rose-400">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-2.5 text-[12px] font-bold transition-colors">Login</button>
        <button type="button" onClick={() => setNotice(true)} className="w-full text-center text-[10px] text-blue-400">Need the demo credentials?</button>
      </form>

      {/* Credentials notification */}
      <div className={`absolute top-5 right-5 w-[270px] rounded-2xl border border-white/20 bg-white/[0.09] backdrop-blur-xl p-4 shadow-[0_20px_50px_-12px_rgba(12,126,255,0.55)] transition-all duration-500 ${notice ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`} role="status">
        <div className="flex justify-between items-start">
          <p className="text-[12px] font-bold">Demo credentials</p>
          <button onClick={() => setNotice(false)} aria-label="Dismiss" className="text-white/50 hover:text-white text-sm leading-none">×</button>
        </div>
        <p className="text-[10px] text-white/55 mt-1">Use these to sign in and explore the system.</p>
        <div className="mt-3 space-y-1.5 text-[11px]">
          <div className="flex justify-between rounded-lg bg-black/30 px-3 py-2"><span className="text-white/45">Username</span><b className="font-mono">{DEMO_USER}</b></div>
          <div className="flex justify-between rounded-lg bg-black/30 px-3 py-2"><span className="text-white/45">Password</span><b className="font-mono">{DEMO_PASS}</b></div>
        </div>
        <button onClick={() => { setUser(DEMO_USER); setPass(DEMO_PASS); setError(""); setNotice(false); }} className="mt-3 w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-[11px] font-semibold transition-colors">Fill them in for me</button>
      </div>
    </div>
  );
}

/* ─── Exported: scaled, glass-framed demo ───────────────────────────────────── */
export default function PosDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / DESIGN_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative mx-auto max-w-[1280px]">
      {/* ambient glow behind the glass */}
      <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(12,126,255,0.35),transparent_70%)] blur-2xl" />
      {/* glass frame */}
      <div className="relative rounded-[2rem] p-3 sm:p-4 border border-white/40 bg-white/[0.12] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(255,255,255,0.12),0_40px_90px_-20px_rgba(6,14,28,0.55),0_14px_30px_-10px_rgba(12,126,255,0.35)]">
        <div className="rounded-[1.4rem] overflow-hidden border border-black/40 shadow-[inset_0_2px_14px_rgba(0,0,0,0.7)]">
          <div ref={wrap} className="w-full relative" style={{ height: DESIGN_H * scale }}>
            <div className="absolute top-0 left-0 origin-top-left overflow-hidden" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}>
              {authed ? <Shell onLogout={() => setAuthed(false)} /> : <Login onSuccess={() => setAuthed(true)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
