import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Sports } from './enum/sportsEnum';
import { Stream } from './interfaces/stream.interface';
import { APIMatch } from './interfaces/match.interface';

@Injectable()
export class SportsApiService {
  private readonly logger = new Logger(SportsApiService.name);

  constructor(private readonly httpService: HttpService) {}

  private async get<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, { timeout: 8000 }),
      );
      return response.data;
    } catch (err) {
      this.logger.error(`External API request failed [${url}]: ${err.message}`);
      return [] as unknown as T;
    }
  }

  async getAllMatches(): Promise<APIMatch[]> {
    return this.get('https://streamed.pk/api/matches/all');
  }

  async getAllMatchesToday(): Promise<APIMatch[]> {
    return this.get('https://streamed.pk/api/matches/all-today');
  }

  async getMatchesBySport(sport: Sports): Promise<APIMatch[]> {
    return this.get(`https://streamed.pk/api/matches/${sport}`);
  }

  async getStreams(source: string, id: string): Promise<Stream[]> {
    return this.get(`https://streamed.pk/api/stream/${source}/${id}`);
  }
}