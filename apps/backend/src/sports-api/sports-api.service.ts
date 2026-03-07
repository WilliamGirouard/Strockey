import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Sports } from './enum/sportsEnum';
import { Stream } from './interfaces/stream.interface';
import { APIMatch } from './interfaces/match.interface';

@Injectable()
export class SportsApiService {
  constructor(private readonly httpService: HttpService) {}

  async getAllMatches(): Promise<APIMatch[]> {
    const response = await firstValueFrom(
      this.httpService.get('https://streamed.pk/api/matches/all'),
    );
    return response.data;
  }

  async getAllMatchesToday(): Promise<APIMatch[]> {
    const response = await firstValueFrom(
      this.httpService.get('https://streamed.pk/api/matches/all-today'),
    );
    return response.data;
  }

  async getMatchesBySport(sport: Sports): Promise<APIMatch[]> {
    const response = await firstValueFrom(
      this.httpService.get(`https://streamed.pk/api/matches/${sport}`),
    );
    return response.data;
  }

  async getStreams(source: string, id: string): Promise<Stream[]> {
    const response = await firstValueFrom(
      this.httpService.get(`https://streamed.pk/api/stream/${source}/${id}`),
    );
    return response.data;
  }
}
