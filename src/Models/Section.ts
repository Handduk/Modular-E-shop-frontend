export const sectionData : Section[] = [
    {
        id: 1,
        name: "NYHET",
        img: "IMG/produkt.jpg",
        header: "VÅRENS KAFFE",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.\
        Architecto alias atque ad perferendis id in ullam accusamus\
         eum quis dignissimos ipsum dolorum recusandae sapiente nihil numquam commodi, aliquid perspiciatis.",
        link: "/shop/coffee"
    },
    {
        id: 2,
        name: "TILLBEHOR",
        img: "IMG/press.jpg",
        header: "UTRUSTA HEMMET",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.\
        Architecto alias atque ad perferendis id in ullam accusamus\
         eum quis dignissimos ipsum dolorum recusandae sapiente nihil numquam commodi, aliquid perspiciatis.",
        link: "/shop/accessories"
    }
]

export type Section = {
    id: number,
    name: string,
    img: string,
    header: string,
    text: string,
    link: string
}