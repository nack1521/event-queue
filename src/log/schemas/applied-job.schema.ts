import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AppliedJobDocument = AppliedJob & Document;

@Schema({
    timestamps: true
})
export class AppliedJob {
    @Prop({ type: String, required: true, unique: true })
    key!: string;

    @Prop({ type: String, required: true })
    jobId!: string;

    @Prop({ type: Object })
    result?: any;

}

export const AppliedJobSchema = SchemaFactory.createForClass(AppliedJob);
