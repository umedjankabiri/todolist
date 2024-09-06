export type MenuButtonProps = {
    background?: string
    theme?: ThemeProps
}
type ThemeProps = {
    palette: PrimaryColorProps
}
type PrimaryColorProps = {
    primary: ColorVariantsProps
}
type ColorVariantsProps = {
    main: string,
    dark: string,
    light: string,
    contrastText: string
}
