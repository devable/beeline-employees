export const isValidCyrLetters = {
    try: target => /^[а-яёА-ЯЁ]*$/.test(target),
    errorMessage: 'Only cyrillic letters are allowed.'
}

export const isValidNumber = {
    try: target => /^[0-9+]*$/.test(target),
    errorMessage: 'Only numbers available.'
}

export const notNullObjectValues = {
    try: object => {
        return Object.values(object).every(value => value ? true : false)
    },
    errorMessage: 'All fields must be filled.'
}
