import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class HealthCheckService {
  deployVersion() {
    const response = { version: '' };
    const commit_file = fs.readFileSync('commit-log.txt', 'utf8');
    const splitted_file = commit_file.split('\n');
    if (splitted_file.length > 0) {
      response.version = splitted_file[0];
    }
    return response;
  }
  helloWorld() {
    return {
      status: 200,
    };
  }
}
