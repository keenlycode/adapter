// string tag template that return input string
function css(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export { css }
