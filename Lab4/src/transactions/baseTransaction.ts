import { EntityManager, QueryRunner, DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../dataSource.js";
export abstract class BaseTransaction<TransactionInput, TransactionOutput> {
  dataSource: DataSource;
  protected constructor() {
    this.dataSource = AppDataSource;
  }

  // this function will contain all of the operations that you need to perform
  // and has to be implemented in all transaction classes
  protected abstract execute(data: TransactionInput, queryRunner: QueryRunner): Promise<TransactionOutput>;

  private async createRunner(): Promise<QueryRunner> {
    return this.dataSource.createQueryRunner();
  }
  async run(data: TransactionInput): Promise<TransactionOutput> {
    const queryRunner = await this.createRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await this.execute(data, queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  // this is a function that allows us to use other "transaction" classes
  // inside of any other "main" transaction, i.e. without creating a new DB transaction
  async runWithinTransaction(data: TransactionInput, queryRunner: QueryRunner): Promise<TransactionOutput> {
    return this.execute(data, queryRunner);
  }
}
