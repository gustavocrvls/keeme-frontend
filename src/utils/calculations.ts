function calculateProgress(total: number, completado: number): number {
  return completado < total ? (100 * completado) / total : 100;
}

export { calculateProgress };
