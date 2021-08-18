export type TableClickEventData<TRow extends Record<string, string>> = {
  row: number;
  column: keyof TRow;
};
