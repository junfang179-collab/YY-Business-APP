import "./my.css"

/**
 * 马来西亚地区的页面集合。
 *
 * 这一目录下的页面是从 `src/` 同名文件复制出来的**独立副本**，流程和信息结构
 * 与新加坡一致，但改动互相隔离：改这里的文件不会影响新加坡页面，反之亦然。
 *
 * 共用但未复制的部分：
 * - 样式：`src/*.css` 全部共用（class 名相同），马来西亚的差异样式统一写在
 *   `src/my/my.css`，选择器统一以 `html.region-my` 开头，避免污染新加坡。
 * - 工具：`staffPhoto.ts`、`figmaCapture.ts`、`FigmaCopyBridge.tsx`、
 *   `CopyToFigmaButton.tsx`、`IpadPreview.tsx`
 */
export { default as AttendancePage } from "./AttendancePage"
export { default as EmployerPage } from "./EmployerPage"
export { default as DepartmentHomePage } from "./DepartmentHomePage"
export { default as NotificationPage } from "./NotificationPage"
export { default as ScanPage } from "./ScanPage"
export { default as RedeemPage } from "./RedeemPage"
export { default as VerifyCodePage } from "./VerifyCodePage"
export { default as CustomerFeedbackPage } from "./CustomerFeedbackPage"
export { default as ChangePasswordPage } from "./ChangePasswordPage"
export { default as BillingMethodPage } from "./BillingMethodPage"
export { default as CompanyInfoPage } from "./CompanyInfoPage"
export { default as ReviewPage } from "./ReviewPage"
export { default as WorkRecordPage } from "./WorkRecordPage"
export { default as WriteReviewPage } from "./WriteReviewPage"
export { default as BatchReviewPage } from "./BatchReviewPage"
export { default as EAttendanceListPage } from "./EAttendanceListPage"
export { default as EAttendanceDetailPage } from "./EAttendanceDetailPage"
export { default as HistoryPage } from "./HistoryPage"
export { default as HistoryDetailPage } from "./HistoryDetailPage"
export { default as LabourRequisitionPage } from "./LabourRequisitionPage"
export { default as StaffClothingPage } from "./StaffClothingPage"
export { default as StaffClothingSizePage } from "./StaffClothingSizePage"
export { default as SignUpPage } from "./SignUpPage"
export { default as ForgotPage } from "./ForgotPage"
