import type { CollectionEntry } from 'astro:content';

export type Goal = CollectionEntry<'goals'>;
export type GoalStatus = Goal['data']['status'];
export type GoalTerm = Goal['data']['term'];

// 這幾張對照表以前在三個頁面各寫一份,content.config.ts 一加狀態就得改三個地方。
export const STATUS_LABEL: Record<GoalStatus, string> = {
  todo: 'To do',
  doing: 'In progress',
  done: 'Done',
};

export const TERM_LABEL: Record<GoalTerm, string> = {
  short: 'Short-term',
  long: 'Long-term',
};

// 進行中的排最前面,已完成的沉到最後
const STATUS_RANK: Record<GoalStatus, number> = { doing: 0, todo: 1, done: 2 };

export function sortGoals(goals: Goal[]): Goal[] {
  return [...goals].sort(
    (a, b) =>
      STATUS_RANK[a.data.status] - STATUS_RANK[b.data.status] ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title, 'zh-Hant'),
  );
}
