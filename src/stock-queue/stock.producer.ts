import { Injectable } from "@nestjs/common";
import { StockQueue } from "./stock.queue";

type StockEvent =
  | { 
        type: 'on-shipped'; 
        orderId: string; 
        lines: { 
            sku: string; 
            qty: number; 
            warehouseId: string 
        }[]; 
        version: number 
    }
  | { 
        type: 'on-complete'; 
        orderId: string; 
        lines: { 
            sku: string; 
            qty: number; 
            warehouseId: string 
        }[]; 
        version: number 
    };

@Injectable()
export class StockProducer {
    constructor(private readonly queue: StockQueue) {}

    async enqueue(event: StockEvent) {
        const jobId = `${event.type}:${event.orderId}:${event.version}`;
        await this.queue.q.add(event.type, event, { jobId });
    }
}