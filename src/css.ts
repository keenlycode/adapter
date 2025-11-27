// string tag template that return input string
function css(strings: string[], ...values: string[]) {
  return String.raw({ raw: strings }, ...values);
}

export { css }
