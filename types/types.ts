export interface Playlist {
  collaborative: boolean
  description: string | null
  external_urls: { spotify: string }
  href: string
  id: string
  images: {
    height?: number | undefined
    url: string
    width?: number | undefined
  }[]
  name: string
  owner: {
    display_name?: string | undefined
    external_urls: { spotify: string }
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color?: null
  public: boolean | null
  snapshot_id: string
  tracks: { href: string; total: number }
  type: string
  uri: string
}
