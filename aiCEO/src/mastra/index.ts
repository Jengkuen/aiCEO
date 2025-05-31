import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { cosAgent } from './agents/cos';
import { ctoAgent } from './agents/cto';
import { cmoAgent } from './agents/cmo';
import { cfoAgent } from './agents/cfo';
import { cooAgent } from './agents/coo';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, cosAgent, ctoAgent, cmoAgent, cfoAgent, cooAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
