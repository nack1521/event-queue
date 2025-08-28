import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Injectable } from "@nestjs/common";

export const STOCK_QUEUE = 'stockQueue';

@Injectable()
export class StockQueue {
    constructor(@InjectQueue(STOCK_QUEUE) public readonly q: Queue) {
        console.log(`StockQueue initialized with queue: ${STOCK_QUEUE}`);
        
        // Add these debug logs
        this.q.on('waiting', (job) => console.log('Job is waiting:', job.id));
        this.q.on('error', (err) => console.error('Job failed:', err));
    }
}