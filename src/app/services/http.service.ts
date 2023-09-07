import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);

    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    console.log('gameTrailersRequest', gameTrailersRequest);

    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots_count`,
      // `https://api.rawg.io/api/games/${id}/screenshots`
    );

    gameScreenshotsRequest.subscribe((data) => {
      console.log('data', data);
    });

    return forkJoin({
      gameInfoRequest,
      // gameScreenshotsRequest,
      // gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          // screenshots: resp['gameScreenshotsRequest']?.results,
          // trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}

// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { forkJoin, Observable } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { environment as env } from 'src/environments/environment';
// import { APIResponse, Game } from '../models';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   constructor(private http: HttpClient) { }

//   getGameList(
//     ordering: string,
//     search?: string
//   ): Observable<APIResponse<Game>> {
//     let params = new HttpParams().set('ordering', ordering);

//     if (search) {
//       params = new HttpParams().set('ordering', ordering).set('search', search);
//     }

//     return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
//       params: params,
//     });
//   }

//   getGameDetails(id: string): Observable<Game> {
//     const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
//     // const gameTrailersRequest = this.http.get(
//     //   `${env.BASE_URL}/games/${id}/movies`
//     // );
//     // const gameScreenshotsRequest = this.http.get(
//     //   `${env.BASE_URL}/games/f59f37e98a6b412cb6259f57e7067650/${id}/short_screenshots`
//     // );

//     return forkJoin({
//       gameInfoRequest,
//       // gameScreenshotsRequest,
//       // gameTrailersRequest,
//     }).pipe(
//       map((resp: any) => {
//         return {
//           ...resp['gameInfoRequest'],
//           // screenshots: resp['gameScreenshotsRequest']?.results,
//           // trailers: resp['gameTrailersRequest']?.results,
//         };
//       })
//     );
//   }

// }
