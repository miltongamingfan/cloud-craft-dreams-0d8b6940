import { Gamepad2, Box, Swords, Pickaxe, Skull, Trees, Hammer, Bot, Ship, Crosshair } from "lucide-react";
import type { ComponentType } from "react";

export type GameInfo = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  intro: string;
  startingAt: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  body: { heading: string; text: string }[];
  bullets: string[];
};

export const games: GameInfo[] = [
  {
    slug: "minecraft",
    name: "Minecraft",
    category: "Sandbox",
    tagline: "Java + Bedrock servers, modpacks, networks.",
    intro: "Power your SMP, Skyblock, modpack, or BungeeCord network on Ryzen 9 hardware tuned for Minecraft tick rates. Pterodactyl panel, one-click Forge/Fabric/Paper installs, free MySQL, automatic backups.",
    startingAt: "$2.50",
    icon: Box,
    color: "from-emerald-500 to-lime-400",
    body: [
      { heading: "Java & Bedrock supported", text: "Run Vanilla, Paper, Purpur, Forge, Fabric, NeoForge, Velocity, BungeeCord, Geyser hybrid, or Bedrock-only servers. Switch loaders any time from the panel." },
      { heading: "Modpacks pre-configured", text: "One-click installers for FTB, ATM, RLCraft, Better MC, Create-based packs, and 1,500+ CurseForge/Modrinth modpacks. Memory tuned automatically." },
      { heading: "Network ready", text: "Run BungeeCord/Velocity proxies, lobbies, and minigame backends side by side. Free internal networking between your servers — zero latency, no double bandwidth." },
    ],
    bullets: ["Ryzen 9 7950X dedicated cores", "Gen4 NVMe SSDs (7,000 MB/s)", "Free SQL databases & subdomains", "Automatic daily backups", "DDoS protection up to 1.5 Tbps", "Pterodactyl panel + sFTP"],
  },
  {
    slug: "palworld",
    name: "Palworld",
    category: "Survival",
    tagline: "Catch, breed, build — at 60 FPS for everyone.",
    intro: "Palworld eats RAM and CPU like nothing else. Our Palworld plans use AMD Ryzen 9 with 5.7 GHz boost and Gen4 NVMe so worlds save instantly and Pals don't despawn under load.",
    startingAt: "$8.50",
    icon: Gamepad2,
    color: "from-sky-500 to-cyan-400",
    body: [
      { heading: "Tuned for Pal AI", text: "We pre-configure WorldOption.sav with sane defaults: stable spawn rates, shorter day cycles for testing, and capped Pal counts that scale with player slots." },
      { heading: "Mod & save support", text: "Drop in Palworld mods, swap saves between dev and prod, schedule auto-restarts, and roll back instantly if something goes wrong." },
    ],
    bullets: ["Up to 32 player slots", "5.7 GHz Ryzen cores", "Auto save backups every hour", "One-click world swaps", "DDoS protection", "Mod support"],
  },
  {
    slug: "fivem",
    name: "FiveM / GTA V",
    category: "Roleplay",
    tagline: "ESX, QBCore, and qb-target ready RP servers.",
    intro: "Hosting an RP server is a different beast — txAdmin, MySQL, Redis, asset streaming. We bundle all of it on one optimized box with the lowest possible artifact tick variance.",
    startingAt: "$8.50",
    icon: Crosshair,
    color: "from-orange-500 to-amber-400",
    body: [
      { heading: "ESX + QBCore presets", text: "One-click recipes for ESX Legacy, QBCore, qbox, and ox_lib. We handle MySQL/Redis setup, txAdmin, and the artifact channel for you." },
      { heading: "txAdmin & SQL included", text: "Free phpMyAdmin or HeidiSQL access. Daily SQL dumps. Crash detection auto-restarts the resource without touching the OS." },
    ],
    bullets: ["txAdmin pre-installed", "MySQL + Redis included", "ESX / QBCore one-click", "64+ slot ready", "Asset streaming optimized", "Anti-crash auto-recovery"],
  },
  {
    slug: "rust",
    name: "Rust",
    category: "Survival PvP",
    tagline: "High-pop wipes, Oxide & Carbon supported.",
    intro: "Rust on day one of wipe is brutal on hardware. Our Rust plans run on Carbon by default — 40-60% faster than vanilla Oxide — and ship with Recyclr, Wipe Schedule, and Discord integration.",
    startingAt: "$10",
    icon: Skull,
    color: "from-red-500 to-rose-400",
    body: [
      { heading: "Carbon, Oxide, or Vanilla", text: "Switch frameworks per-wipe from the panel. We auto-update on Facepunch wipe day so you stay live within minutes of the patch dropping." },
      { heading: "Wipe automation", text: "Schedule monthly, biweekly, or weekly wipes. Map seed roulette, BP-only wipes, prefix swaps, Discord announcements — all built in." },
    ],
    bullets: ["Carbon framework (default)", "200+ pop ready", "Auto wipe scheduler", "Map seed manager", "Discord integration", "Recyclr & RustEdit support"],
  },
  {
    slug: "ark",
    name: "ARK: Survival",
    category: "Survival",
    tagline: "Clusters, mods, and Ascended supported.",
    intro: "Run ARK: Survival Evolved or ARK: Survival Ascended on Ryzen 9 with up to 32 GB dedicated memory per shard. Build clusters with shared transfer across maps in seconds.",
    startingAt: "$12",
    icon: Trees,
    color: "from-yellow-500 to-orange-400",
    body: [
      { heading: "ASE & ASA both supported", text: "Pick the version per-server. Cluster across maps with shared character/item transfer. Steam Workshop & CurseForge mods install in one click." },
      { heading: "Tribe-grade backups", text: "Save files backed up every 30 minutes. Roll back individual maps without touching the cluster. Auto-restart on crash." },
    ],
    bullets: ["ASE + ASA support", "Multi-map clusters", "Steam Workshop mods", "Up to 32 GB RAM per shard", "Auto-backups every 30 min", "Tribe transfer ready"],
  },
  {
    slug: "cs2",
    name: "CS2 / Counter-Strike 2",
    category: "Competitive FPS",
    tagline: "128-tick scrim & 5v5 pug servers.",
    intro: "Run private 5v5 scrims, MatchZy pugs, retake servers, and surf maps. Tick-rate locked at 128, location-pinned to your team's region for sub-10ms ping in matchmaking-grade servers.",
    startingAt: "$8",
    icon: Crosshair,
    color: "from-blue-500 to-indigo-400",
    body: [
      { heading: "Tick-locked & MatchZy ready", text: "MatchZy / Get5 pre-installed with knife round, OT logic, demo recording, and Discord webhooks for match results." },
      { heading: "Anti-cheat ready", text: "VAC + Sourcebans++ auto-installed. Optional CS-Anticheat plugin for community servers." },
    ],
    bullets: ["MatchZy / Get5 ready", "128-tick locked", "Auto demo recording", "Sourcebans++ included", "Discord match webhooks", "Custom map workshop sync"],
  },
  {
    slug: "valheim",
    name: "Valheim",
    category: "Survival",
    tagline: "Smooth co-op for up to 10 vikings.",
    intro: "Valheim's networking is famously fragile — we run it on dedicated cores with crossplay, BepInEx, and Valheim Plus pre-configured. World saves backed up every 15 minutes.",
    startingAt: "$5",
    icon: Ship,
    color: "from-cyan-500 to-teal-400",
    body: [
      { heading: "Crossplay enabled", text: "Steam + Xbox Game Pass crossplay works out of the box. World seed locking, password protection, and BepInEx mods supported." },
    ],
    bullets: ["Crossplay (Steam + Xbox)", "BepInEx pre-installed", "Valheim Plus support", "10-player slots", "Auto-restart on crash", "World backups every 15 min"],
  },
  {
    slug: "terraria",
    name: "Terraria",
    category: "Sandbox 2D",
    tagline: "tShock & TModLoader, big worlds, no lag.",
    intro: "Run vanilla Terraria, tShock for plugins, or TModLoader for the Calamity / Thorium / FargosMutant treatment. Master Mode worlds, expert difficulty, and 8-player co-op all included.",
    startingAt: "$3",
    icon: Pickaxe,
    color: "from-green-500 to-emerald-400",
    body: [
      { heading: "tShock & mods", text: "Auto-install tShock, TModLoader, or vanilla. Calamity, Thorium, Fargo's Mutant, and 100+ TModLoader mods supported." },
    ],
    bullets: ["tShock + plugins", "TModLoader support", "Calamity / Thorium ready", "Master Mode worlds", "8-player co-op", "Daily backups"],
  },
  {
    slug: "garrys-mod",
    name: "Garry's Mod",
    category: "Sandbox",
    tagline: "DarkRP, TTT, sandbox, prop hunt.",
    intro: "GMod still rules sandbox. Run DarkRP, TTT, prop hunt, or pure sandbox with workshop addons auto-synced from a collection ID. ULX, ULib, and FastDL pre-configured.",
    startingAt: "$4",
    icon: Hammer,
    color: "from-orange-500 to-red-400",
    body: [
      { heading: "Workshop sync", text: "Drop a Workshop collection ID and addons sync to clients automatically. FastDL via our CDN keeps join times under 30 seconds." },
    ],
    bullets: ["Workshop auto-sync", "FastDL CDN included", "ULX + ULib", "DarkRP / TTT presets", "32+ slots", "Anti-crash"],
  },
  {
    slug: "satisfactory",
    name: "Satisfactory",
    category: "Factory",
    tagline: "Build sprawling factories with friends.",
    intro: "Dedicated Satisfactory servers with up to 8 GB RAM per save. Auto-update on Coffee Stain patch days, save rollback, and SMM mod-loader pre-installed.",
    startingAt: "$7",
    icon: Bot,
    color: "from-amber-500 to-yellow-400",
    body: [
      { heading: "SMM mods ready", text: "Satisfactory Mod Manager pre-installed. Drop a save file and rejoin within seconds." },
    ],
    bullets: ["Up to 8 GB RAM", "SMM mod loader", "Auto-update on patch", "Save rollback", "Up to 8 players", "DDoS protection"],
  },
  {
    slug: "7-days-to-die",
    name: "7 Days to Die",
    category: "Survival Horror",
    tagline: "Horde nights for up to 16 survivors.",
    intro: "7DTD is one of the most CPU-hungry games on the market. Our plans dedicate 4+ Ryzen cores per server so horde nights stay smooth even with 16 players online.",
    startingAt: "$8",
    icon: Skull,
    color: "from-zinc-500 to-stone-400",
    body: [
      { heading: "Mod packs supported", text: "Darkness Falls, Undead Legacy, Rebirth, and War of the Walkers — one-click installs. Save backups every horde night." },
    ],
    bullets: ["4+ dedicated Ryzen cores", "16-player slots", "Mod packs in one click", "Horde night save backups", "Random world gen", "Auto-restart"],
  },
  {
    slug: "project-zomboid",
    name: "Project Zomboid",
    category: "Survival Horror",
    tagline: "32-player apocalypse, mod-friendly.",
    intro: "Run a long-running Zomboid sandbox with mods, custom sandbox settings, safehouses, and faction support. Workshop mods auto-update, saves backed up nightly.",
    startingAt: "$5",
    icon: Skull,
    color: "from-rose-500 to-red-400",
    body: [
      { heading: "Workshop sync", text: "Mods stay in sync with the Workshop automatically. Whitelisting, safehouses, and admin tools accessible from the panel." },
    ],
    bullets: ["Workshop sync", "32-player slots", "Whitelist & admin tools", "Safehouse plugins", "Nightly backups", "Custom sandbox presets"],
  },
];

export const gameBySlug = (slug: string) => games.find((g) => g.slug === slug);
