import { ProgressTicket, VendorResult } from "./types";

/**
 * This is the canned "agent run" the demo plays back whenever the user
 * sends a message. It stands in for a real backend: no network calls,
 * no AWS, nothing — just a scripted timeline the UI reveals over time.
 */

export const ASSISTANT_REPLY =
  "On it. I'm pulling caterers who can do a 60-person plated dinner near " +
  "Fremont on Saturday Oct 4th, with a vegetarian option and a bar package. " +
  "I'll check availability, get quotes, and bring back the ones worth a call.";

export const PROGRESS_SCRIPT: Omit<ProgressTicket, "status">[] = [
  {
    id: "t1",
    label: "Reading the brief",
    detail: "60 guests · Oct 4 · Fremont · vegetarian option · bar package",
  },
  {
    id: "t2",
    label: "Searching caterers",
    detail: "Cross-referencing service area, guest count, and date",
  },
  {
    id: "t3",
    label: "Contacted 6 caterers",
    detail: "Waiting on 4, 2 replied within the hour",
  },
  {
    id: "t4",
    label: "Comparing quotes",
    detail: "Normalizing per-head pricing and add-on fees",
  },
  {
    id: "t5",
    label: "Shortlist ready",
    detail: "3 vendors worth a closer look",
  },
];

export const VENDOR_RESULTS: VendorResult[] = [
  {
    id: "v1",
    name: "Copperleaf Table",
    priceLabel: "$84 / head",
    priceNote: "$5,040 for 60 guests, bar package included",
    customization:
      "Full vegetarian menu mirrors the meat entrees dish-for-dish, not a single fallback option. Can plate tableside.",
    reasoning:
      "Only caterer on the list with open Oct 4 availability and a dedicated vegetarian menu rather than a substitution. Comes in under budget with the bar included.",
    fit: "strong",
  },
  {
    id: "v2",
    name: "Harbor & Hearth Catering",
    priceLabel: "$96 / head",
    priceNote: "$5,760 for 60 guests, bar priced separately",
    customization:
      "Strong tasting-menu reputation; vegetarian option is a single fixed plate, no swaps.",
    reasoning:
      "Excellent reviews and a proven plated-dinner format at this scale, but the bar package adds roughly $900 and the vegetarian plate isn't customizable.",
    fit: "good",
  },
  {
    id: "v3",
    name: "Sable & Fig",
    priceLabel: "$71 / head",
    priceNote: "$4,260 for 60 guests, bar package included",
    customization:
      "Lowest quote on the shortlist, but they haven't run a plated service over 45 guests before.",
    reasoning:
      "Priced well below the others, which is worth a closer look — but the largest plated event in their references was 40 guests, so it's a stretch for this headcount.",
    fit: "stretch",
  },
];
