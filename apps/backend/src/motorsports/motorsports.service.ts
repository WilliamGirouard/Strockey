import { Injectable, NotFoundException, Logger, OnModuleInit } from '@nestjs/common';
import { SportsApiService } from 'src/sports-api/sports-api.service';
import { MotorsportsMatchDto } from './dto/motorsports-match.dto';
import { MotorsportsStreamDto } from './dto/motorsports-stream.dto';
import { Sports } from 'src/sports-api/enum/sportsEnum';
import { CacheHelperService } from 'src/common/cache/cacheHelper.service';

@Injectable()
export class MotorSportsService implements OnModuleInit {
  private readonly logger = new Logger(MotorSportsService.name);

  constructor(
    private sportsApi: SportsApiService,
    private cacheHelperService: CacheHelperService,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Warming up motorsports matches cache...');
      await this.getMatches();
      this.logger.log('Motorsports cache ready.');
    } catch (e) {
      this.logger.warn('Motorsports cache warmup failed, will retry on first request.');
    }
  }

  async getMatches(): Promise<MotorsportsMatchDto[]> {
    return this.cacheHelperService.staleWhileRevalidate(
      'motorsports_matches',
      async () => {
        try {
          const matches = await this.sportsApi.getMatchesBySport(Sports.MOTORSPORTS);
          const filteredMatches: MotorsportsMatchDto[] = [];
          for (const match of matches) {
            if (!match.title.includes('F1') && !match.title.includes('Formula 1') && !match.title.includes('MotoGP')) {
              continue;
            }
            // ← removed per-match stream check, was causing excessive API calls
            filteredMatches.push({
              id: match.id,
              title: match.title,
              date: match.date,
              popular: match.popular,
              poster: match.poster,
              homeTeam: match.teams?.home
                ? { name: match.teams.home.name, badge: match.teams.home.badge }
                : undefined,
              awayTeam: match.teams?.away
                ? { name: match.teams.away.name, badge: match.teams.away.badge }
                : undefined,
              primarySource: match.sources?.[0],
            });
          }
          return filteredMatches;
        } catch (err) {
          this.logger.error(`Failed to fetch motorsports matches: ${err.message}`);
          return [];
        }
      },
      300,
    );
  }

  async getMatchById(matchId: string) {
    const matches = await this.getMatches();
    const match = matches.find((m) => m.id === matchId);
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    return match;
  }

  async getStreams(matchId: string, source: string): Promise<MotorsportsStreamDto[]> {
    const key = `motorsports_streams_${source}_${matchId}`;
    return this.cacheHelperService.staleWhileRevalidate(
      key,
      async () => {
        try {
          const streams = await this.sportsApi.getStreams(source, matchId);
          return streams.map((stream) => ({
            id: stream.id,
            streamNo: stream.streamNo,
            language: stream.language,
            hd: stream.hd,
            embedUrl: stream.embedUrl,
            source: stream.source,
          }));
        } catch (err) {
          this.logger.error(`Failed to fetch motorsports streams [${matchId}]: ${err.message}`);
          return [];
        }
      },
      300,
    );
  }
}