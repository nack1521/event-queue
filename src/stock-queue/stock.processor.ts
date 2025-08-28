import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { STOCK_QUEUE } from "./stock.queue";
import { StockService } from "./stock.service";

@Processor(STOCK_QUEUE, { concurrency: 1 })
export class StockProcessor extends WorkerHost {
    constructor(private readonly stockService: StockService) {
        super();
        console.log('StockProcessor initialized');
    }

    async process(job: Job<any>): Promise<any> {
        try {
            switch (job.name) {
                case 'on-shipped':
                    console.log(`Processing on-shipped job: ${JSON.stringify(job.data)}`);
                    const result = await this.stockService.applyOnShipped(job.data);
                    console.log(`Job completed successfully: ${job.id}`);
                    return result;
                case 'on-complete':
                    return this.stockService.applyOnComplete(job.data);
                default:
                    throw new Error(`Unknown job ${job.name}`);
            }
        } catch (error) {
            console.error(`Job failed: ${job.id}`, error);
            throw error;
        }
    }
}