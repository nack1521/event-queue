import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ClientSession } from 'mongoose';
import { AppliedJob } from 'src/log/schemas/applied-job.schema';
import { StockLedger } from 'src/log/schemas/stock-ledger.schema';
import { Order } from 'src/orders/schemas/order.shema';
import { ReservePacking } from 'src/reserve-packing/schemas/reserve-packing.schema';
import { WarehouseStock } from 'src/warehouse-stock/schemas/warehouse-stock.schema';

@Injectable()
export class StockService {
    constructor(
        @InjectConnection() private readonly conn: Connection,
        @InjectModel(Order.name) private readonly orderModel: Model<Order>,
        @InjectModel(WarehouseStock.name) private readonly warehouseStockModel: Model<WarehouseStock>,
        @InjectModel(ReservePacking.name) private readonly reservePackingModel: Model<ReservePacking>,
        @InjectModel(StockLedger.name) private readonly stockLedgerModel: Model<StockLedger>,
        @InjectModel(AppliedJob.name) private readonly appliedJobModel: Model<AppliedJob>,
    ) {}

    private async idempotentGuard(session: ClientSession, key: string,jobId: string) {
        try{
            await this.appliedJobModel.create([{ key, jobId }], { session });
        }
        catch (e: any) {
            // Handle error (e.g., log it)
            if (e?.code === 11000) {
                // Duplicate key error
                return false;
            }
            throw e;
        }

        return true;
    }

    async applyOnShipped({ orderId, lines, version }: any) {
    const key = `on-shipped:${orderId}:${version}`;
    return this.conn.withSession(async (session) =>
      session.withTransaction(async () => {
        if (!(await this.idempotentGuard(session, key, key))) return { skipped: true };

        for (const { sku, qty, warehouseId } of lines) {
          // ลด reserved และ onHand 
          await this.warehouseStockModel.updateOne(
            { sku, warehouseId },
            { $inc: { reserved: -qty, onHand: -qty } },
            { session },
          );
          await this.reservePackingModel.deleteMany({ orderId, sku, warehouseId }, { session });
          await this.stockLedgerModel.create([{ orderId, sku, qty: -qty, type: 'SHIP', warehouseId }], { session });
        }

        await this.orderModel.updateOne(
          { _id: orderId, status: { $in: ['packed','shipped'] } },
          { $set: { status: 'shipped', version } },
          { session },
        );
        return { ok: true };
      }),
    );
  }

  async applyOnComplete({ orderId, lines, version }: any) {
    const key = `on-complete:${orderId}:${version}`;
    return this.conn.withSession(async (session) =>
      session.withTransaction(async () => {
        if (!(await this.idempotentGuard(session, key, key))) return { skipped: true };

        for (const { sku, qty, warehouseId } of lines) {
          await this.stockLedgerModel.create([{ orderId, sku, qty: -qty, type: 'COMPLETE', warehouseId }], { session });
        }

        await this.orderModel.updateOne(
          { _id: orderId, status: { $in: ['shipped','complete'] } },
          { $set: { status: 'complete', version } },
          { session },
        );
        return { ok: true };
      }),
    );
  }

}