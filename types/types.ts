export interface CardTypes {
    name: string,
    id: number,
    likes: number,
    location: string,
    experience: number,
    image: any,
    images: Images[]
    views?: number,
    userImage: any
}

export interface Images {
    id: number,
    image: any
}
