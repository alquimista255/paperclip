import { test } from "node:test";
import { strict as assert } from "node:assert";
import { evaluateAction } from "./policy.mjs";
const base = { authenticated: true, budgetRemaining: 20, estimatedCost: 1, isPrivateProject: true };
test("allows safe drafts within budget", () => {
  assert.equal(evaluateAction({ ...base, action: "planning.draft" }).allowed, true);
});
test("requires owner approval for production deployment", () => {
  assert.equal(evaluateAction({ ...base, action: "production.deploy" }).reason, "owner_approval_required");
  assert.equal(evaluateAction({ ...base, action: "production.deploy", approved: true }).allowed, true);
});
test("rejects unknown actions even with approval", () => {
  assert.equal(evaluateAction({ ...base, action: "shell.execute.root", approved: true }).reason, "unknown_action");
});
test("rejects insufficient budget", () => {
  assert.equal(evaluateAction({ ...base, action: "planning.draft", estimatedCost: 21 }).reason, "budget_exceeded");
});
test("rejects unauthenticated requests", () => {
  assert.equal(evaluateAction({ ...base, action: "planning.draft", authenticated: false }).reason, "authentication_required");
});
test("blocks outbound activity without publication policy", () => {
  assert.equal(evaluateAction({ ...base, action: "marketing.publish", approved: true, isPrivateProject: false }).reason,
    "external_publication_requires_separate_policy");
});
