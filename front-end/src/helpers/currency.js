const formatSomeNumber = (text) => {
  if (!text) return "";
  return text.replace(/[^0-9]/g, "");
};

const currencyIntlFormatter = (casasDecimais = 2) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });

export function currencyFormatterForDinamicValues(valor, casasDecimais = 2) {
  const numeros = formatSomeNumber(valor);

  const centavos = Number(numeros) / Math.pow(10, casasDecimais);
  return currencyIntlFormatter(casasDecimais)
    .format(centavos)
    .replace("R$", "")
    .trim();
}



export function currencyFormatterForFixValues(props) {
  const { value, showR$ = false, qtyDecimal = 2 } = props;

  const formatedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: qtyDecimal,
    maximumFractionDigits: qtyDecimal,
  });

  return !showR$
    ? formatedValue.format(value).replace("R$", "").trim()
    : formatedValue.format(value);
}
