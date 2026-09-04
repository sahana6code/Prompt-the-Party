export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  streaming?: boolean;
}

export type TicketStatus = "pending" | "active" | "done";

export interface ProgressTicket {
  id: string;
  label: string;
  detail?: string;
  status: TicketStatus;
  timestamp?: string;
}

export type FitLevel = "strong" | "good" | "stretch";

export interface VendorResult {
  id: string;
  name: string;
  priceLabel: string;
  priceNote?: string;
  customization: string;
  reasoning: string;
  fit: FitLevel;
}

export type RunPhase = "idle" | "running" | "done";
