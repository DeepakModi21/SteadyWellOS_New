export interface DialogData {
  icon?: string;           // Google Material icon name
  title?: string;          // Dialog title (optional)
  message: string;         // Main message (required)
  showCancel?: boolean;    // Show cancel button
  showOk?: boolean;        // Show OK button  
  cancelText?: string;     // Custom cancel button text
  okText?: string;         // Custom OK button text
  iconColor?: string;      // Custom icon color
}