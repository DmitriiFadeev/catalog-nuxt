export interface FetchData {
  Search: Item[]
  totalResults: string
  Response: string
}

export interface Item {
  Poster: string
  Title: string
  Type: string
  Year: string
  imdbID: string
}

export interface Post {
  Title: number
  Poster: string
  Actors: string
  Country: string
  Director: string
  Language: string
  Rated: string
  Year: string
}

export interface FetchParams {
  search: string,
  page: number
}

export interface Store {
  data: Item[]
  post: null | Post
  load: boolean
}
