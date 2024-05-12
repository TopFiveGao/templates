/**
 * @interface IDialogConfig                - el-dialog 对话框配置项封装类型
 * @property {string} title                - 对话框的标题
 * @property {string} width                - 对话框的宽度，官网默认是 '50%'
 * @property {string} height               - 对话框的高度，设置为空''，表示由内容自动撑开
 * @property {boolean} isShowing           - 对话框是否正在显示
 * @property {boolean} draggable           - 对话框的是否可拖动
 * @property {boolean} closeOnClickModal   - 点击遮罩是否关闭对话框
 * @property {boolean} closeOnPressEscape  - 点击Esc是否关闭对话框
 */
export interface IDialogConfig {
  title: string
  width: string
  height: string
  draggable: boolean
  isShowing: boolean
  closeOnClickModal: boolean
  closeOnPressEscape: boolean
}
