export type App = {
    "image": string,
    "links": AppLinks,
    "title": string,
    "description": string
}

type AppLinks = {
    "google"?: string,
    "iOS"?:string,
    "web"?:string
}