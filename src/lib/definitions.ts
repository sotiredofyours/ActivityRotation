export interface ActivityMember {
    id: number,
    name: string,
    surname: string,
    description: string,
    image: string
}

export interface Activity {
    id: number,
    title: string,
    description: string,
    period: number,
    day: number
}
