import type { ZodType } from "zod";

export interface DriftIssue {
  path: string;
  code: string;
  message: string;
  received: unknown;
}

export function checkDrift<T>(
  schema: ZodType<T>,
  json: unknown,
): DriftIssue[] {
  const result = schema.safeParse(json);
  if (result.success) return [];
  return result.error.issues.map((issue) => ({
    path: issue.path.length ? issue.path.join(".") : "(root)",
    code: issue.code,
    message: issue.message,
    received: dig(json, issue.path),
  }));
}

function dig(obj: unknown, path: readonly (string | number)[]): unknown {
  let cur: unknown = obj;
  for (const segment of path) {
    if (cur == null) return undefined;
    cur = (cur as Record<string | number, unknown>)[segment];
  }
  return cur;
}

export function formatDrift(endpoint: string, issues: DriftIssue[]): string {
  const lines = [
    `Schema drift in ${endpoint} (${issues.length} issue${issues.length === 1 ? "" : "s"}):`,
  ];
  for (const issue of issues) {
    lines.push(
      `  ${issue.path}: [${issue.code}] ${issue.message} — received ${JSON.stringify(issue.received)}`,
    );
  }
  return lines.join("\n");
}

export function assertNoDrift<T>(
  schema: ZodType<T>,
  endpoint: string,
  json: unknown,
): void {
  const issues = checkDrift(schema, json);
  if (issues.length > 0) {
    throw new Error(formatDrift(endpoint, issues));
  }
}
