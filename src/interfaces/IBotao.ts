export default interface IBotao {
    type?: "button" | "submit" | "reset" | undefined,
    children: React.ReactNode
    onClick?: () => void,
}