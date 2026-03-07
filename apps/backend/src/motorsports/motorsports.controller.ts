import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { MotorSportsService } from './motorsports.service';

@Controller('motorsports')
export class MotorSportsController {
  constructor(private readonly motorsportsService: MotorSportsService) {}

  @Get('matches')
  async getMatches() {
    return await this.motorsportsService.getMatches();
  }

  @Get('matches/:matchId/streams')
  async getStreams(@Param('matchId') matchId: string) {
    const match = await this.motorsportsService.getMatchById(matchId);

    if (!match.primarySource) {
      throw new NotFoundException('Match or primary source not found');
    }

    const { id, source } = match.primarySource;
    return await this.motorsportsService.getStreams(id, source);
  }
}
