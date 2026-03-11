import { Injectable, NotFoundException, Logger, OnModuleInit } from '@nestjs/common';
import { Sports } from 'src/sports-api/enum/sportsEnum';
import { SportsApiService } from 'src/sports-api/sports-api.service';
import { HockeyStreamDto } from './dto/hockey-stream.dto';
import { HockeyMatchDto } from './dto/hockey-match.dto';
import { NHLTeamsList } from './utils/NHLTeam';
import { CacheHelperService } from 'src/common/cache/cacheHelper.service';

@Injectable()
export class HockeyService implements OnModuleInit {
  private readonly logger = new Logger(HockeyService.name);

  constructor(
    private sportsApi: SportsApiService,
    private cacheHelperService: CacheHelperService,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Warming up hockey matches cache...');
      await this.getMatches();
      this.logger.log('Hockey cache ready.');
    } catch (e) {
      this.logger.warn('Hockey cache warmup failed, will retry on first request.');
    }
  }

  async getMatches(): Promise<HockeyMatchDto[]> {
    return this.cacheHelperService.staleWhileRevalidate(
      'hockey_matches',
      async () => {
        try {
          const matches = await this.sportsApi.getMatchesBySport(Sports.HOCKEY);
          const filteredMatches: HockeyMatchDto[] = [];
          for (const match of matches) {
            const isNHL = NHLTeamsList.some((team) =>
              match.title.toLowerCase().includes(team.toLowerCase()),
            );
            if (!isNHL) continue;
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
          this.logger.error(`Failed to fetch hockey matches: ${err.message}`);
          return [];
        }
      },
      300, // 5 minutes
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

  async getStreams(matchId: string, source: string): Promise<HockeyStreamDto[]> {
    const key = `hockey_streams_${source}_${matchId}`;
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
          this.logger.error(`Failed to fetch hockey streams [${matchId}]: ${err.message}`);
          return [];
        }
      },
      300, // 5 minutes
    );
  }
}