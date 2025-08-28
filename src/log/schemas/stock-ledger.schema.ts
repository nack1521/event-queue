import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StockLedgerDocument = StockLedger & Document;

export type LedgerType = 'SHIP' | 'COMPLETE' | 'ADJUST' | 'RESERVE' | 'RELEASE';

@Schema({
    timestamps: true
})
export class StockLedger {
    @Prop({ type: String, required: true })
    orderId!: string;

    @Prop({ type: String, required: true })
    sku!: string;

    @Prop({ required: true, type: Number })
    qty!: number;

    @Prop({ type: String, required: true, enum: ['SHIP', 'COMPLETE', 'ADJUST', 'RESERVE', 'RELEASE'] })
    type!: LedgerType;

    @Prop({ type: String })
    warehouseId?: string;
}

export const StockLedgerSchema = SchemaFactory.createForClass(StockLedger);
