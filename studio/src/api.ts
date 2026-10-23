export type Json =
  null | boolean | number | string | Json[] | { [key: string]: Json };
export type Dictionary = Record<string, Json>;
export interface Translation {
  locale: string;
  field: string;
  value: string | string[];
  source_hash: string;
}
export interface Body {
  title: string;
  summary: string;
  payload: Dictionary;
  attachments: Dictionary;
}
export interface Entry {
  key: string;
  kind: string;
  identifier: string;
  canonical_path: string;
  collection_path: string;
  owner: "git" | "database";
  head_revision_id: string;
  schema_version: number;
  state: string;
  body: Body;
  content_digest: string;
  created_by: string | null;
  created_at: string;
  parent_id: string | null;
  review_note: string | null;
  validated: boolean;
}
export interface Revision {
  id: string;
  entry_key: string;
  kind: string;
  schema_version: number;
  parent_id: string | null;
  body: Body;
  content_digest: string;
  state: string;
  created_by: string | null;
  created_at: string;
  review_note: string | null;
  reviewed_by: string | null;
  validated: boolean;
  translations: Translation[];
}
export interface Session {
  configured?: boolean;
  signedIn: boolean;
  user?: { id: string; email: string };
  role?: string;
  csrf?: string;
  missing?: string[];
}
export interface Schema {
  type?: string | string[];
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
  enum?: Json[];
  const?: Json;
  anyOf?: Schema[];
  format?: string;
  "x-media-type"?: "image" | "video";
  description?: string;
  minLength?: number;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
}
export interface Contracts {
  kinds: Record<
    string,
    {
      label: string;
      owner: "database" | "git";
      schemaVersion: number;
      validatorKey: string;
    }
  >;
  forms: Record<
    string,
    {
      payload: Schema;
      attachments: Schema;
      titleField: string;
      summaryField: string;
      identityFields: string[];
    }
  >;
  schemas: { kind: string; version: number; enabled_for_writes: boolean }[];
  translatable: Record<string, string[]>;
  locales: string[];
  limitations: string;
}
export interface Issue {
  key?: string;
  field: string;
  message: string;
}
export class ApiError extends Error {
  status: number;
  code: string;
  issues: Issue[];
  constructor(
    status: number,
    code: string,
    message: string,
    issues: Issue[] = [],
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.issues = issues;
  }
}
export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown; csrf?: string; file?: File } = {},
): Promise<T> {
  const response = await fetch(`/api${path}`, {
    method: options.method || "GET",
    credentials: "same-origin",
    headers: {
      ...(options.body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...(options.csrf ? { "X-CSRF-Token": options.csrf } : {}),
    },
    body:
      options.file ||
      (options.body !== undefined ? JSON.stringify(options.body) : undefined),
  });
  const value = await response.json();
  if (!response.ok)
    throw new ApiError(
      response.status,
      value.error?.code || "unknown",
      value.error?.message || "Request failed",
      value.error?.issues || [],
    );
  return value;
}
export async function sourceHash(value: Json | undefined) {
  const bytes = new TextEncoder().encode(JSON.stringify(value ?? null));
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
export const fieldId = (path: string) =>
  "field-" + encodeURIComponent(path).replaceAll("%", "_");
export { labelFor } from "./field-labels";
