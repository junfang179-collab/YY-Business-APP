/**
 * 新加坡（默认地区）的页面集合。
 *
 * 与 `src/my/index.ts` 保持完全一致的导出结构，`App.tsx` 根据 URL 上的
 * `?region=my` 决定走哪一套。两套页面各自独立成文件，改马来西亚的页面
 * 不会连带改到新加坡的页面。
 */
export { default as AttendancePage } from "./AttendancePage"
export { default as EmployerPage } from "./EmployerPage"
export { default as DepartmentHomePage } from "./DepartmentHomePage"
export { default as NotificationPage } from "./NotificationPage"
export { default as ScanPage } from "./ScanPage"
export { default as VerifyCodePage } from "./VerifyCodePage"
export { default as CustomerFeedbackPage } from "./CustomerFeedbackPage"
export { default as ChangePasswordPage } from "./ChangePasswordPage"
export { default as BillingMethodPage } from "./BillingMethodPage"
export { default as CompanyInfoPage } from "./CompanyInfoPage"
export { default as ReviewPage } from "./ReviewPage"
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
