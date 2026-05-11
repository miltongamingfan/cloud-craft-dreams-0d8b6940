import { Wrench, Box, Crosshair } from "lucide-react";
import type { ComponentType } from "react";

export type ToolInfo = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  price: string;
  priceNote: string;
  icon: ComponentType<{ className?: string }>;
  features: { title: string; desc: string }[];
};

export const tools: ToolInfo[] = [
  {
    slug: "minecraft",
    name: "Minecraft Tools",
    tagline: "A complete utility suite for Minecraft server owners.",
    intro:
      "Everything a Minecraft admin needs in one panel — live server status pings, MOTD generators with HEX support, color-code converters, UUID and skin lookups, and a smart RAM calculator. Built by people who actually run networks, not generic web tools.",
    price: "₹49",
    priceNote: "one-time / lifetime access",
    icon: Box,
    features: [
      { title: "Server Status Checker", desc: "Ping any Minecraft Java or Bedrock server and see online players, MOTD, version, and favicon in real time." },
      { title: "MOTD Generator", desc: "Build colorful MOTDs with §-codes and HEX colors. Live preview, copy-paste ready." },
      { title: "Color Code Converter", desc: "Convert between §-codes, &-codes, MiniMessage, and HEX. Perfect for chat plugins, scoreboards, and signs." },
      { title: "UUID & Username Lookup", desc: "Find any player's UUID, name history, and skin from a username — works for cracked and premium accounts." },
      { title: "Skin Viewer & Renderer", desc: "Render any player skin in 3D. Download head, body, or full skin in HD." },
      { title: "RAM Calculator", desc: "Recommends the right -Xmx / -Xms based on player count, modpack, and view distance." },
    ],
  },
  {
    slug: "fivem",
    name: "FiveM Tools",
    tagline: "Pro utilities for FiveM server owners and developers.",
    intro:
      "Run a serious FiveM RP server without juggling 10 browser tabs. Live server status, artifact version checker, resource analyzer, txAdmin recipe builder, Steam ID converter, and a license key generator — all in one place.",
    price: "₹99",
    priceNote: "one-time / lifetime access",
    icon: Crosshair,
    features: [
      { title: "FiveM Server Status", desc: "Ping any FiveM endpoint, see live players, sv_hostname, gametype, and resources loaded." },
      { title: "Artifact Version Checker", desc: "Always know the latest recommended Linux/Windows artifact and changelog before updating." },
      { title: "Resource Analyzer", desc: "Paste a resource manifest and see dependencies, exports, and known performance issues." },
      { title: "txAdmin Recipe Builder", desc: "Generate ESX, QBCore, or vanilla recipes with your chosen frameworks, jobs, and admin packs." },
      { title: "License Key Generator", desc: "Generate fresh cfx.re server license keys without leaving the panel." },
      { title: "Steam ID Converter", desc: "Convert between Steam64, Steam32, hex, and FiveM-style identifiers." },
    ],
  },
  {
    slug: "looking-glass",
    name: "Looking Glass",
    tagline: "Test real latency from every HexoraCloud region before you order.",
    intro:
      "Pick the right datacenter the first time. Run ping, MTR, and traceroute from each of our 12+ regions straight to your IP, and download speed-test files in any size so you know exactly what you're getting.",
    price: "Free",
    priceNote: "no signup required",
    icon: Wrench,
    features: [
      { title: "Multi-region ping", desc: "Ping from US-East, US-West, EU-Central, EU-West, India, Singapore, Sydney, and São Paulo." },
      { title: "MTR / Traceroute", desc: "See every hop between us and your network. Diagnose ISP routing issues in seconds." },
      { title: "Speed test files", desc: "Direct download links to 100 MB / 1 GB / 10 GB test files in every region." },
    ],
  },
];

export const toolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
