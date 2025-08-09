export type TripInfo = {
  // 出发时间
  startTime: string;
  // 出发地点
  from: string;
  // 到达地点
  to: string;
  // 总里程
  allMileage: number;
  // 花费时间
  spendTime: number;
  // 平均速度
  average?: string;
  // 最大速度
  maxSpend?: string;
  // 预估油费
  expectedOil?: number;
};
export type TripFormType = { mapInfo: TripInfo[] };
export type TripProcessStatus = {
  isEdit: boolean;
  isFillMapDate: boolean;
  isView: boolean;
  isInfoOpen: boolean;
};
export type MapProcessStatusItem = {
  [K in keyof TripProcessStatus]?: TripProcessStatus[K];
};
