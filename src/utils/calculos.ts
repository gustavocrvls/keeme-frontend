function calcularProgresso(total: number, completado: number) {
  return completado < total ? (100 * completado) / total : 100;
}
export { calcularProgresso };
