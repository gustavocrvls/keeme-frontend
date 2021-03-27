export function cpfMask(cpf: string): string {
  const maskedCPF = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    (regex, arg1, arg2, arg3, arg4) => {
      return `${arg1}.${arg2}.${arg3}-${arg4}`;
    },
  );
  return maskedCPF;
}
