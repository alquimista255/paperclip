/**
 * AgentCorp policy reference. Not a replacement for Paperclip server auth.
 * Integrate with native approval and access-control enforcement before production.
 */
const approvalRequired = new Set([
  "production.deploy", "database.destructive", "database.migrate.production",
  "finance.transfer", "finance.payment", "legal.commit", "marketing.publish",
  "marketing.spend", "communications.bulk_send",
  "security.credentials.modify", "security.permissions.modify",
]);
const lowRisk = new Set([
  "research.read", "planning.draft", "code.edit.sandbox",
  "tests.run.sandbox", "marketing.draft", "finance.report.read",
  "project.document.write",
]);
const outbound = new Set(["marketing.publish", "communications.bulk_send"]);
export function evaluateAction(request) {
  if (!request || typeof request.action !== "string" || !request.action.trim()) {
    return { allowed: false, reason: "invalid_action" };
  }
  if (request.authenticated !== true) {
    return { allowed: false, reason: "authentication_required" };
  }
  if (!Number.isFinite(request.estimatedCost) || request.estimatedCost < 0 ||
      !Number.isFinite(request.budgetRemaining) || request.budgetRemaining < 0) {
    return { allowed: false, reason: "invalid_budget" };
  }
  if (request.estimatedCost > request.budgetRemaining) {
    return { allowed: false, reason: "budget_exceeded" };
  }
  if (!request.isPrivateProject && outbound.has(request.action)) {
    return { allowed: false, reason: "external_publication_requires_separate_policy" };
  }
  if (approvalRequired.has(request.action) && request.approved !== true) {
    return { allowed: false, reason: "owner_approval_required" };
  }
  if (!approvalRequired.has(request.action) && !lowRisk.has(request.action)) {
    return { allowed: false, reason: "unknown_action" };
  }
  return { allowed: true, reason: "approved_by_policy" };
}
