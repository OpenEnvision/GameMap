import type { Revision } from "./api";

export const operationMessages = {
  load: "正在载入工作区…",
  open: "正在载入修订…",
  refresh: "正在刷新目录…",
  login: "正在登录…",
  logout: "正在退出登录…",
  save: "正在保存草稿…保存成功后仍需校验，不会自动发布。",
  validate: "正在校验已保存修订并生成私有预览…",
  submit: "正在提交修订审核…",
  approve: "正在批准修订…批准不会自动上线。",
  reject: "正在退回修订…",
  "bulk-submit": "正在批量提交审核…",
  "bulk-approve": "正在批量批准修订…批准不会自动上线。",
  upload: "正在处理图片并上传至私有暂存区…",
  freeze: "正在校验集合并冻结快照…不会部署或激活。",
  sync: "正在同步文档来源索引…新修订仍需人工审核。",
} as const;
export type Operation = keyof typeof operationMessages;
export type ReviewAction = "submit" | "approve" | "reject";

// Explanations mirror the existing UI gates. Authorization remains server-side.
export function reviewBlocker({
  action,
  revisions,
  role,
  userId,
  dirty,
  note,
}: {
  action: ReviewAction;
  revisions: Pick<Revision, "state" | "validated" | "created_by">[];
  role?: string;
  userId?: string;
  dirty: boolean;
  note: string;
}): string {
  if (dirty) return "先保存或放弃本地修改，再操作已保存的修订。";
  if (!revisions.length) return "请先保存草稿，生成修订。";
  if (action === "submit") {
    if (revisions.some((revision) => revision.state !== "draft"))
      return "仅草稿修订可提交审核。";
    if (revisions.some((revision) => !revision.validated))
      return "请先完成校验，再提交审核。";
    if (
      role !== "admin" &&
      revisions.some((revision) => revision.created_by !== userId)
    )
      return "只有修订作者或管理员可提交审核。";
    return "";
  }
  if (role !== "reviewer" && role !== "admin")
    return "需要审核员或管理员权限。";
  if (revisions.some((revision) => revision.state !== "in_review"))
    return "仅待审核修订可批准或退回。";
  if (revisions.some((revision) => revision.created_by === userId))
    return "作者不能审核自己的修订。";
  if (action === "approve" && revisions.some((revision) => !revision.validated))
    return "请先完成校验，再批准修订。";
  if (!note.trim()) return "请填写审核说明，记录依据与边界。";
  return "";
}
