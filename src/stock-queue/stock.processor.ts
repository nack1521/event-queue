import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { STOCK_QUEUE } from "./stock.queue";
import { StockService } from "./stock.service";

@Processor(STOCK_QUEUE, { concurrency: 1 })
export class StockProcessor extends WorkerHost {
    constructor(private readonly stockService: StockService) {
        super();
    }

    async process(job: Job<any>): Promise<any> {
        // Process the job using the stockService
        switch (job.name) {
            case 'on-shipped':
                return this.stockService.applyOnShipped(job.data);
            case 'on-complete':
                return this.stockService.applyOnComplete(job.data);
            default:
                throw new Error(`Unknown job ${job.name}`);
        }
    }
}