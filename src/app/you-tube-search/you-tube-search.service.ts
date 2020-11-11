import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchResult } from "./search-result.model";

/**
 * YouTubeService connects to the YoutTube API
 * see: https://developers.google.com/youtube/v3/docs/search/list
 */

@Injectable()
export class YouTubeService {
    constructor(
        private http: HttpClient,
        @Inject(YOUTUBE_API_KEY) private apiKey: string;
        @Inject(YOUTUBE_API_URL) private apiUrl: string;
    ) {}

    search(query: string): Observable<SearchResult[]> {
        const params: string = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=10`
        ].join('&');
        const queryUrl = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl).map(response => {
            return <any>response['Items'].map(item => {
                //console.log("raw item", item); good for debug
                return new SearchResult({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.high.url
                });
            });
        });
    }
}