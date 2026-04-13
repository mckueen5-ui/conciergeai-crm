export type ExpertStatus = "New" | "Invited" | "Replied" | "Registered" | "Rejected";

// Map for Chinese UI labels
export const STATUS_LABEL: Record<string, string> = {
  "New": "新线索", "Invited": "已邀请", "Replied": "已回复",
  "Registered": "已注册", "Rejected": "已拒绝",
  "新线索": "新线索", "已邀请": "已邀请", "已回复": "已回复",
  "已注册": "已注册", "已拒绝": "已拒绝",
};

export interface Expert {
  id: string;
  name: string;
  phone: string;
  email: string;
  trade: string;
  location: string;
  source: string;
  status: string;
  notes: string;
  created_at: string;
}

export const STATUS_OPTIONS = ["新线索","已邀请","已回复","已注册","已拒绝"];

export const TRADES = [
  "教师/家教","水电工","律师","会计师","装修工程","水管工","电工",
  "木匠","油漆工","锁匠","园艺师","清洁工","建筑工","燃气工程师",
  "暖通技师","瓷砖工","摄影师","美容师","厨师/餐饮","健身教练","其他"
];

export const LOCATIONS = [
  "伦敦","伯明翰","曾彻斯特","诺丁汉","利兹","利物浦","谢菆尔德",
  "布里斯托","爱丁堡","格拉斯哥","卡迪夫","纽卡斯尔","莱斯特","考文垂","其他"
];

export const SOURCES = [
  "Checkatrade","Yell","Google Maps","转介绍","LinkedIn","主动联系","官网","其他"
];
