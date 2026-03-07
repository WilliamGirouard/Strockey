import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { HockeyService } from './hockey.service';

@Controller('hockey')
export class HockeyController {
  constructor(private readonly hockeyService: HockeyService) {}

  @Get('matches')
  async getMatches() {
    return await this.hockeyService.getMatches();
  }

  @Get('matches/:matchId/streams')
  async getStreams(@Param('matchId') matchId: string) {
    const match = await this.hockeyService.getMatchById(matchId);

    if (!match.primarySource) {
      return [];
    }

    const { id, source } = match.primarySource;
    return await this.hockeyService.getStreams(id, source);
  }
}
