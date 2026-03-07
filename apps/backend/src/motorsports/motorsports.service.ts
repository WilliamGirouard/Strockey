import { Injectable, NotFoundException } from '@nestjs/common';
import { SportsApiService } from 'src/sports-api/sports-api.service';
import { MotorsportsMatchDto } from './dto/motorsports-match.dto';
import { MotorsportsStreamDto } from './dto/motorsports-stream.dto';
import { Sports } from 'src/sports-api/enum/sportsEnum';

@Injectable()
export class MotorSportsService {
  constructor(private sportsApi: SportsApiService) {}

  async getMatches(): Promise<MotorsportsMatchDto[]> {
    const matches = await this.sportsApi.getMatchesBySport(Sports.MOTORSPORTS);

    const filteredMatches: MotorsportsMatchDto[] = [];

    for (const match of matches) {
      if (!match.title.includes('F1') && !match.title.includes('Formula 1')) {
        continue;
      }

      const streams = await this.sportsApi.getStreams(
        match.sources?.[0]?.source,
        match.id,
      );
      if (!streams || streams.length === 0) {
        continue;
      }

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
  }
  async getMatchById(matchId: string) {
    const matches = await this.getMatches();
    const match = matches.find((m) => m.id === matchId);
    if (!match) {
      throw new NotFoundException('Match not found');
    }
    return match;
  }

  async getStreams(
    matchId: string,
    source: string,
  ): Promise<MotorsportsStreamDto[]> {
    const streams = await this.sportsApi.getStreams(source, matchId);
    return streams.map((stream) => ({
      id: stream.id,
      streamNo: stream.streamNo,
      language: stream.language,
      hd: stream.hd,
      embedUrl: stream.embedUrl,
      source: stream.source,
    }));
  }
}
