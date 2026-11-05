export type BranchDay = { isOff: boolean; open: string; close: string };

export const branchWeekdays = [
  ["mon", "Bazar ertəsi"], ["tue", "Çərşənbə axşamı"], ["wed", "Çərşənbə"],
  ["thu", "Cümə axşamı"], ["fri", "Cümə"], ["sat", "Şənbə"], ["sun", "Bazar"],
] as const;
