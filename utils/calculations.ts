function calculateProgress(total: number, completed: number): number {
  return completed < total ? (100 * completed) / total : 100;
}

export { calculateProgress };
