import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsController } from './leads/leads.controller';
import { LeadsService } from './leads/leads.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, LeadsController],
  providers: [AppService, LeadsService],
})
export class AppModule {}
